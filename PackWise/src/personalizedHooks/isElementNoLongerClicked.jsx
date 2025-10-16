import { useEffect } from "react";

export default function isElementNoLongerClicked(ref, elementId, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current.id == elementId && ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
}