import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import CardContent from "../../components/card/CardContent";
import ListingTable from "../../components/listing/listingTable";
import {ListingTableDataProvider} from "../../context/listing/listingTableDataContext";
import useListingPathInformation from "../../hooks/listing/useListingPathInformation";
import {useMemo, useState} from "react";
import { Listing } from "../../model/listing/listing.interface";
import { useListing } from "../../hooks/listing/useListing";

export default function Listing() {
    const pathInfo = useListingPathInformation();
    const listing = useListing(pathInfo.data ?? '')

    return (
        <Layout>
            <Card>
                <CardContent>
                    <ListingTableDataProvider searchData={""}>
                        <ListingTable/>
                    </ListingTableDataProvider>
                </CardContent>
            </Card>
        </Layout>
    );
}
