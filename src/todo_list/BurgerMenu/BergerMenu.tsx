import  { useState,useEffect,useRef} from "react";
import "../BurgerMenu/BurgerMenu.css";
import ActiveBurger from "./activBurger";

export default function  BurgerMenu(){
    const [active, setActive] = useState("");
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setActive(prev => prev === "" ? "active" : "");
    };
    const closeMenu=()=>{
        setActive("");
    }
      useEffect(() => {
    function handleClickOutside(e:any) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    }
    if (active === "active") {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[active]);


    return (
        <>
            <button className={`burger_meny ${active}`} onClick={toggleMenu} aria-label="Открыть меню">
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div ref={menuRef} className={`active_Https ${active}`}>
                <ActiveBurger onClose={closeMenu}/>
            </div>
        </>
    );
}