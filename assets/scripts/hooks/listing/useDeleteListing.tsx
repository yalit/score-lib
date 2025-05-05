import {useMutation, useQueryClient} from "react-query";
import {Listing} from "../../model/listing/listing.interface";
import {deleteListing} from "../../repository/listing/listing.repository";

export default function useDeleteListing(
    queryToInvalidate: string | [string, any],
    onSuccess?: () => void
): (listing: Listing) => void {
    const queryClient = useQueryClient();
    const mutationQuery = useMutation({
        mutationFn: deleteListing,
        onSuccess: async () => {
            if (queryToInvalidate) queryClient.invalidateQueries({queryKey: queryToInvalidate})
            if (onSuccess) onSuccess()
        },
    })

    return (listing: Listing) => mutationQuery.mutate(listing)
}
