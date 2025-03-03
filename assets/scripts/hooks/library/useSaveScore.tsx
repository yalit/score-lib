import {Score} from "../../model/library/score.interface";
import {createScore, updateScore} from "../../repository/library/score.repository";
import useRouter from "../useRouter";
import { useRedirect } from "../useRedirect";
import { useMutation } from "react-query";

export default function useSaveScore(): (score: Score) => void {
    const {generate} = useRouter()
    const redirect = useRedirect()

    const onSuccess = (score: Score) => redirect(generate('app_library_score_show', {id: score.id})) 

    const createMutation = useMutation({
        mutationFn: createScore,
        onSuccess
    })

    const updateMutation = useMutation({
        mutationFn: updateScore,
        onSuccess
    })
    return (score: Score) =>  {
        if (score.id) {
            updateMutation.mutate(score)
        } else {
            createMutation.mutate(score)
        }
    }
}
