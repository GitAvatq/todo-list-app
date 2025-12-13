// Не рабочий прототупи который при переходе выводить ошыбку то есть не рабочий https 
import { useParams, useLocation } from 'react-router-dom';
import { useCreatNewTasck } from '../zustand';
import MainTodoList from '../main_todoList';
import { useEffect } from 'react';

function Zadanie() {
    const { slug } = useParams();
    const location = useLocation() as { state?: { name?: string; id?:number} };
    const masNew = useCreatNewTasck((s) => s.masNew);
   const removeNewNameText = useCreatNewTasck(s => s.removeNewString);

    const stateName = location.state?.name;

    // удаление  https чтобы если айпи не найденый удалялсы за 5минут 


    const item = slug ? masNew.find((i) => i.slug === slug) : undefined;
    const name = stateName ?? item?.name;


    const https=window.location.pathname.slice(1)
    useEffect(() => {
        const onPathChamhe=()=>{
            https
        }
  window.addEventListener("popstate", onPathChamhe);
  const oldPushState = history.pushState;
  history.pushState = function (...args) {
    oldPushState.apply(this, args);
    onPathChamhe();
  };
  onPathChamhe();
  return () => {
    window.removeEventListener("popstate", onPathChamhe);
    history.pushState = oldPushState;
  };
}, []);

    const stateId = location.state?.id;

    const idToDelate=stateId ?? item?.id
    const handleDeleyt=()=>{
    if(typeof idToDelate==="number"){
        removeNewNameText(idToDelate)
    }else{
        console.warn("Нет ID для удалений ")
    }
    }
    if (!name) return <div>Задача не найдена</div>;
    return (
        <div>
            <h1>Задача:{https}</h1>
            <p>Slug: {slug}</p>
            <nav>
                <MainTodoList folderSlug={slug} />
            </nav>
            <button onClick={handleDeleyt}>Удалить</button>
        </div>
    );
}

export default Zadanie;
