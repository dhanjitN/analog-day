import { useState, useRef, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import NavPopup from "./NavPopup";
import { redirect } from "react-router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between bg-neutral-900 border-b border-neutral-800">
      <span className="text-lg font-semibold text-gray-100 tracking-tight" >
        analog-day
      </span>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-100 hover:bg-netural-800 transition"
        >
          <FiUser size={16} />
        </button>

        {open && (
          <NavPopup/>
        )}
      </div>
    </nav>
  );
}