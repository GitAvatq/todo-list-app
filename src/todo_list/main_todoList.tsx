import { useCreatTodoList } from "./zustand"
import { useState , useEffect} from "react"
import Searcht from "./LofisticaHTTPS/Search"
import "../todo_list/LofisticaHTTPS/MainTodoList.css"
import { useCreatNewTasck } from "./zustand"

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
    const todosText=useCreatNewTasck((e)=>e.masNew)
    const nameTodos=todosText.filter((e)=>e.name)
    return(
        <>        
        <div>
            <Searcht/>
        <input className="inputAddMain" placeholder="Создать задачу" type="text" value={inputText}
        onChange={e=>setInputText(e.target.value)}/>
        <button className="BtnAddinput" onClick={()=>{addTodoText(inputText, folderSlug); setInputText('')}}
        disabled={!inputText.trim()}>Добавить</button>
        <ul className="ulTextMainBoxs">{visibleTodos.map((ind)=>(
            <div key={ind.id} className="boxsTextMainList"> 
            <li key={ind.id} className="listTextMain">
                {editingId===ind.id ? (
                    <input className="redactorInp" value={redactInputText} 
                    onChange={(e)=>setRedactInputText(e.target.value)}
                    placeholder="Редактировать"/>
                )  : (
                    <>
                    <span className={"todo_Text"+`${ind.done}`}>
                        {
                        visibleTodos.some(t => t.text === ind.text && t.id !== ind.id) 
                        ? <p style={{ color: 'red' }}>Имя повторяется ({ind.text})</p> 
                        : <p>{ind.text}</p>
                        }</span>
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
    </div>

        </>
    )
}
