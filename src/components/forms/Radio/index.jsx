import React, { forwardRef, useState } from "react"

export const RadioSelector = ({ options, label, name, value, onChange }) => {
    return (
        <div>
            <span>{label}</span>
            {options.map((option) => (
                <label key={option.value}>
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={() => onChange(option.value)}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};
