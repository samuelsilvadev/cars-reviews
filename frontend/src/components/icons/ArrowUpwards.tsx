import React from "react";

function ArrowUpwards(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 10l7-7 7 7m-7-7v18"
      />
    </svg>
  );
}

export default ArrowUpwards;
