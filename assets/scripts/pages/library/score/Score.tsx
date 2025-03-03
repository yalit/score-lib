import Layout from "../../../components/layout/Layout";
import useScorePathInformation from "../../../hooks/library/useScorePathInformation";
import {useScore} from "../../../hooks/library/useScore";
import useScoreDisplayComponent from "../../../hooks/library/useScoreDisplayComponent";

export default function Score() {
    const pathInformation = useScorePathInformation()
    const score = useScore(pathInformation.id)
    const scoreDisplay = useScoreDisplayComponent(score, pathInformation.action)

    return (
        <Layout>
            {scoreDisplay}
        </Layout>
    )
}
