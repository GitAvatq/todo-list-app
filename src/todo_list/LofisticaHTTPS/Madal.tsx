import React, { useState } from 'react';
import { useCreatNewTasck } from '../zustand';
import '../LofisticaHTTPS/button__CSS/Modal.css'

interface ModalProps{
    onClose:()=>void
}
export const  Modal:React.FC<ModalProps>=({onClose})=>{
    const [inputText,setInputText]=useState<string>("")

    // const masNew=useCreatNewTasck((state)=>state.masNew)
    const addNewtext=useCreatNewTasck((state)=>state.addNewNameText);

  const handleContentClick = (e:any) => {
    e.stopPropagation(); 
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      
      <div className="modal-content" onClick={handleContentClick}>
        <h2>+New Task</h2>
        <h5>Название новой папки</h5>
        <p>Пользователь прошу не ведите home названеи у вас получитса простой папка без ничего</p>
        <input placeholder='Название' value={inputText}
        type='text' onChange={(e)=>setInputText(e.target.value)}/>
        <button onClick={()=>{addNewtext(inputText);setInputText("");}}
        disabled={!inputText.trim()}>Добавить</button>
        <button onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}