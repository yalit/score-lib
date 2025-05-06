import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import ListingTable from "../../components/listing/listingTable";
import {ListingTableDataProvider} from "../../context/listing/listingTableDataContext";
import useListingPathInformation from "../../hooks/listing/useListingPathInformation";
import {useListing} from "../../hooks/listing/useListing";
import {useMemo} from "react";
import ListingShow from "./ListingShow";
import ListingForm from "./ListingForm";

export default function Listing() {
    const pathInfo = useListingPathInformation();
    const listing = useListing(pathInfo.data ?? '')

    const display = useMemo(() => {
        if (pathInfo.action === 'list') {
            return (
                <ListingTableDataProvider searchData={""}>
                    <ListingTable/>
                </ListingTableDataProvider>
            )
        }
        if (pathInfo.action === 'show') {
            return <ListingShow listing={listing}/>
        }
        if (pathInfo.action === 'new') {
            return <ListingForm listing={null}/>
        }
        if (pathInfo.action === 'edit' && listing) {
            return <ListingForm listing={listing}/>
        }
    }, [pathInfo, listing])

    return (
        <Layout>
            <Card>
                {display}
            </Card>
        </Layout>
    );
}
