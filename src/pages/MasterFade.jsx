import MasterFadeHome from "../components/master-fade/MasterFadeHome";
import "../App.css"
import MasterFadeEstadisticas from "../components/master-fade/MasterFadeEstadisticas";
import MasterFadeElite from "../components/master-fade/MasterFadeElite";

export default function MasterFadePage(){
    return(
        <>
        <MasterFadeHome />
        <MasterFadeEstadisticas />
        <MasterFadeElite />
        </>
    )
}