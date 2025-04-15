import {lastScoresQueryKey, useLastScores} from "../../hooks/library/useLastScores";
import ScoreTable from "./ScoreTable";
import Card from "../card/Card";
import CardContent from "../card/CardContent";
import CardTitle from "../card/CardTitle";

export function HomeScoreTable() {
    const {scores} = useLastScores()

    return (
        <Card className="mt-5">
            <CardTitle>Les 10 dernières partitions</CardTitle>
            <CardContent><ScoreTable scores={scores} deleteQueryToInvalidate={lastScoresQueryKey} nbTotalItems={scores.length} /></CardContent>
        </Card>
    )
}
