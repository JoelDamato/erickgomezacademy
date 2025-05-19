import MasterFadeHome from "../components/master-fade/MasterFadeHome";
import "../App.css"
import MasterFadeEstadisticas from "../components/master-fade/MasterFadeEstadisticas";
import MasterFadeElite from "../components/master-fade/MasterFadeElite";
import MasterFadeStackValue from "../components/master-fade/MasterFadeStackValue"
import MasterFadeRoadmap from "../components/master-fade/MasterFadeRoadmap";
import MasterFadeFAQ from "../components/master-fade/MasterFadeFAQ";
import MasterFadeSticky from "../components/master-fade/MasterFadeStiky"

export default function MasterFadePage(){
    return(
        <>
        <MasterFadeSticky />
        <MasterFadeHome />
        <MasterFadeEstadisticas />
        <MasterFadeElite />
        <MasterFadeStackValue />
        <MasterFadeRoadmap />
        <MasterFadeFAQ />
        </>
    )
}