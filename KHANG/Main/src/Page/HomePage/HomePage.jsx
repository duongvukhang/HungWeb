import CTABanner from "./Ctabanner/Ctabanner.jsx"
import StatsBar from "./StatsBar/StatsBar.jsx"
import MechanicalDesignSection from "./ShortServices/MechanicalDesign.jsx"
import PipelineProcess from "./StatsBar/ServiceBar.jsx"
import WhyChooseUs from "./OtherServices/OtherService.jsx"
export default function HomePageComponent() {
    return (
        <>
        
        <MechanicalDesignSection/>
        <StatsBar/>
        <PipelineProcess/>
        <WhyChooseUs/>
        <CTABanner/>

        </>
    )
}