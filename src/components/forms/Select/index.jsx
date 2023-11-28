import { useState } from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import "./styles.scss"

export const Select = ({ options, id, onChange, disabled, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false)

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

    return (
        <div className="flexboxSelect">
            <p className="paragraph grey2 center flexpad1">Vendedor</p>
            <div onClick={toggleDropdown} className="divbox">
                <div className="paragraph grey1">
                    {id && options ? options.find((option) => option.id === id)?.nome : placeholder}
                </div>
                {isOpen ? <MdKeyboardArrowDown className="paragraph grey1" /> : <MdKeyboardArrowUp className="paragraph grey1" />}
            </div>
            {isOpen && (
                <div className="itensbox">
                    {options.map((option) => (
                        <div
                            className="childDivbox"
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