import DashboardHeader from "./DashboardHeader";
import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import CardTitle from "../../components/card/CardTitle";
import {CardContent} from "../../shadcdn/components/ui/card";
import {LatestScoreTableDataProvider, NB_LATEST_SCORES} from "../../context/library/LatestScoreTableDataProvider";
import LibraryTable from "../../components/library/libraryTable";

export default function Home() {
    return (
        <Layout>
            <DashboardHeader/>
            <Card className="mt-5">
                <CardTitle>Les {NB_LATEST_SCORES} dernières partitions</CardTitle>
                <CardContent>
                    <LatestScoreTableDataProvider >
                        <LibraryTable />
                    </LatestScoreTableDataProvider>
                </CardContent>
            </Card>
        </Layout>
    )
}
