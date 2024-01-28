import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./style.module.scss";

export const ErrorPage = () => {
  const [redirectTimer, setRedirectTimer] = useState(3); // 3 segundos
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate('/quicksalespro/');
    }, redirectTimer * 1000);

    return () => clearTimeout(timerId);
  }, [navigate, redirectTimer]);

  return (
    <main className={styles.background}>
      <div className={styles.flexBox}>
        <h1 className="paragraph big bold ">Erro: 404</h1>
        <div className={styles.flexBoxDivText}>
          <p className="paragraph">Não foi possível encontrar a página!</p>
          <p className="paragraph">
            Você será redirecionado para a página principal em {redirectTimer} segundos.
          </p>
          <div className={styles.overlaySpinner}>
            <div className={styles.spinner}></div>
          </div>
        </div>
      </div>
    </main>
  );
};
