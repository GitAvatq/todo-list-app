import { useCreatTodoList } from "./zustand"
import { useState , useEffect} from "react"
import Searcht from "./LofisticaHTTPS/Search"

type Props = {
    folderSlug?: string
}

export default function MainTodoList({ folderSlug }: Props){
    const todos=useCreatTodoList((state)=>state.todos)
    const addTodoText=useCreatTodoList((state)=>state.addTodoText)
    const removeTodoText=useCreatTodoList((state)=>state.removeTodoText)
    const locationStora=useCreatTodoList((state)=>state.locationStor)
    const redactor=useCreatTodoList((state)=>state.redactorText)
    const provActivZadach=useCreatTodoList((state)=>state.provActivZadTodo)

    const [inputText,setInputText]=useState("")
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
    useEffect(()=>{
        locationStora()
    },[])

    const visibleTodos = folderSlug ? todos.filter(t => t.folder === folderSlug) : todos.filter(t => !t.folder)

    return(
        <>        
        <div>
            <Searcht/>
        <input placeholder="Создать задачу" type="text" value={inputText}
        onChange={e=>setInputText(e.target.value)}/>
        <button onClick={()=>{addTodoText(inputText, folderSlug); setInputText('')}}
        disabled={!inputText.trim()}>Добавить</button>
        <ul>{visibleTodos.map((ind)=>(
            <li key={ind.id}>
                {editingId===ind.id ? (
                    <input value={redactInputText} 
                    onChange={(e)=>setRedactInputText(e.target.value)}
                    placeholder="Редактировать"/>
                ) : (
                    <>
                    <span className={"todo_Text"+`${ind.done}`}>{ind.text}</span>
                    {ind.done===false ? <p>Не зделан</p> : <p>Зделан</p>}
                    </>
                )}
            <button onClick={()=>removeTodoText(ind.id)}>Удалить</button>
            <button onClick={()=>provActivZadach(ind.id)}>Зделан</button>
             {editingId===ind.id ? (
                    <button onClick={saveEdit}>Сохранить</button>
                ):(
                <button onClick={()=>startEdit(ind.id,ind.text)}>Редактировать</button>
                )}
            </li>
        ))}</ul>
    </div>

        </>
    )
}