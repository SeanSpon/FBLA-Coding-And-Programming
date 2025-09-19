export function LogoBus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 20C8 14.4772 12.4772 10 18 10H82C87.5228 10 92 14.4772 92 20V50H8V20Z"
        fill="#D64545"
      />
      <path d="M10 30H90" stroke="#FFF6E9" strokeWidth="4" />
      <circle cx="25" cy="50" r="8" fill="#2F2F2F" stroke="#FFF6E9" strokeWidth="2" />
      <circle cx="75" cy="50" r="8" fill="#2F2F2F" stroke="#FFF6E9" strokeWidth="2" />
    </svg>
  );
}
