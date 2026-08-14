import type { SVGProps } from "react";

function CupIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 26h32v12a12 12 0 0 1-12 12h-8a12 12 0 0 1-12-12V26z" />
      <path d="M44 30h4a6 6 0 0 1 0 12h-4" />
      <path d="M20 10c-2 3 2 5 0 8M28 8c-2 3 2 5 0 8M36 10c-2 3 2 5 0 8" />
    </svg>
  );
}

function LeafIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M32 8c-12 0-22 18-22 34 0 8 6 12 12 12 10 0 18-14 18-26 0-8-4-16-8-20z" />
      <path d="M32 8c0 0 6 10 6 22 0 8-4 16-12 20" />
      <path d="M32 54V32" />
    </svg>
  );
}

function HeartIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M32 54.5C32 54.5 10 40 10 24.5 10 17 16 11 24 11c4.5 0 8 2 8 6 0-4 3.5-6 8-6 8 0 14 6 14 13.5C54 40 32 54.5 32 54.5z" />
      <path d="M22 22c-2 0-3 1.5-3 3.5" />
    </svg>
  );
}

export function AnimatedMenuIcon({ className }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-4 w-4 items-center justify-center ${className ?? ""}`}>
      <CupIcon className="absolute h-full w-full animate-icon-cycle-1 opacity-0" />
      <LeafIcon className="absolute h-full w-full animate-icon-cycle-2 opacity-0" />
      <HeartIcon className="absolute h-full w-full animate-icon-cycle-3 opacity-0" />
    </span>
  );
}
