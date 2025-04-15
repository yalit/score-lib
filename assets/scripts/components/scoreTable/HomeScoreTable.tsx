import ScoreTable from "./ScoreTable";
import Card from "../card/Card";
import CardContent from "../card/CardContent";
import CardTitle from "../card/CardTitle";
import {LatestScoreTableDataProvider} from "../../context/library/LatestScoreTableDataProvider";

export function HomeScoreTable() {
    return (
        <Card className="mt-5">
            <CardTitle>Les 10 dernières partitions</CardTitle>
            <CardContent>
                <LatestScoreTableDataProvider >
                    <ScoreTable />
                </LatestScoreTableDataProvider>
            </CardContent>
        </Card>
    )
}
