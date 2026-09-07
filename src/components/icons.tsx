import type { SVGProps } from "react";

/*
  Neutral placeholder iconography. The wordmark is a generic geometric
  placeholder — NOT any real brand's logo. All glyphs are simple, original SVGs.
*/

type IconProps = SVGProps<SVGSVGElement>;

/** Placeholder brand wordmark: a stacked block mark + neutral name. */
export function LogoMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 132 28"
      fill="none"
      className={className}
      aria-label="Placeholder brand"
      {...props}
    >
      <rect x="0" y="2" width="24" height="24" rx="7" fill="currentColor" />
      <rect x="6.5" y="8.5" width="11" height="4" rx="2" fill="var(--background)" />
      <rect x="6.5" y="15.5" width="11" height="4" rx="2" fill="var(--background)" />
      <text
        x="34"
        y="13"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1.5"
        fill="currentColor"
        fontFamily="var(--font-sans)"
      >
        REST
      </text>
      <text
        x="34"
        y="24"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1.5"
        fill="currentColor"
        fontFamily="var(--font-sans)"
      >
        LABS
      </text>
    </svg>
  );
}

export function SearchIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m20 20-3.2-3.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CartIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M3 5h2l1.6 10.2a1.5 1.5 0 0 0 1.5 1.3h8.3a1.5 1.5 0 0 0 1.5-1.2L20 8H6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function ArrowRight({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M5 12h14m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronLeft({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRight({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function StarIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5z" />
    </svg>
  );
}

export function PlayIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

export function QuoteMark({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 32" fill="currentColor" className={className} {...props}>
      <path d="M0 32V16C0 7 5 1.5 14 0l2 4C11 5.5 8.5 8.5 8.5 13H16v19H0zm32 0V16C32 7 37 1.5 46 0l2 4c-5 1.5-7.5 4.5-7.5 9H48v19H32z" />
    </svg>
  );
}

/** Instagram: cámara redondeada, trazo simple del mismo set. */
export function InstagramIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

/** TikTok: nota musical simplificada, trazo del mismo set. */
export function TikTokIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M14 3v10.5a3.5 3.5 0 1 1-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 3c.4 2.5 2 4.2 4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
