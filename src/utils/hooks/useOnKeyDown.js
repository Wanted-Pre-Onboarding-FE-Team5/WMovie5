import { useEffect } from "react";

const useOnKeyDown = (key, handler) => {
  useEffect(() => {
    const listener = (event) => {
      handler(event);
    };

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [key, handler]);
};

export default useOnKeyDown;
