import React from "react";

function Input({
  type = "text",
  title,
  placeholder,
  name,
  value,
  checked,
  onChange,
  witdh = "full",
  required = false,
}) {
  return (
    <label className="block my-4">
      <span className="mb-1 font-bold block text-sm">{title}</span>
      <input
        type={type}
        name={name}
        {...(type === "file"
          ? {}
          : {
              value,
              checked,
            })}
        value={value}
        checked={checked}
        onChange={onChange}
        placeholder={placeholder}
        className={`border  w-${witdh} ml-auto rounded-md p-2 text-sm text-start`}
        required={required}
        accept={type === "file" ? "image/*" : undefined}
      />
    </label>
  );
}

export default Input;
