import style from "./SearchForm.module.css"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUp, faCircleDown } from "@fortawesome/free-solid-svg-icons";

export default function SearchForm(){

    const [isSecondElementEntered, setIsSecondElementEntered] = useState([false, false])

    //React-Hook-Form validation

    const{register, handleSubmit, watch, formState: {errors}} = useForm({defaultValues:{
        originCountry:"",
        arravingCountry:""
    }})
    
    function submitForm(data){
        console.log("handleSubmit triggered", data)
    }

    console.log("Watch values : ", watch())

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

        <form onSubmit={handleSubmit(submitForm)} className={style.form}>
            <FontAwesomeIcon icon={faCircleUp} className={`${style.form__CircleUpIcon} ${isSecondElementEntered[0]  ? style.visible  : undefined}`} onClick={()=>{isSecondElementEntered[0] && showlLastInputs()}} />
           
            <section className={`${style.form__locationsCont} ${isSecondElementEntered[0] && style.completed}`}>
                <input {...register("originCountry", {required:"Please enter a country"})} type="text"   placeholder="Origin country"  />
                <input {...register("arraivingCountry, ", {required:"Please enter a country"})} type="text"   placeholder="Arriving country"  />
                <input {...register("placeToExplore", {required:"Please enter a place to explore"})} onBlur={ !isSecondElementEntered[0] ? handleOnBlur : undefined} onKeyDown={(e)=> !isSecondElementEntered[0] && handleEnterKey(e)} className={style.form__travelAreaInput}  type="text" placeholder="Place to explore" />
            </section>

           <section className={`${style.form__datesCont} ${ isSecondElementEntered[0] && style.visible} ${ isSecondElementEntered[1] && style.completed}`}>
                <div className={style.form__dateCont}>
                    <input {...register("startDate", {required:"Please enter the start date"})} type="date" name="startDate" />
                    <label htmlFor="startDate" >Start date</label>
                </div>
                <div className={style.form__dateCont}>
                    <input {...register("endDate", {required:"Please enter the end date"})} type="date" name="endDate"  onBlur={!isSecondElementEntered[1] ? handleOnBlur : undefined} onKeyDown={(e)=> !isSecondElementEntered[0] && handleEnterKey(e)}/>
                    <label  htmlFor="endDate" >End date</label>
                </div>
            </section>

            <section className={`${style.form__TravelerDataCont} ${isSecondElementEntered[1] && style.visible}`}>
                <div className={style.form__TravelerDataCont__travelerData}>
                    <label {...register("numberOfTravelers", {required:"Please enter the number of travelers"})} htmlFor="">Number of travelers</label>
                    <input type="number"/>
                </div>

                <div className={style.form__TravelerDataCont__travelerData}>
                    <input type="number"/>
                    <label {...register("USDBudgetPerPerson", {required:"Please enter USD budget per person", minLength:{value:3, message: "Min length is 3"}})} htmlFor="">USD budget per person</label>
                </div>
            </section>

            <FontAwesomeIcon icon={faCircleDown} className={`${style.form__CircleDownIcon} ${isSecondElementEntered[1] && style.hidden}`} onClick={()=>showNextInputPairs()}/>

            <button className={style.formContainer__button}>Plan My Trip</button>
        </form>
    )
}                                             

