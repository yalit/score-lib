import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import CardContent from "../../components/card/CardContent";
import ListingTable from "../../components/listing/listingTable";
import {ListingTableDataProvider} from "../../context/listing/listingTableDataContext";

export default function Listing() {
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
