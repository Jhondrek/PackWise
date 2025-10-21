import style from "./SearchForm.module.css"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUp, faCircleDown } from "@fortawesome/free-solid-svg-icons";

export default function SearchForm(){

    const [formInformation, setFormInformation] = useState("")
    const [isSecondElementEntered, setIsSecondElementEntered] = useState([false, false])
    
    function handleSubmit(event){
        event.preventDefault()
        console.log("handleSubmit triggered", formInformation)
    }


    //back button

    function showlLastInputs(){
        setIsSecondElementEntered((prev)=>{

            const newPrev = [...prev]
        
           for (let i = newPrev.length -1; i >=0 ; i--) {
                if (newPrev[i] === true) {
                    newPrev[i] = false
                    break
                }
            }
            return newPrev
        }
        
         )
    }

    function showNextInputPairs(){
        setIsSecondElementEntered((prev)=>{

            const newPrev = [...prev]
        
           for (let i = 0; i < newPrev.length; i++) {
                if (newPrev[i] === false) {
                    newPrev[i] = true
                    break
                }
            }
            return newPrev
        })
    }

    

    function handleOnBlur(event){
        showNextInputPairs()

    }

    function handleEnterKey(e){
        if(e.key === "Enter"){
            showNextInputPairs()
                    console.log(isSecondElementEntered)

        }
    }



    

console.log(isSecondElementEntered)

    return(

        <form onSubmit={handleSubmit} className={style.form}>
            <FontAwesomeIcon icon={faCircleUp} className={`${style.form__CircleUpIcon} ${isSecondElementEntered[0]  ? style.visible  : undefined}`} onClick={()=>{isSecondElementEntered[0] && showlLastInputs()}} />
           
            <section className={`${style.form__locationsCont} ${isSecondElementEntered[0] && style.completed}`}>
                                

                <input type="text" id="country"  placeholder="Origin country" onChange={(e)=>setFormInformation(e.target.value)} />
                <input type="text" id="country"  placeholder="Arriving country" onChange={(e)=>setFormInformation(e.target.value)} />
                <input onBlur={ !isSecondElementEntered[0] ? handleOnBlur : undefined} onKeyDown={(e)=> !isSecondElementEntered[0] && handleEnterKey(e)} className={style.form__travelAreaInput}  type="text" placeholder="Place to explore" onChange={(e)=>setFormInformation(e.target.value)}/>
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
                <div className={style.form__TravelerDataCont__travelerData}>
                    <label htmlFor="">Number of travelers</label>
                    <input type="number"/>
                </div>

                <div className={style.form__TravelerDataCont__travelerData}>
                    <input type="number"/>
                    <label htmlFor="">USD budget per person</label>
                </div>
            </section>

            <FontAwesomeIcon icon={faCircleDown} className={`${style.form__CircleDownIcon} ${isSecondElementEntered[1] && style.hidden}`} onClick={()=>showNextInputPairs()}/>

            <button className={style.formContainer__button}>Plan My Trip</button>
        </form>
    )
}                                             

