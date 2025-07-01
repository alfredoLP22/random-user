export function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <p>
      <span className="font-medium">{label}:</span> {value}
    </p>
  );
}
