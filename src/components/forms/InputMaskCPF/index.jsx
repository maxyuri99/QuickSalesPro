import React from 'react'
import InputMask from 'react-input-mask'
import styles from "./style.module.scss"

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '')

export const MaskedInput = ({ placeholder, label, value, onChange, name, mask, disabled, setErrorVerify, errorVerify }) => {
    function handleChange(event) {
        setErrorVerify({
            ...errorVerify,
            hasError: false,
        })
        
        onChange({
            ...event,
            target: {
                ...event.target,
                name,
                value: onlyNumbers(event.target.value)
            }
        })
    }

    return (
        <div className={styles.flexbox}>
            <label className="paragraph center grey2">{label}</label>
            <InputMask
                name={name}
                mask={mask}
                value={value}
                onChange={handleChange}
                className={`${styles.inputiten} paragraph grey0`}
                placeholder={placeholder}
                disabled={disabled}
                inputProps={{ pattern: "\\d*" }}
            />
            {errorVerify.hasError && errorVerify.errorField === name && (
                <p className="paragraph negative center">{errorVerify.message}</p>
            )}
        </div>
    )
}
