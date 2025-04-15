import Layout from "../../components/layout/Layout";
import ScoreTable from "../../components/scoreTable/ScoreTable";
import Card from "../../components/card/Card";
import CardContent from "../../components/card/CardContent";
import {AllScoresTableDataProvider} from "../../context/library/AllScoresTableDataProvider";

export default function Library() {
    //const path = useLibraryPathInformation()

    // useEffect(() => {
    //     if (path.action === 'search' && path.data !== undefined) {
    //         fetchData.set({search: path.data})
    //     }
    // }, [path]);
    return (
        <Layout>
            <Card>
                <CardContent>
                    <AllScoresTableDataProvider>
                        <ScoreTable />
                    </AllScoresTableDataProvider>
                </CardContent>
            </Card>
        </Layout>
    )
}
