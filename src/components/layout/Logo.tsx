/**
 * The CareNote Coach mark, inlined as SVG so it renders instantly, scales
 * cleanly and needs no network request. Geometry is copied exactly from
 * `assets/brand/carenote-mark.svg` in the app repo: a C letterform for the CARE
 * framework, with three strokes in the gap standing for the note itself.
 */
export function Logo({ size = 36, title = 'CareNote Coach' }: { size?: number; title?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className="shrink-0"
    >
      <rect width="400" height="400" rx="100" fill="#1A5F6E" />
      <path
        d="M 300 284 A 130 130 0 1 1 300 116"
        stroke="white"
        strokeWidth="50"
        fill="none"
        strokeLinecap="round"
      />
      <line x1="258" y1="164" x2="288" y2="164" stroke="white" strokeWidth="24" strokeLinecap="round" />
      <line x1="258" y1="200" x2="288" y2="200" stroke="white" strokeWidth="24" strokeLinecap="round" />
      <line x1="258" y1="236" x2="288" y2="236" stroke="white" strokeWidth="24" strokeLinecap="round" />
    </svg>
  );
}
