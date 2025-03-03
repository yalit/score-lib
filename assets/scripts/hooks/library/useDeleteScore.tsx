import {useMutation, useQueryClient} from "react-query";
import {Score} from "../../model/library/score.interface";
import {deleteScore} from "../../repository/library/score.repository";

export default function useDeleteScore(queryToInvalidate: string|[string, any]): (score: Score) => void {
    const queryClient = useQueryClient();
    const mutationQuery = useMutation({
        mutationFn: deleteScore,
        onSuccess: () => queryClient.invalidateQueries({queryKey: queryToInvalidate}),
    })

    return (score: Score) => mutationQuery.mutate(score)
}
