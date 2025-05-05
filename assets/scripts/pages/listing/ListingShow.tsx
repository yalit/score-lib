import {Listing} from "../../model/listing/listing.interface";
import ListingDisplay from "../../components/listing/listingDisplay";
import {CardContent} from "../../shadcdn/components/ui/card";

export default function ListingShow({listing}: { listing: Listing | null }) {
    return (
        <>{
            listing ? <ListingDisplay listing={listing} /> : <CardContent>'Loading...'</CardContent>
        }
        </>
    )
}
