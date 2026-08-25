

interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}

export default function InputField({
  label,
  type = "text",
  placeholder = "",
  error = "",

  required = false,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label 
      className="block text-md font-semibold text-brown mb-1">
        {label} 
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={
            `w-full rounded-md border border-warm-border bg-white
             px-3 py-2 text-md text-brown 
             hover:border-brown
               focus-visible:outline-terra focus-visible:ring-2 focus-visible:ring-terra-light focus-visible:ring-offset-0

             ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}