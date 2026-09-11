export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" aria-busy="true" aria-live="polite">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-pulse border border-accent" />
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ink-subtle">Loading</p>
      </div>
    </div>
  );
}
