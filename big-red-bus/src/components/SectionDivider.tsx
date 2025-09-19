export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center my-12 ${className}`} aria-hidden="true">
      <div className="flex-grow border-t border-gray-300/70 dark:border-gray-700/70" />
      <span className="mx-4 text-gray-400 select-none text-lg">• • •</span>
      <div className="flex-grow border-t border-gray-300/70 dark:border-gray-700/70" />
    </div>
  );
}

export default SectionDivider;
