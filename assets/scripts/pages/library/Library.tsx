import Layout from "../../components/layout/Layout";
import {useAllScores} from "../../hooks/library/useAllScores";
import ScoreTable from "../../components/scoreTable/ScoreTable";
import Card from "../../components/card/Card";
import CardContent from "../../components/card/CardContent";
import {AllowedScoreOrderBy} from "../../repository/library.repository";
import {Direction} from "../../model/generics.interface";

export default function Library() {
    const {nbAllItems, scores, fetchData} = useAllScores()

    const sortTable = (field: AllowedScoreOrderBy, direction: Direction) => {
        fetchData.order.set({by: field, direction: direction})
    }

    const moveToPage = (page: number) => {
        fetchData.page.set(page)
    }

    return (
        <Layout>
            <Card>
                <CardContent>
                    <ScoreTable scores={scores} deleteScore={(score) => console.log("delete")} sortTable={sortTable}
                                moveToPage={moveToPage} page={fetchData.page.value} nbTotalItems={nbAllItems} itemsPerPage={fetchData.nbPerPage.value}/>
                </CardContent>
            </Card>
        </Layout>
    )
}
