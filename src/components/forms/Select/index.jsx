import { useEffect, useRef, useState } from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import styles from "./styles.module.scss"

export const Select = ({ options, id, onChange, disabled, placeholder , label }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen)
        }
    }

    const handleOptionClick = (option) => {
        if (!disabled) {
            onChange(option.id)
            toggleDropdown()
        }
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div ref={dropdownRef} className={styles.flexboxSelect}>
            <p className="paragraph grey2 center flexpad1">{label}</p>
            <div onClick={toggleDropdown} className={styles.divbox}>
                <div className="paragraph grey1">
                    {id && options ? options.find((option) => option.id === id)?.nome : placeholder}
                </div>
                {isOpen ? <MdKeyboardArrowDown className="paragraph grey1" /> : <MdKeyboardArrowUp className="paragraph grey1" />}
            </div>
            {isOpen && (
                <div className={styles.itensbox}>
                    {options.map((option) => (
                        <div
                            className={styles.childDivbox}
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                        >
                            <div className="paragraph grey1 small">
                                {option.nome}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}