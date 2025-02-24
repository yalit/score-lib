import Layout from "../../../components/layout/Layout";
import useScorePathInformation from "../../../hooks/library/useScorePathInformation";
import {useScore} from "../../../hooks/library/useScore";
import {useMemo} from "react";
import ScoreDisplay from "./ScoreDisplay";
import ScoreForm from "./ScoreForm";
import {useTranslator} from "../../../hooks/useTranslator";
import Card from "../../../components/card/Card";
import CardContent from "../../../components/card/CardContent";

export default function Score() {
    const {trans} = useTranslator()
    const pathInformation = useScorePathInformation()
    const score = useScore(pathInformation.id)

    const scoreDisplay = useMemo(() => {
        if (pathInformation.action === 'new') {
            return <ScoreForm/>
        }

        if (!score) {
            return <Card>
                <CardContent>
                    {trans('main.action.loading.label')}
                </CardContent>
            </Card>
        }

        if (pathInformation.action === 'display') {
            return <ScoreDisplay score={score}/>
        }
        return <ScoreForm score={score}/>

    }, [pathInformation.action, score])
    return (
        <Layout>
            {scoreDisplay}
        </Layout>
    )
}
