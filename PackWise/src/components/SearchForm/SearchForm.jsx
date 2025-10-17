import style from "./SearchForm.module.css"
import { useState } from "react";

export default function SearchForm(){

    const [formInformation, setFormInformation] = useState("")
    
    function handleSubmit(event){
        event.preventDefault()
        console.log("Form submited ", formInformation)
    }

    function handleOnBlur(event){
        console.log("this is the event " + event.target)
    }

    function handleEnterKey(e){
        if(e.key === "Enter"){
            e.preventDefault()
            console.log("the enter key has been pressed, look :"+ e.key )
        }
    }


    return(

        <form onSubmit={handleSubmit} className={style.form}>
            <input type="text" id="country"  placeholder="Country" onChange={(e)=>setFormInformation(e.target.value)} />
            <input onBlur={handleOnBlur} onKeyDown={(e)=> handleEnterKey(e)} className={style.form__travelAreaInput} /*ref={travelAreaRef}*/ type="text" placeholder="Travel Area" onChange={(e)=>setFormInformation(e.target.value)}/>
            <button className={style.formContainer__button}>Plan my trip</button>
        </form>
    )
}                                             

