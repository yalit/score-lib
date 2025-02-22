import {useMutation, useQueryClient} from "react-query";
import {Score} from "../../model/library/score.interface";
import {deleteScore} from "../../repository/library.repository";

export default function useDeleteScore(queryToInvalidate: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteScore,
        onSuccess: () => queryClient.invalidateQueries({queryKey: queryToInvalidate}),
    })
}
