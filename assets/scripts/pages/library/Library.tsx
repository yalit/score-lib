import Layout from "../../components/layout/Layout";
import {useAllScores} from "../../hooks/library/useAllScores";
import ScoreTable from "../../components/scoreTable/ScoreTable";
import Card from "../../components/card/Card";
import CardContent from "../../components/card/CardContent";
import {AllowedScoreOrderBy} from "../../repository/library.repository";
import {Direction} from "../../model/generics.interface";
import useDeleteScore from "../../hooks/library/useDeleteScore";

export default function Library() {
    const {nbAllItems, scores, fetchData} = useAllScores()
    const deleteScore = useDeleteScore(["allScores", fetchData])

    const sortTable = (field: AllowedScoreOrderBy, direction: Direction) => {
        fetchData.set({order: {by: field, direction}})
    }

    const moveToPage = (page: number) => {
        fetchData.set({page})
    }

    const changeNbPerPage = (nbPerPage: number) => {
        fetchData.set({page: 1, nbPerPage})
    }

    return (
        <Layout>
            <Card>
                <CardContent>
                    <ScoreTable scores={scores} deleteScore={deleteScore} sortTable={sortTable}
                                moveToPage={moveToPage} page={fetchData.values.page} nbTotalItems={nbAllItems}
                                itemsPerPage={fetchData.values.nbPerPage} changeNbPerPage={changeNbPerPage}/>
                </CardContent>
            </Card>
        </Layout>
    )
}
