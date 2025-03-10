import {useMutation, useQueryClient} from "react-query";
import {Score} from "../../model/library/score.interface";
import {deleteScore} from "../../repository/library/score.repository";

export default function useDeleteScore(
    queryToInvalidate: string|[string, any],
    onSuccess?: () => void
): (score: Score) => void {
    const queryClient = useQueryClient();
    const mutationQuery = useMutation({
        mutationFn: deleteScore,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: queryToInvalidate})
            if (onSuccess) onSuccess()
        },
    })

    return (score: Score) => mutationQuery.mutate(score)
}
