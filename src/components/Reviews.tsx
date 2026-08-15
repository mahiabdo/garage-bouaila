import { reviews } from "@/lib/data";

export default function Reviews() {
  return (
    <section id="reviews" className="section-pad bg-[var(--brand-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-heading">
          <p className="eyebrow">Avis clients</p>
          <h2>La confiance se gagne atelier après atelier</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="glass-card rounded-md p-6">
              <div className="text-lg text-yellow-400">{"★".repeat(review.rating)}</div>
              <p className="mt-5 text-lg leading-8 text-[var(--text)]">&ldquo;{review.text}&rdquo;</p>
              <div className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-soft)]">
                {review.name}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
