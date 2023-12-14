import React from "react";
import styles from "./style.module.scss";

export const RadioSelector = ({ options, label, name, value, onChange }) => {
    return (
        <div className={styles.radioSelector}>
            <span className="paragraph bold center grey2">{label}</span>
            <div className={styles.radioOptions}>
                {options.map((option) => (
                    <label key={option.value} className={styles.radioOption}>
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                        />
                        <span className="paragraph center grey2">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
