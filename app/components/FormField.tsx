import { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
};

export function FormField({ label, required, children, hint }: FormFieldProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 py-5 border-b border-[#e0e0e0]">
      <div className="sm:w-44 flex-shrink-0 pt-0.5">
        <span className="text-sm text-[#1a1a1a]">{label}</span>
        {required && (
          <span className="ml-1.5 text-xs text-[#999] tracking-wider">必須</span>
        )}
        {hint && (
          <p className="text-xs text-[#999] mt-1 leading-relaxed">{hint}</p>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full border border-[#e0e0e0] rounded-none px-3 py-2.5 text-sm text-[#1a1a1a] bg-white focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
    />
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
};

export function Select({ children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className="w-full border border-[#e0e0e0] rounded-none px-3 py-2.5 text-sm text-[#1a1a1a] bg-white focus:outline-none focus:border-[#1a1a1a] transition-colors appearance-none cursor-pointer"
    >
      {children}
    </select>
  );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea(props: TextareaProps) {
  return (
    <textarea
      {...props}
      className="w-full border border-[#e0e0e0] rounded-none px-3 py-2.5 text-sm text-[#1a1a1a] bg-white focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb] resize-y min-h-[120px]"
    />
  );
}

type CheckboxGroupProps = {
  label?: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
};

export function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: CheckboxGroupProps) {
  return (
    <div>
      {label && (
        <p className="text-xs text-[#999] mb-2 tracking-wider">{label}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isChecked = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`px-3 py-1.5 text-xs border transition-colors ${
                isChecked
                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                  : "border-[#e0e0e0] bg-white text-[#666] hover:border-[#999]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type SectionHeadingProps = {
  children: ReactNode;
};

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-xs tracking-[0.2em] text-[#999] mt-10 mb-0 pb-3 border-b border-[#e0e0e0]">
      {children}
    </h2>
  );
}
