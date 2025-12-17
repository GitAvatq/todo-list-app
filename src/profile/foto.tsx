import imgOff from "../Profil/img/oregisterPeople.png"
import imfOn from "../Profil/img/user-default.jpg"
// import { useCreatNewTasck } from "../todo_list/zustand"
import { useState} from "react"
import "../Profil/ProfilImg.css"

export default function LogoPeople(){
    const [isOpen,setIsOpen]=useState<boolean>(false)

    // const provImg=useCreatNewTasck((ind)=>ind.provImgPeople);

    return(
        <>
        <div className="provil_img">
            <img className="img_peopel" alt="img_foto" src={isOpen ? imfOn : imgOff}/>

            <button onClick={()=>setIsOpen(!isOpen)}>По менять фото</button>
        </div>
        </>
    )
}