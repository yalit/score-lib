import {useLastScores} from "../../hooks/library/useLastScores";
import ScoreTable from "./ScoreTable";
import Card from "../card/Card";
import CardContent from "../card/CardContent";

export function HomeScoreTable() {
    const {scores} = useLastScores()

    return (
        <Card className="mt-5">
            <CardContent><ScoreTable scores={scores} /></CardContent>
        </Card>
    )
}
