import MasterFadeHome from "../components/master-fade/MasterFadeHome";
import "../App.css"
import MasterFadeEstadisticas from "../components/master-fade/MasterFadeEstadisticas";
import MasterFadeElite from "../components/master-fade/MasterFadeElite";
import MasterFadeCel from "../components/master-fade/MasterFadeCel";
import MasterFadeStackValue from "../components/master-fade/MasterFadeStackValue"

export default function MasterFadePage(){
    return(
        <>
        <MasterFadeHome />
        <MasterFadeEstadisticas />
        <MasterFadeElite />
        <MasterFadeCel />
        <MasterFadeStackValue />
        </>
    )
}