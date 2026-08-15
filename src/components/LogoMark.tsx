export default function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid size-12 place-items-center overflow-hidden rounded-md border border-white/15 bg-gradient-to-br from-zinc-100 via-zinc-500 to-zinc-950 shadow-2xl shadow-red-950/30">
        <div className="absolute inset-x-0 top-0 h-px bg-white/70" />
        <span className="text-lg font-black tracking-tight text-black">GB</span>
        <span className="absolute bottom-0 h-1 w-full bg-[#E00000]" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="text-sm font-black uppercase tracking-[0.18em] text-white">
            Garage Bouaïla
          </div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-zinc-400">
            Safi • Volkswagen
          </div>
        </div>
      )}
    </div>
  );
}
