export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
      {children}
    </h3>
  );
}
