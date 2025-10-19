import style from "./SearchForm.module.css"
import { useState } from "react";

export default function SearchForm(){

    const [formInformation, setFormInformation] = useState("")
    const [isSecondElementEntered, setIsSecondElementEntered] = useState([])
    
    function handleSubmit(event){
        event.preventDefault()
        console.log("handleSubmit triggered", formInformation)
    }

    function handleOnBlur(event){
        showNextInputPairs()
        console.log(isSecondElementEntered)

    }

    function handleEnterKey(e){
        if(e.key === "Enter"){
            showNextInputPairs()
                    console.log(isSecondElementEntered)

        }
    }

    function showNextInputPairs(){
        setIsSecondElementEntered((prev)=>[...prev, true])
        console.log("this has been triggered")
    }

console.log(isSecondElementEntered)
    return(

        <form onSubmit={handleSubmit} className={style.form}>

            <section className={`${style.form__locationsCont} ${isSecondElementEntered[0] && style.completed}`}>
                <input type="text" id="country"  placeholder="Country" onChange={(e)=>setFormInformation(e.target.value)} />
                <input onBlur={ !isSecondElementEntered[0] ? handleOnBlur : undefined} onKeyDown={(e)=> !isSecondElementEntered[0] && handleEnterKey(e)} className={style.form__travelAreaInput} /*ref={travelAreaRef}*/ type="text" placeholder="Travel Area" onChange={(e)=>setFormInformation(e.target.value)}/>
            </section>

           <section className={`${style.form__datesCont} ${ isSecondElementEntered[0] && style.visible} ${ isSecondElementEntered[1] && style.completed}`}>
                <div className={style.form__dateCont}>
                    <input type="date" name="startDate" />
                    <label htmlFor="startDate" >Start date</label>
                </div>
                <div className={style.form__dateCont}>
                    <input type="date" name="endDate"  onBlur={!isSecondElementEntered[1] ? handleOnBlur : undefined} onKeyDown={(e)=> !isSecondElementEntered[0] && handleEnterKey(e)}/>
                    <label  htmlFor="endDate" >End date</label>
                </div>
            </section>

            <section className={`${style.form__TravelerDataCont} ${isSecondElementEntered[1] && style.visible}`}>
                <div className="travelerData">
                    <label htmlFor="">Number of travelers</label>
                    <input type="number"/>
                </div>

                <div className="travelerData">
                    <input type="number"/>
                    <label htmlFor="">Travel Budget per person</label>
                </div>
            </section>

            <button className={style.formContainer__button}>Plan my trip</button>
        </form>
    )
}                                             

