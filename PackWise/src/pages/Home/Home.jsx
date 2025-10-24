import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ResultCard from "../../components/ResultCard/ResultCard"
import SearchForm from "../../components/SearchForm/SearchForm"
import styles from "./Home.module.css"
import firstVideo from "../../assets/videos/first.mp4";
import secondVideo from "../../assets/videos/second.mp4";
import thirdVideo from "../../assets/videos/third.mp4";
import forthVideo from "../../assets/videos/forth.mp4";
import fiftVideo from "../../assets/videos/fifth.mp4";
import sixthVideo from "../../assets/videos/sixth.mp4";
import seventhVideo from "../../assets/videos/seventh.mp4";
import eighthVideo from "../../assets/videos/eighth.mp4";
import { motion } from "motion/react"


import { useState } from "react"



export default function Home(){

    //Video background
    const [currentVideo, setCurrentVideo] = useState(5)
    const [nextVideo, setNextVideo] = useState(null)
    const [isVideoFading, setIsVideoFading] = useState(false)
    const videosSrcs = [firstVideo, secondVideo, forthVideo, fiftVideo, seventhVideo, eighthVideo  ]
    
    
   async function changeToNextVideo(){
                const nextIndex = (currentVideo+1) % videosSrcs.length
                setNextVideo(nextIndex)
                setIsVideoFading(true)
                setTimeout(()=>{
                    setNextVideo(null)
                    setCurrentVideo(nextIndex)
                    setIsVideoFading(false)
                },1000)
    }

    return (
        <main>
            {/* Background Video */}
            <video key={videosSrcs[currentVideo]}
                    src={videosSrcs[currentVideo]}
                    autoPlay
                    loop={false}
                    onEnded={changeToNextVideo}
                    muted
                    className={`${styles.formContainer__Backgroundvideo} ${nextVideo !== null  ? styles.fade : ""}`}>
                    <source src={videosSrcs[currentVideo]} type="video/mp4" />
                </video>

                {nextVideo !== null && <video key={videosSrcs[nextVideo]}
                    src={videosSrcs[nextVideo]}
                    autoPlay
                    loop={false}
                    onEnded={() => {
                        setCurrentVideo(nextVideo);
                        setNextVideo(null);
                    }}
                    muted
                    className={`${styles.secondaryVideo} ${isVideoFading ? styles.fade : ""}`}>
                    <source src={videosSrcs[nextVideo]} type="video/mp4" />
                </video>}

            {/* <Header/> */}
            
            <section className={styles.formContainer}>
                <section className={styles.formContainer__blurBackground}>
                    <h2 className={styles.formContainer__title}>Ready</h2>
                    <h2 className={styles[`formContainer__title--secondary`]}>For your next adventure?</h2>
                    <SearchForm/>

                </section>
            </section>
            {/* <ResultCard/>
            <Footer/> */}
        </main>
    )
    
}