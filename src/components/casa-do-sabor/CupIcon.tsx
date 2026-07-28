import type { SVGProps } from "react";

export function CupIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
