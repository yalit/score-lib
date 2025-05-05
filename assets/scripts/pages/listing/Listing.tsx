import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import CardContent from "../../components/card/CardContent";
import ListingTable from "../../components/listing/listingTable";
import {ListingTableDataProvider} from "../../context/listing/listingTableDataContext";
import useListingPathInformation from "../../hooks/listing/useListingPathInformation";
import {useListing} from "../../hooks/listing/useListing";
import {useMemo} from "react";
import ListingShow from "./ListingShow";

export default function Listing() {
    const pathInfo = useListingPathInformation();
    const listing = useListing(pathInfo.data ?? '')

    const display = useMemo(() => {
        if (pathInfo.action === 'show') {
            return <ListingShow listing={listing}/>
        }
        if (pathInfo.action === 'list') {
            return (
                <ListingTableDataProvider searchData={""}>
                    <ListingTable/>
                </ListingTableDataProvider>
            )
        }
    }, [pathInfo, listing])
    return (
        <Layout>
            <Card>
                <CardContent>{display}</CardContent>
            </Card>
        </Layout>
    );
}
