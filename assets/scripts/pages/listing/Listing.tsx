import Layout from "../../components/layout/Layout";
import Card from "../../components/card/Card";
import CardContent from "../../components/card/CardContent";
import ListingTable from "../../components/listing/listingTable";

export default function Listing() {
  return (
    <Layout>
      <Card>
        <CardContent>
          <ListingTable />
        </CardContent>
      </Card>
    </Layout>
  );
}
