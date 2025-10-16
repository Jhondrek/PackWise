import style from "./SearchForm.module.css"
import { useState } from "react"
import isElementNoLongerClicked from "../../personalizedHooks/isElementNoLongerClicked"
export default function SearchForm(){

    const [formInformation, setFormInformation] = useState("")

    function handleSubmit(event){
        event.preventDefault()
        console.log("Form submited ", formInformation)
    }

    function showNextInput(){
        
        console.log(isElementNoLongerClicked())
    }

    return(

        <form onSubmit={handleSubmit} className={style.form}>
            <input type="text" id="country" onChange={(e)=>setFormInformation(e.target.value)} placeholder="Country"/>
            <input className={style.form__travelAreaInput} type="text" placeholder="Travel Area"/>
        </form>
    )
}                                             

