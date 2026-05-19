import { useCallback, useEffect, useState } from "react";

interface UseMenuToggleReturn {
  isToggled: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

function useMenuToggle(): UseMenuToggleReturn {
  const [isToggled, setToggle] = useState<boolean>(true);

  const toggleMenu = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setToggle(true);
  }, []);

  const isMenuOpen = !isToggled;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const closeNav = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", closeNav);
    return () => document.removeEventListener("keydown", closeNav);
  }, [closeMenu]);

  return {
    isToggled,
    toggleMenu,
    closeMenu,
  };
}

export default useMenuToggle;
