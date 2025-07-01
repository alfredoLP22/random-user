export const Button = ({
  title,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  children,
}: {
  title: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`text-lg transition text-blue-500 hover:text-blue-700 disabled:opacity-55 ${className}`}
      aria-label={title}
    >
      {children}
    </button>
  );
};
