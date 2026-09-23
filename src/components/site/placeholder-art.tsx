const TONES = {
  coral: { bg: "#FDE4E1", fg: "#F2635A", dot: "#F9B8B1" },
  sky: { bg: "#E1F1FA", fg: "#3FA9E0", dot: "#A9D9F1" },
  sun: { bg: "#FFF3D6", fg: "#E8A722", dot: "#FFE199" },
  mint: { bg: "#DFF6EF", fg: "#3DBE9B", dot: "#A6E6D3" },
  pink: { bg: "#FFE7EF", fg: "#FF6F9C", dot: "#FFC2D6" },
} as const;

export type PlaceholderTone = keyof typeof TONES;

export type PlaceholderKind =
  | "dam"
  | "ao-thun"
  | "so-mi"
  | "quan"
  | "bo-do"
  | "ao-khoac"
  | "vay"
  | "phu-kien";

function Garment({ kind, fg }: { kind: PlaceholderKind; fg: string }) {
  switch (kind) {
    case "dam":
    case "vay":
      return (
        <path
          d="M85 40c0-8 7-15 15-15s15 7 15 15v10l22 78c2 7-3 14-10 14H73c-7 0-12-7-10-14l22-78V40z"
          fill={fg}
        />
      );
    case "ao-thun":
      return (
        <path
          d="M70 45 45 60l12 18 13-8v62c0 5 4 8 8 8h44c4 0 8-3 8-8V70l13 8 12-18-25-15c-4 6-12 10-20 10s-16-4-20-10z"
          fill={fg}
        />
      );
    case "so-mi":
      return (
        <path
          d="M68 42 44 58l11 17 15-9v66c0 4 4 7 8 7h48c4 0 8-3 8-7V66l15 9 11-17-24-16-16 12-2 44h-10l-2-44-16-12z"
          fill={fg}
        />
      );
    case "quan":
      return (
        <path
          d="M62 32h76l6 108c.4 6-4 11-10 11h-14c-5 0-10-4-10-10l-7-64-7 64c0 6-5 10-10 10H72c-6 0-10.4-5-10-11l6-108z"
          fill={fg}
        />
      );
    case "ao-khoac":
      return (
        <path
          d="M66 44 40 62l13 19 13-9v64c0 5 4 9 9 9h58c5 0 9-4 9-9V72l13 9 13-19-26-18-10 8c-3 5-10 8-17 8s-14-3-17-8l-10-8zM95 52v76M65 78v56M135 78v56"
          fill={fg}
          stroke={fg}
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    case "bo-do":
      return (
        <g fill={fg}>
          <path d="M72 44 50 58l11 16 13-8v46c0 4 3 7 7 7h34c4 0 7-3 7-7V66l13 8 11-16-22-14c-3 5-9 9-16 9s-13-4-16-9z" />
          <path d="M80 132h50l4 40c.5 5-3 9-8 9h-42c-5 0-8.5-4-8-9l4-40z" opacity="0.85" />
        </g>
      );
    case "phu-kien":
    default:
      return (
        <g fill={fg}>
          <circle cx="100" cy="80" r="34" />
          <circle cx="100" cy="80" r="14" fill="#fff" />
        </g>
      );
  }
}

export function PlaceholderArt({
  kind = "bo-do",
  tone = "coral",
  className,
}: {
  kind?: PlaceholderKind;
  tone?: PlaceholderTone;
  className?: string;
}) {
  const palette = TONES[tone] ?? TONES.coral;
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <rect width="200" height="200" fill={palette.bg} />
      <circle cx="24" cy="30" r="6" fill={palette.dot} />
      <circle cx="176" cy="164" r="9" fill={palette.dot} />
      <circle cx="172" cy="34" r="4" fill={palette.dot} />
      <circle cx="26" cy="170" r="5" fill={palette.dot} />
      <g transform="translate(0 4)">
        <Garment kind={kind} fg={palette.fg} />
      </g>
    </svg>
  );
}
