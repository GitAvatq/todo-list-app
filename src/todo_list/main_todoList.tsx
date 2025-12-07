import { useCreatTodoList } from "./zustand"
import { useState, useEffect, useCallback, useMemo } from "react"
type Todo = {
    id: number;
    text: string
}
export default function MainTodoList() {
    const todos = useCreatTodoList((state) => state.todos)
    const addTodoText = useCreatTodoList((state) => state.addTodoText)
    const removeTodoText = useCreatTodoList((state) => state.removeTodoText)
    const locationStora = useCreatTodoList((state) => state.locationStor)
    const redactor = useCreatTodoList((state) => state.redactorText)
    const provActivZadach = useCreatTodoList((state) => state.provActivZadTodo)

    const [inputText, setInputText] = useState("")
    const [editingId, setEditingId] = useState<number | null>(null);
    const [redactInputText, setRedactInputText] = useState<string>("")
    const [search, setSearch] = useState<string>("")
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);


    const startEdit = (id: number, text: string) => {
        setEditingId(id);
        setRedactInputText(text)
    }
    const saveEdit = () => {
        if (editingId !== null) {
            redactor(redactInputText, editingId);
            setEditingId(null);
        }
    };
    useEffect(() => {
        locationStora()
    }, [])

    //Поисковик фильратций
    const SearchInput = useMemo(() => {
        if (!search.trim()) {
            setFilteredTodos([]);
            return
        }
        const resaut = todos.filter((ind) =>
            ind.text.toLowerCase().includes(search.toLowerCase().trim()))
        setFilteredTodos(resaut)
    }, [todos, search])

    const resaut = todos.filter(todo =>
        todo.text.toLowerCase().includes(search.toLowerCase().trim()));

    return (
        <>
            <div>
                <div>
                    <input placeholder="Поиск" value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    {resaut.length > 0 ? <p>Поиск...</p> : <p>Текст ненайден</p>}
                    {filteredTodos.length > 0 ? (
                        <ul>{filteredTodos.map((todo) => (
                            <li key={todo.id}>{todo.text}</li>
                        ))}</ul>
                    ) : (<p>Текста нету</p>)}
                </div>
                <input placeholder="Создать задачу" type="text" value={inputText}
                    onChange={e => setInputText(e.target.value)} />
                <button onClick={() => { addTodoText(inputText); setInputText('') }}
                    disabled={!inputText.trim()}>Добавить</button>
                <ul>{todos.map((ind) => (
                    <li key={ind.id}>
                        {editingId === ind.id ? (
                            <input value={redactInputText}
                                onChange={(e) => setRedactInputText(e.target.value)}
                                placeholder="Редактировать" />
                        ) : (
                            <>
                                <span className={"todo_Text" + `${ind.done}`}>{ind.text}</span>
                                {ind.done === false ? <p>Не зделан</p> : <p>Зделан</p>}
                            </>
                        )}
                        <button onClick={() => removeTodoText(ind.id)}>Удалить</button>
                        <button onClick={() => provActivZadach(ind.id)}>Зделан</button>
                        {editingId === ind.id ? (
                            <button onClick={saveEdit}>Сохранить</button>
                        ) : (
                            <button onClick={() => startEdit(ind.id, ind.text)}>Редактировать</button>
                        )}
                    </li>
                ))}</ul>
            </div>
        </>
    )
}