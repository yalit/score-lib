import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import CardContent from "../../components/card/CardContent";
import {AllScoresTableDataProvider} from "../../context/library/AllScoresTableDataProvider";
import useLibraryPathInformation from "../../hooks/library/useLibraryPathInformation";
import {useEffect, useState} from "react";
import LibraryTable from "../../components/library/libraryTable";

export default function Library() {
    const path = useLibraryPathInformation()
    const [searchData, setSearchData] = useState<string|null>(null);

    useEffect(() => {
        if (path.action === 'search' && path.data !== undefined) {
            setSearchData(path.data);
        }
    }, [path]);

    return (
        <Layout>
            <Card>
                <CardContent>
                    <AllScoresTableDataProvider searchData={searchData}>
                        <LibraryTable />
                    </AllScoresTableDataProvider>
                </CardContent>
            </Card>
        </Layout>
    )
}