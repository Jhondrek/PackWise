import style from "./SearchForm.module.css"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUp, faCircleDown } from "@fortawesome/free-solid-svg-icons";

export default function SearchForm(){

    const [formProgressState, setFormProgressState] = useState([false, false])

    //React-Hook-Form validation

    const{register, handleSubmit, trigger, clearErrors, formState: {errors}} = useForm({defaultValues:{
        originCountry:"",
        arrivingCountry:"",
        placeToExplore:"",
        startDate: "",
        endDate:"",
        numberOfTravelers:"",
        USDBudgetPerPerson:""
    },

})
      
    function submitForm(data){
        console.log("handleSubmit triggered", errors)
    }

    console.log("Watch values : ", errors)

    async function areCurrentInputsValid() {
        
        const currentErrorObject = await getCurrentErrorsState()
        console.log(currentErrorObject)

        if(formProgressState[1] === false && currentErrorObject){
            return "tercera true" 
        }
        if(formProgressState[1] === false && currentErrorObject){
            return true
        }else if(formProgressState[0] === false && currentErrorObject){
            return true
        }
        return false
    }

    async function getCurrentErrorsState(){
        const firstInputSection = await trigger(["originCountry", "arrivingCountry", "placeToExplore"])
        const secondInputSection = await trigger(["startDate", "endDate"])
        const thirdInputSection = await trigger(["numberOfTravelers", "USDBudgetPerPerson"])

        if (formProgressState[0] === false) {
            return firstInputSection;
        }

        if (formProgressState[0] === true && formProgressState[1] === false) {
            return secondInputSection;
        }

        if (formProgressState[1] === true) {
            return thirdInputSection;
        }

        return false;
    }

    //back button

    function showlLastInputs(){
        setFormProgressState((prev)=>{

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

   async function showNextInputPairs(){
        if(await areCurrentInputsValid()){
            setFormProgressState((prev)=>{

            const newPrev = [...prev]
        
           for (let i = 0; i < newPrev.length; i++) {
                if (newPrev[i] === false) {
                    newPrev[i] = true
                    break
                }
            }
            clearErrors()
            return newPrev
        })
        }
        
    }

    

    function handleOnBlur(event){
        showNextInputPairs()

    }

    function handleEnterKey(e){
        if(e.key === "Enter"){
            showNextInputPairs()
                    console.log(formProgressState)

        }
    }



    

console.log(formProgressState)

    return(

        <form onSubmit={handleSubmit(submitForm)} className={style.form}>
            <FontAwesomeIcon icon={faCircleUp} className={`${style.form__CircleUpIcon} ${formProgressState[0]  ? style.visible  : undefined}`} onClick={()=>{formProgressState[0] && showlLastInputs()}} />
           
            <section  className={`${style.form__locationsCont} ${formProgressState[0] && style.completed}` }>
                <div>
                    <input {...register("originCountry", {required:"Please enter a country"})} type="text"   placeholder="Origin country"  />
                    <p className={style.form__error}> {errors.originCountry && errors.originCountry.message}</p>
                </div>
                <div>
                    <input {...register("arrivingCountry", {required:"Please enter a country"})} type="text"   placeholder="Arriving country"  />
                    <p className={style.form__error}> { errors.arrivingCountry && errors.arrivingCountry.message}</p>
                </div>
                <div>
                    <input {...register("placeToExplore", {required:"Please enter a place to explore"})}  className={style.form__travelAreaInput}  type="text" placeholder="Place to explore" onBlur={ !formProgressState[0] ? handleOnBlur : undefined} onKeyDown={(e)=> !formProgressState[0] && handleEnterKey(e)}/>
                    <p className={style.form__error}> {errors.placeToExplore && errors.placeToExplore.message}</p>
                    
                </div>

                
            </section>

           <section className={`${style.form__datesCont} ${ formProgressState[0] && style.visible} ${ formProgressState[1] && style.completed}`}>
                <div >
                    <div className={style.form__dateCont}>
                        <input {...register("startDate", {required:"Please enter the start date"})} type="date" name="startDate" />
                        <label htmlFor="startDate" >Start date</label>
                    </div>
                    <p className={style.form__error}> {errors.startDate && errors.startDate.message}</p>
                </div>
                <div >
                    <div className={style.form__dateCont}>
                        <input {...register("endDate", {required:"Please enter the end date"})} type="date" name="endDate"  onBlur={!formProgressState[1] ? handleOnBlur : undefined} onKeyDown={(e)=> !formProgressState[0] && handleEnterKey(e)}/>
                        <label  htmlFor="endDate" >End date</label>
                    </div>
                    <p className={style.form__error}> {errors.endDate && errors.endDate.message}</p>
                </div>
            </section>

            <section className={`${style.form__TravelerDataCont} ${formProgressState[1] && style.visible}`}>
                <div >
                    <div className={style.form__TravelerDataCont__travelerData}>
                        <label  htmlFor="">Number of travelers</label>
                        <input {...register("numberOfTravelers", {required:"Please enter the number of travelers"})} type="number"/>
                    </div>
                    <p className={style.form__error}> {errors.numberOfTravelers && errors.numberOfTravelers.message}</p>
                </div>

                <div >
                    <div className={style.form__TravelerDataCont__travelerData}>
                        <input {...register("USDBudgetPerPerson", {required:"Please enter USD budget per person", min: {value:100, message: "minimum value is 100"}})} type="number"/>
                        <label  htmlFor="">USD budget per person</label>
                    </div>
                    <p className={style.form__error}> {errors.USDBudgetPerPerson && errors.USDBudgetPerPerson.message}</p>
                </div>
            </section>

            <FontAwesomeIcon icon={faCircleDown} className={`${style.form__CircleDownIcon} ${formProgressState[1] && style.hidden}`} onClick={()=>showNextInputPairs()}/>

            <button className={`${style.formContainer__button} ${formProgressState[1]=== true && style.visible }`}>Plan My Trip</button> 

        </form>

    )
}                                             

