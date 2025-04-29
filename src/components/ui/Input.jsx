import React from "react";

function Input({ type = "text", title, placeholder, name, value, onChange }) {
  return (
    <label className="block my-4">
      <span className="mb-1 font-bold block text-sm">{title}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border w-full rounded-md p-2 text-sm"
        required
      />
    </label>
  );
}

export default Input;
