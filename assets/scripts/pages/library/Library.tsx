import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import CardContent from "../../components/card/CardContent";
import {LibraryTableDataProvider} from "../../context/library/LibraryTableDataProvider";
import useLibraryPathInformation from "../../hooks/library/useLibraryPathInformation";
import {useEffect, useState} from "react";
import LibraryTable from "../../components/library/libraryTable";
import {LibraryFilters} from "../../components/library/libraryFilters";
import {PlusIcon} from "lucide-react";
import {Button} from "../../shadcdn/components/ui/button";
import useRouter from "../../hooks/useRouter";

export default function Library() {
    const {generate} = useRouter()
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
                    <LibraryTableDataProvider searchData={searchData}>
                        <div className="flex justify-between items-start">
                            <LibraryFilters />
                            <a href={generate('app_library_score_new')}>
                                <Button type="button" variant="outline"><PlusIcon/>Ajouter</Button>
                            </a>
                        </div>
                        <LibraryTable />
                    </LibraryTableDataProvider>
                </CardContent>
            </Card>
        </Layout>
    )
}
