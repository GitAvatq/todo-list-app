import { useState } from "react";
import "../BurgerMenu/BurgerMenu.css";
import ActiveBurger from "./activBurger";
export default function BurgerMenu() {
    const [active, setActive] = useState("");

    const toggleMenu = () => {
        setActive(prev => prev === "" ? "active" : "");
    };

    return (
        <>
            <button className={`burger_meny ${active}`} onClick={toggleMenu} aria-label="Открыть меню">
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div className={`active_Https ${active}`}>
                <ActiveBurger/>
            </div>
        </>
    );
}
