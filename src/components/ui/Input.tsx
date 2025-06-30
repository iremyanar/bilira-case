import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = "text", className = "", ...rest }, ref) => {
    const isCheckbox = type === "checkbox";

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isCheckbox ? (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                ref={ref}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                {...rest}
              />
              {label}
            </div>
          ) : (
            <>
              {label}
              <input
                type={type}
                ref={ref}
                className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
                {...rest}
              />
            </>
          )}
        </label>
        {error && (
          <p role="alert" className="text-sm text-red-500 mt-1">
            {error.message}
          </p>
        )}

      </div>
    );
  }
);

export default Input;

/**
 * Custom Input component.
 * 
 * Supports both:
 * ✅ Controlled: <Input value={value} onChange={...} />
 * ✅ Uncontrolled: <Input defaultValue="..." ref={...} />
 */
