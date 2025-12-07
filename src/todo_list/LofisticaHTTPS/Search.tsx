import { useState,useMemo} from "react";
import { useCreatTodoList } from "../zustand";

type Todo={
    id:number;
    text:string
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

    return(
        <>
             <div>
                <input placeholder="Поиск" value={search} 
                onChange={(e)=>setSearch(e.target.value)}/>
                {/* {resaut.length>0 ? <p>Поиск...</p> : <p>Текст ненайден</p>} */}
                {filteredTodos.length>0 ? (
                    <ul>{filteredTodos.map((todo)=>(
                        <li key={todo.id}>{todo.text}</li>
                    ))}</ul>
                ):(<p>Пусто...</p>)}
            </div>
        </>
    )
}