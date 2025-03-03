import {ReactNode} from "react";
import {Score} from "../../model/library/score.interface";
import {ScoreAction} from "./useScorePathInformation";
import ScoreForm from "../../pages/library/score/ScoreForm";
import Card from "../../components/card/Card";
import CardContent from "../../components/card/CardContent";
import ScoreDisplay from "../../pages/library/score/ScoreDisplay";
import {useTranslator} from "../useTranslator";

export default function useScoreDisplayComponent(score: Score|null, action: ScoreAction): ReactNode {
    const {trans} = useTranslator()

    if (action === 'new') {
        return <ScoreForm/>
    }

    if (!score) {
        return <Card>
            <CardContent>
                {trans('main.action.loading.label')}
            </CardContent>
        </Card>
    }

    if (action === 'display') {
        return <ScoreDisplay score={score}/>
    }
    return <ScoreForm score={score}/>

}
