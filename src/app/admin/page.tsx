"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, db, isFirebaseConfigured, storage } from "@/lib/firebase";
import { reviews as seedReviews, services as seedServices, settings as seedSettings } from "@/lib/data";
import type { Review, Service } from "@/types/site";

type Photo = { id: string; title: string; url: string };

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [services, setServices] = useState<Service[]>(seedServices);
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [phone, setPhone] = useState(seedSettings.phone);
  const [weekday, setWeekday] = useState(seedSettings.hours.weekday);
  const [sunday, setSunday] = useState(seedSettings.hours.sunday);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    if (!db || !user) return;
    async function load() {
      const [servicesSnap, reviewsSnap, photosSnap] = await Promise.all([
        getDocs(collection(db!, "services")),
        getDocs(collection(db!, "reviews")),
        getDocs(collection(db!, "photos")),
      ]);
      if (!servicesSnap.empty) setServices(servicesSnap.docs.map((item) => ({ id: item.id, ...item.data() }) as Service));
      if (!reviewsSnap.empty) setReviews(reviewsSnap.docs.map((item) => ({ id: item.id, ...item.data() }) as Review));
      setPhotos(photosSnap.docs.map((item) => ({ id: item.id, ...item.data() }) as Photo));
    }
    load().catch(() => setStatus("Impossible de charger Firestore."));
  }, [user]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!auth) return;
    const form = new FormData(event.currentTarget);
    await signInWithEmailAndPassword(auth, String(form.get("email")), String(form.get("password")));
  }

  async function addService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const service = {
      id: crypto.randomUUID(),
      icon: String(form.get("icon") || "🔧"),
      title: String(form.get("title")),
      description: String(form.get("description")),
    };
    setServices((items) => [service, ...items]);
    if (db) await setDoc(doc(db, "services", service.id), service);
    event.currentTarget.reset();
  }

  async function removeService(id: string) {
    setServices((items) => items.filter((item) => item.id !== id));
    if (db) await deleteDoc(doc(db, "services", id));
  }

  async function addReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const review = {
      id: crypto.randomUUID(),
      name: String(form.get("name")),
      text: String(form.get("text")),
      rating: Number(form.get("rating") || 5),
    };
    setReviews((items) => [review, ...items]);
    if (db) await setDoc(doc(db, "reviews", review.id), review);
    event.currentTarget.reset();
  }

  async function addPhoto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const file = form.get("photo") as File;
    const title = String(form.get("title"));
    if (!file?.size) return;

    let url = URL.createObjectURL(file);
    if (storage && db) {
      const imageRef = ref(storage, `garage-photos/${Date.now()}-${file.name}`);
      await uploadBytes(imageRef, file);
      url = await getDownloadURL(imageRef);
      await addDoc(collection(db, "photos"), { title, url });
    }
    setPhotos((items) => [{ id: crypto.randomUUID(), title, url }, ...items]);
    event.currentTarget.reset();
  }

  async function saveSettings() {
    if (db) await setDoc(doc(db, "settings", "garage"), { phone, hours: { weekday, sunday } });
    setStatus("Configuration enregistrée.");
  }

  if (!isFirebaseConfigured) {
    return (
      <AdminShell>
        <div className="glass-card rounded-md p-8">
          <h1 className="text-3xl font-black text-white">Admin Garage Bouaïla</h1>
          <p className="mt-4 text-zinc-400">
            Firebase n&apos;est pas encore configuré. Ajoutez les variables
            NEXT_PUBLIC_FIREBASE_* dans votre environnement GitHub Pages ou votre
            configuration locale pour activer l&apos;authentification, Firestore et Storage.
          </p>
        </div>
      </AdminShell>
    );
  }

  if (!user) {
    return (
      <AdminShell>
        <form onSubmit={login} className="glass-card mx-auto max-w-md rounded-md p-8">
          <h1 className="text-3xl font-black text-white">Connexion admin</h1>
          <input name="email" type="email" required className="field mt-6" placeholder="Email" />
          <input name="password" type="password" required className="field mt-4" placeholder="Mot de passe" />
          <button className="btn btn-red mt-6 w-full justify-center">Se connecter</button>
        </form>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 className="mt-3 text-4xl font-black text-white">Gestion du site</h1>
        </div>
        <button className="btn btn-ghost" onClick={() => auth && signOut(auth)}>
          Déconnexion
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="Services">
          <form onSubmit={addService} className="grid gap-3">
            <input name="icon" className="field" placeholder="Icône" />
            <input name="title" required className="field" placeholder="Titre du service" />
            <textarea name="description" required className="field min-h-24" placeholder="Description" />
            <button className="btn btn-red justify-center">Ajouter</button>
          </form>
          <List items={services.map((item) => item.title)} onDelete={(index) => removeService(services[index].id)} />
        </Panel>

        <Panel title="Photos de réparation">
          <form onSubmit={addPhoto} className="grid gap-3">
            <input name="title" required className="field" placeholder="Titre de la photo" />
            <input name="photo" required type="file" accept="image/*" className="field" />
            <button className="btn btn-red justify-center">Téléverser</button>
          </form>
          <List items={photos.map((item) => item.title)} />
        </Panel>

        <Panel title="Avis clients">
          <form onSubmit={addReview} className="grid gap-3">
            <input name="name" required className="field" placeholder="Nom client" />
            <input name="rating" type="number" min="1" max="5" className="field" placeholder="Note" />
            <textarea name="text" required className="field min-h-24" placeholder="Avis" />
            <button className="btn btn-red justify-center">Ajouter</button>
          </form>
          <List items={reviews.map((item) => item.text)} />
        </Panel>

        <Panel title="Téléphone & horaires">
          <div className="grid gap-3">
            <input value={phone} onChange={(event) => setPhone(event.target.value)} className="field" />
            <input value={weekday} onChange={(event) => setWeekday(event.target.value)} className="field" />
            <input value={sunday} onChange={(event) => setSunday(event.target.value)} className="field" />
            <button className="btn btn-red justify-center" onClick={saveSettings}>Enregistrer</button>
            {status && <p className="text-sm text-green-400">{status}</p>}
          </div>
        </Panel>
      </div>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">{children}</div>;
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="glass-card rounded-md p-6">
      <h2 className="mb-5 text-2xl font-black text-white">{title}</h2>
      {children}
    </section>
  );
}

function List({ items, onDelete }: { items: string[]; onDelete?: (index: number) => void }) {
  return (
    <div className="mt-5 grid gap-2">
      {items.slice(0, 5).map((item, index) => (
        <div key={`${item}-${index}`} className="flex items-center justify-between gap-3 rounded-md bg-black/35 p-3 text-sm text-zinc-300">
          <span className="truncate">{item}</span>
          {onDelete && (
            <button className="text-[#E00000]" onClick={() => onDelete(index)}>
              Supprimer
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
