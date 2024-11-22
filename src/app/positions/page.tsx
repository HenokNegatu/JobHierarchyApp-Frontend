import PositionInfo from "../components/positionInfo";
import PositionSideBar from "../components/positionSideBar";

export default function Positions() {
    return (
        <div className="space-y-8">
            <PositionSideBar />
            <PositionInfo />
        </div>
    )
}