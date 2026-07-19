type AuthFieldProps = {
  defaultValue?: string;
  icon?: React.ReactNode;
  label: string;
  name: string;
  placeholder: string;
  type: "email" | "password";
};

export function AuthField({
  defaultValue,
  icon,
  label,
  name,
  placeholder,
  type,
}: AuthFieldProps) {
  return (
    <label className="block">
      <span className="section-title">{label}</span>
      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white px-4 py-3">
        {icon ? icon : null}
        <input
          required
          defaultValue={defaultValue}
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full bg-transparent text-base outline-none placeholder:text-[var(--ink-soft)]/70"
        />
      </div>
    </label>
  );
}
