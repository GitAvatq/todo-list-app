import { BrowserRouter, Link } from "react-router-dom";
import "../BurgerMenu/activBurger.css"
import { useCallback } from "react";

export default function ActiveBurger(){
    const render=useCallback(()=>{
        setTimeout(()=>{
            window.location.reload()
        },10)
    },[])
    return(
        <>
        <BrowserRouter>
        <div className="Burger_Div" onClick={render}>
            <p><Link to="/" className="burger_text">Главный</Link></p>
            <p><Link to="/profil"  className="burger_text">Профиль</Link></p>
            <p><Link to="/statiRstica" className="burger_text">Статистика</Link></p>
            <p><Link to="/ceatFon" className="burger_text">Изминение фона</Link></p>
            <p><Link to="/activZadanie" className="burger_text">зделаный задачи</Link></p>
        </div>
        </BrowserRouter>
        </>
    )
}