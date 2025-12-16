import { create } from "zustand"
interface todoInfo {
    id: number;
    text: string;
    done: boolean;
    folder?: string;
}
interface TodoMainFunc {
    todos: todoInfo[];
    addTodoText: (text: string, folder?: string) => void;
    locationStor: () => void
    removeTodoText: (id: number) => void;
    redactorText: (newText: string, id: number) => void;
    provActivZadTodo: (id: number) => void;
}
export const useCreatTodoList = create<TodoMainFunc>((set) => ({
    todos:[],
    addTodoText:(text:string, folder?: string)=>set((state)=>{
        const newTodos=[...state.todos,{id:Date.now(),text,done:false, folder}];
        localStorage.setItem("todos",JSON.stringify(newTodos));
        return {todos:newTodos}

    }),
    locationStor:()=>{
        const stored=localStorage.getItem("todos");
        if(stored){
            set({todos:JSON.parse(stored)})
        }
    },
    removeTodoText:(id:number)=>set((state)=>{
        const newTodos=state.todos.filter((ind)=>ind.id!==id);
        localStorage.setItem("todos",JSON.stringify(newTodos));
        return {todos:newTodos}
    }),
    redactorText: (newText: string, id: number) => set((state) => {
    const updatedTodos = state.todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
    );
    localStorage.setItem("todos",JSON.stringify(updatedTodos))
    return{todos:updatedTodos};
    }),
    provActivZadTodo:(id:number)=>set((state)=>{
        const newDoun=state.todos.map((ind)=>
        ind.id===id ? {...ind,done:!ind.done} : ind
    );
        localStorage.setItem("todos",JSON.stringify(newDoun))
        return{todos:newDoun};
    })

}));

interface NewTasck{
    id:number;
    name:string;
    slug?:string;
    img?:boolean
}
interface TasckNewText{
    masNew:NewTasck[];
    addNewNameText:(name:string)=>void;
    removeNewString:(id:number)=>void;
    loadingNewNameText:()=>void;
    provImgPeople:(img:boolean)=>void
}

const createSlug=(name:string):string=>{
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') 
        .replace(/[\s_-]+/g, '-') 
        .replace(/^-+|-+$/g, ''); 
}

export const useCreatNewTasck=create<TasckNewText>((set)=>({
    masNew: (() => {
        try {
            const raw = localStorage.getItem("masNew");
            return raw ? JSON.parse(raw) as NewTasck[] : [];
        } catch {
            return [];
        }
    })(),
    addNewNameText:(name:string)=>set((state)=>{
        const newSlag=createSlug(name)
        const newText=[...state.masNew,{id:Date.now(),name,slug:newSlag}];
        localStorage.setItem("masNew",JSON.stringify(newText));
        return {masNew:newText}
    }),
    removeNewString:(id:number)=>set((state)=>{
    const newId=state.masNew.filter((ind)=>
    ind.id!==id);
    localStorage.setItem("masNew",JSON.stringify(newId));
    return {masNew:newId}
    }),
    loadingNewNameText:() => set(() => {
    try {
        const raw = localStorage.getItem("masNew");
        const parsed = raw ? JSON.parse(raw) as NewTasck[] : [];
        return { masNew: parsed };
        } catch {
            return { masNew: [] };
        }
    }),
    provImgPeople:(img:boolean)=>set((state)=>{
        const provImg=state.masNew.filter((ind)=>
        ind.img===img ? true :false)
        localStorage.setItem("masNew",JSON.stringify(provImg));
        return {masNew:provImg}
    })
}))