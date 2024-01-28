import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import styles from "./styles.module.scss";

export const Select = ({ options, id, onChange, disabled, placeholder, label, setErrorVerify, errorVerify, name, value, selectChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option) => {
    if (!disabled) {
      setErrorVerify({
        ...errorVerify,
        hasError: false,
      });
      selectChange(name, option.id);
      onChange(option.id);
      setSelectedOption(option);
      toggleDropdown();
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Se o ID estiver definido, encontre a opção correspondente e defina como selecionada
    if (id && options) {
      const selected = options.find((option) => option.id === id);
      setSelectedOption(selected);
    }
  }, [id, options]);

  return (
    <div ref={dropdownRef} className={styles.flexboxSelect}>
      <p className="paragraph grey2 center flexpad1">{label}</p>
      <div onClick={toggleDropdown} className={styles.divbox}>
        <div className="paragraph grey1">
          {selectedOption ? selectedOption.nome : placeholder}
        </div>
        {isOpen ? <MdKeyboardArrowDown className="paragraph grey1" /> : <MdKeyboardArrowUp className="paragraph grey1" />}
      </div>
      {isOpen && (
        <div className={styles.itensbox}>
          {options.map((option) => (
            <div
              data-id={option.id}
              className={`${styles.childDivbox} ${option.id === id ? styles.selectedItem : ""}`}
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

      {errorVerify.hasError && errorVerify.errorField === name && (
        <p className="paragraph negative center">{errorVerify.message}</p>
      )}
    </div>
  );
};
