import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import ResultCard from "../../components/ResultCard/ResultCard"
import SearchForm from "../../components/SearchForm/SearchForm"
import styles from "./Home.module.css"
import backgroundVideo from "../../assets/videos/backgroundVideoOne.mp4";



export default function Home(){
    return (
        <main>
            <Header/>
            <section className={styles.formContainer}>
                <video autoPlay loop muted className={styles.formContainer__Backgroundvideo}>
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
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