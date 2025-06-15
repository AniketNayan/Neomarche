import React from 'react';

function PrimaryButton({ children, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full h-12 px-4 py-2 bg-indigo-500 text-white text-sm font-semibold font-['Poppins'] rounded-lg hover:bg-indigo-600 transition" // Updated border-radius to rounded-lg (8px)
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full h-12 px-4 py-2 border border-indigo-500 text-indigo-500 text-sm font-semibold font-['Poppins'] rounded-lg hover:bg-indigo-500 hover:text-white transition" // Updated border-radius to rounded-lg (8px)
    >
      {children}
    </button>
  );
}

function InputField({ label, type = 'text', placeholder, value, onChange, error, className, trailingIcon }) {
  return (
    <div className="w-full flex flex-col relative">
      <label className="absolute left-4 top-[2.5px] transform -translate-y-1/2 bg-white px-1 text-zinc-900 text-sm font-normal font-['Poppins'] z-10">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full h-14 px-4 py-2 border rounded-lg outline-none text-zinc-900 text-base font-normal font-['Poppins'] ${error ? 'border-error-red focus:border-error-red' : 'border-[#CCC] focus:border-indigo-500'} placeholder-[#7A7A7A] ${className || ''}`} // Updated border-radius to rounded-lg (8px), border to #CCC, placeholder to #7A7A7A
        />
        {trailingIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center">
            {trailingIcon}
          </div>
        )}
      </div>
      {error ? (
        <p className="text-error-red text-sm mt-1 font-medium font-['Poppins']">{error}</p>
      ) : (
        <p className="text-transparent text-sm mt-1 font-medium font-['Poppins']">Placeholder</p>
      )}
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-6 h-6 border-2 rounded flex items-center justify-center ${checked ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-800 bg-white'}`}
      >
        {checked && (
          <svg
            className="h-4 w-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span className="text-zinc-800 text-sm font-medium font-['Poppins']">{label}</span>
    </label>
  );
}

export { InputField, PrimaryButton, SecondaryButton, Checkbox };