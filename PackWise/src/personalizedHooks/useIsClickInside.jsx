import { useEffect, useState } from "react"

export default function useIsClickInside(ref){
  const [isElementClicked, setIsElementClicked] = useState(false)

  console.log("aaa")
  useEffect(()=>{

    //if the element that the reference makes reference of is the same as the one the event is targetting right now
    function updateElementClickState(event){
    if(ref.current.contains(event.target)){
      setIsElementClicked(true)
      
    }

    //if the element was clicked before but now is no longer clicked
    if(isElementClicked && !ref.current.contains(event.target)){
      setIsElementClicked(false)
      
    }
    }

    document.addEventListener("mousedown", (event)=>updateElementClickState(event))

    return ()=>document.removeEventListener("mousedown", updateElementClickState)

  },[isElementClicked])

  return isElementClicked
}