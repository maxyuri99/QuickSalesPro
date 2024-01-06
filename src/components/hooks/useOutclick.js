import { useEffect, useRef } from "react";

export const useOutclick = (callback) => {
   const ref = useRef(null);

   useEffect(() => {
      const handleOutclick = (event) => {
         if (!ref.current.contains(event.target)) {
            callback(event);
         }
      };

      window.addEventListener("mousedown", handleOutclick);

      return () => {
         window.removeEventListener("mousedown", handleOutclick);
      };
   }, []);

   return ref;
};
