import { Link } from "react-router-dom";
import "../BurgerMenu/activBurger.css"

type ActiveBurger={
    onClose:()=>void
}

export default function ActiveBurger({onClose}:ActiveBurger){
    return(
        <>
        <div className="Burger_Div" onClick={onClose}>
            <p><Link to="/" className="burger_text">Главный</Link></p>
            <p><Link to="/profil"  className="burger_text">Профиль</Link></p>
            <p><Link to="/Statistica" className="burger_text">Статистика</Link></p>
            <p><Link to="/ceatFon" className="burger_text">Изминение фона</Link></p>
            <p><Link to="/activZadanie" className="burger_text">зделаный задачи</Link></p>
        </div>
        </>
    )
}