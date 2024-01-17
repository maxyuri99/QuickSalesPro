import React, { useContext, useState } from 'react';
import { SaleContext } from '../../../providers/SaleContext';
import styles from "./style.module.scss"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importante para o estilo
import { LiaCalendar } from "react-icons/lia";

export const MyDatePicker = ({ error, label, ...rest }) => {
    const { selectedDate, setSelectedDate } = useContext(SaleContext);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setIsCalendarOpen(false);
        //setInputError(''); // Limpar mensagem de erro ao selecionar a data
    };

    const handleInputChange = (e) => {
        const inputText = e.target.value;
        const isValidFormat = /^\d{2}\/\d{2}\/\d{4}$/.test(inputText);
        console.log(error)
        if (isValidFormat || inputText === '') {
            //setInputError(''); // Limpar mensagem de erro se o formato for válido ou o campo estiver vazio
            e.target.value = inputText.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        } else {
            error.message = 'Formato inválido. Use DD/MM/YYYY.';
            
        }
    };

    return (
        <div>
            <div className={styles.flexbox}>
                <label className="paragraph center grey2">{label}</label>
                <div className={styles.inputiten}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        dropdownMode="select"
                        className={`${styles.datePickIten} paragraph grey0`}
                        open={isCalendarOpen}
                        onClickOutside={() => setIsCalendarOpen(false)}
                        onKeyDownCapture={(e) => {
                            if (!/^\d$/.test(e.key) && !['Backspace', 'Delete'].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        customInput={
                            <input
                                type="text"
                                maxLength={10}
                                placeholder="dd/mm/yyyy"
                                onChange={handleInputChange}
                                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                            />
                        }
                    />
                    <button onClick={() => setIsCalendarOpen(!isCalendarOpen)}><LiaCalendar className='paragraph' /></button>
                </div>
                {error ? <p className="paragraph negative center">{error.message}</p> : null}
            </div>
        </div>
    );
};

