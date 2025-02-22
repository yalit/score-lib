import {lastScoresQueryKey, useLastScores} from "../../hooks/library/useLastScores";
import ScoreTable from "./ScoreTable";
import Card from "../card/Card";
import CardContent from "../card/CardContent";
import useDeleteScore from "../../hooks/library/useDeleteScore";
import {Score} from "../../model/library/score.interface";

export function HomeScoreTable() {
    const {scores} = useLastScores()
    const deleteScoreMutation = useDeleteScore(lastScoresQueryKey)

    const deleteScore = (score: Score) => {
        deleteScoreMutation.mutate(score)
    }

    return (
        <Card className="mt-5">
            <CardContent><ScoreTable scores={scores}  deleteScore={deleteScore} nbTotalItems={scores.length} /></CardContent>
        </Card>
    )
}
