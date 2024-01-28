import { useEffect, useRef } from "react";

export const useOutclick = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutclick = (event) => {
      // Verificar se o clique ocorreu dentro do modal
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    };

    window.addEventListener("mousedown", handleOutclick);

    return () => {
      window.removeEventListener("mousedown", handleOutclick);
    };
  }, [callback]); // Adicionei [callback] como dependência para evitar possíveis problemas

  return ref;
};
