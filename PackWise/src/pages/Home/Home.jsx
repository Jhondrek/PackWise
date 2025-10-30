import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ResultCard from "../../components/ResultCard/ResultCard"
import SearchForm from "../../components/SearchForm/SearchForm"
import styles from "./Home.module.css"

import { useState, useEffect } from "react"

export default function Home() {

    // const [currentVideo, setCurrentVideo] = useState(5)
    // const [isVisible, setIsVisible] = useState(true)
    const [isFormSubmited, setIsFormSubmited] = useState(false)
    const [formData, setFormData] = useState(null)

    const videosSrcs = [
        "/videos/first.mp4",
        "/videos/second.mp4",
        "/videos/forth.mp4",
        "/videos/fifth.mp4",
        "/videos/seventh.mp4",
        "/videos/eighth.mp4"
    ]

    function getFormData(data){
        console.log("handleSubmit triggered!!!", data)
        setFormData(data)
    }

    function getRandomVideo() {
        return (Math.floor(Math.random() * videosSrcs.length))
    }


    

    return (
        <main>
            <div className={styles.grayBg}></div>
            {/* Background Video */}
            <video
                src={videosSrcs[getRandomVideo()]}
                autoPlay
                loop={true}
                muted
                preload="auto"
                onEnded={() => ChangeToNextVideo()}
                className={`${styles.formContainer__Backgroundvideo} `}>
                <source src={videosSrcs[getRandomVideo()]} type="video/mp4" />
            </video>


            {/* <Header/> */}

            <section className={styles.formContainer}>
                <section className={`${styles.formContainer__blurBackground}`}>
                    <h2 className={styles.formContainer__title}>Ready</h2>
                    <h2 className={styles[`formContainer__title--secondary`]}>For your next adventure?</h2>
                    <SearchForm getFormData = {getFormData} />
                </section>
                <ResultCard />

                
            </section>
            {/* 
            <Footer/> */}
        </main>
    )

}