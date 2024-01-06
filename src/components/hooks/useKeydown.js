import { useEffect, useRef } from "react";

export const useKeydown = (key, callback) => {
   const ref = useRef();

   useEffect(() => {
      const handleKeydown = (event) => {;
         if (event.key === key) {      
            callback({event, currentTarget: ref.current});
         }
      };

      window.addEventListener("keydown", handleKeydown);

      return () => {
         window.removeEventListener("keydown", handleKeydown);
      };
   }, []);

   return ref;
};
