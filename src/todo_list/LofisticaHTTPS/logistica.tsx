import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {useCreatNewTasck} from "../zustand";
import { Modal } from "./Madal";
import { useState } from "react";
import MainTodoList from "../main_todoList";
import Zadanie from "./zadacha1";
import NewsTest from "./Error_404_";
import ActiveZadine from "../../active_Zadanie/Active_Zadanie"
import Profil from "../../Profil/Profil";
import IzminenieFon from "../../fon_Izim/foon_izim";
import Statistica from "../../statistica/Statistica";
export function LogicaHousting() {
  const masNew = useCreatNewTasck((state) => state.masNew);
  const [isModalca, setIsModalca] = useState(false);
  return (
    <BrowserRouter>
      <button onClick={() => setIsModalca(true)}>+New Task</button>

      <nav>
        {masNew.map((ind) => (
          <Link to={`/${ind.slug}`} key={ind.id}>
            {ind.name} |
          </Link>
        ))}
      </nav>
      <Routes>
        <Route path="/" element={<MainTodoList />} />
        <Route path="/:slug" element={<Zadanie />} />
        <Route path="*" element={<NewsTest/>} />
        <Route path="/profil" element={<Profil/>}/>
        <Route path="/statistica" element={<Statistica/>}/>
        <Route path="/ceatFon" element={<IzminenieFon/>}/>
        <Route path="/activZadanie" element={<ActiveZadine/>}/>
      </Routes>
      {/* Не трогой это снизу так как он работает для открытий и закрытий приложение  */}
      {isModalca && <Modal onClose={() => setIsModalca(false)} />}
    </BrowserRouter>
  );
}

