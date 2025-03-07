import {Score} from "../../model/library/score.interface";
import {createScore, updateScore} from "../../repository/library/score.repository";
import useRouter from "../useRouter";
import { useRedirect } from "../useRedirect";
import { useMutation } from "react-query";
import {FormScore} from "../../pages/library/score/ScoreForm";

export default function useSaveScore(): (score: FormScore) => void {
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
    return (score: FormScore) =>  {
        if (score.id) {
            updateMutation.mutate(score)
        } else {
            createMutation.mutate(score)
        }
    }
}
