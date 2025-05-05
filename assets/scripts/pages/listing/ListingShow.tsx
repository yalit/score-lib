import {Listing} from "../../model/listing/listing.interface";
import ListingDisplay from "../../components/listing/listingDisplay";

export default function ListingShow({listing}: { listing: Listing | null }) {
    return (
        <>{
            listing ? <ListingDisplay listing={listing} /> : 'Loading...'
        }
        </>
    )
}
