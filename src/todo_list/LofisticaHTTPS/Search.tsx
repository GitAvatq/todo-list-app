import { useState,useMemo} from "react";
import { useCreatTodoList } from "../zustand";
import "../LofisticaHTTPS/search.css"

type Todo={
    id:number;
    text:string
    done:boolean
}
export default function Searcht(){
    const todos=useCreatTodoList((state)=>state.todos)

    const [search,setSearch]=useState<string>("")
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

        // Поисковик фильратций не удалять что то в нем рабоает но я не знаю что имено
    const SearchInput=useMemo(()=>{
        if(!search.trim()){
            setFilteredTodos([]);
            return
        }
        const resaut=todos.filter((ind)=>
        ind.text.toLowerCase().includes(search.toLowerCase().trim()))
        setFilteredTodos(resaut)
    },[todos,search])
    //Нужно до рабоать 
        // const resaut=todos.filter(todo=>
        // todo.text.toLowerCase().includes(search.toLowerCase().trim()));

    const removeTodoText=useCreatTodoList((state)=>state.removeTodoText)
    const redactor=useCreatTodoList((state)=>state.redactorText)
    const provActivZadach=useCreatTodoList((state)=>state.provActivZadTodo)

    const [editingId,setEditingId]=useState<number | null>(null);
    const [redactInputText,setRedactInputText]=useState<string>("")

    const startEdit=(id:number,text:string)=>{
        setEditingId(id);
        setRedactInputText(text)
    }
      const saveEdit = () => {
    if (editingId !== null) {
      redactor(redactInputText,editingId);
      setEditingId(null);
    }
  };

    return(
        <>
             <div>
                <input className="SearchAddMainInp" placeholder="Поиск" value={search} 
                onChange={(e)=>setSearch(e.target.value)}/>
                {/* {resaut.length>0 ? <p>Поиск...</p> : <p>Текст ненайден</p>} */}

                {filteredTodos.length>0 ? (
                    <ul className="ulTextMainBoxs">{filteredTodos.map((ind)=>(
                          <div key={ind.id} className="boxsTextMainList"> 
            <li key={ind.id} className="listTextMain">
                {editingId===ind.id ? (
                    <input className="redactorInp" value={redactInputText} 
                    onChange={(e)=>setRedactInputText(e.target.value)}
                    placeholder="Редактировать"/>
                )  : (
                    <>
                    <span className={"todo_Text"+`${ind.done}`}>{ind.text}</span>
                    {ind.done===false ? <p className="noActivText">Не зделан</p> 
                    : <p className="activText">Зделан</p>}
                    </>
                )}
                <div className="distationBoxsBtn">
            <button className="DelaytBtn" onClick={()=>removeTodoText(ind.id)}>Удалить</button>
            <button className="zdelanBtn" onClick={()=>provActivZadach(ind.id)}>Зделан</button>
             {editingId===ind.id ? (
                    <button className="saveBtn" onClick={saveEdit}>Сохранить</button>
                ):(
                <button className="redactorBtn" onClick={()=>startEdit(ind.id,ind.text)}>Редактировать</button>
                )}
                </div>
            </li>
            </div>
                    ))}</ul>
                ):(<p>Пусто...</p>)}
            </div>
        </>
    )
}
