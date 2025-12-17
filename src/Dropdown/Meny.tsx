import LogoPeople from "../Profil/foto"
import { Link } from "react-router-dom";
import "../Dropdown/meny.css"

export default function MenuBerger(){
    return(
        <>
        <div className="meny_click">
            <div>
            <LogoPeople/>
            <p className="text_namePeople">namePeopel</p>
            <p className="line_Gradinient"></p>
            </div>
            <div className="butDown">
                <p className="buttonDown"><Link className="button_text" to="/">Hoem</Link></p>
                <p className="buttonDown"><Link className="button_text" to="/activZadanie">Зделаный задачи</Link></p>
                <p className="buttonDown"><Link className="button_text" to="/Statistica">Статистика</Link></p>
                <p className="buttonDown"><Link className="button_text" to="/ceatFon">Изминение фона</Link></p>
            </div>
            <button className="closeBut">Закрыть меню</button>
        </div>
        </>
    )
}