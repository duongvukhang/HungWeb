import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { FlyoutContext } from "../../context/contextProvider/flyoutMenu";

export default function NavButton({ label, to, onClick, menu,isScrolled }) {
  const closeTimer = useRef(null);
  const { openMenu, setOpenMenu } = useContext(FlyoutContext);
  const isOpen = openMenu === label;

  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenMenu((current) => (current === label ? null : current));
    }, 300);
  };

  useEffect(() => {
    return () => clearTimeout(closeTimer.current);
  }, []);

  const link = (
<Link
      to={to}
      onClick={onClick}
      className={`group relative inline-block pb-1 text-sm font-semibold tracking-wide transition-colors duration-200
        ${isScrolled 
          ? "text-black hover:text-red-700"   // When scrolled down
          : "text-white hover:text-amber-400" // Flat gray top mode
        }`}
    >
      {label}

      {/* Animated underline — amber on hover */}
      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-amber-500 transition-all duration-300 group-hover:w-full" />
    </Link>
  );

  if (menu) {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Label with chevron indicator */}
        <div className="flex items-center gap-1">
          {link}
          <svg
            width="10" height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`text-zinc-400 transition-transform duration-200 mt-0.5 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 bg-white shadow-xl border-t-2 border-red-700 py-1 min-w-[200px] z-50">
            {/* Red → amber gradient top strip */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700" />

            {menu.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-600 hover:bg-stone-50 hover:text-red-700 transition-colors duration-150 group/item border-b border-stone-100 last:border-none"
              >
                <span className="w-1 h-1 bg-amber-500 rotate-45 block flex-shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return link;
}