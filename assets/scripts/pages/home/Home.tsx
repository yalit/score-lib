import DashboardHeader from "./DashboardHeader";
import Layout from "../../components/layout/Layout";
import {HomeScoreTable} from "../../components/scoreTable/HomeScoreTable";

export default function Home() {
    return (
        <Layout>
            <DashboardHeader/>
                <HomeScoreTable />
        </Layout>
    )
}
