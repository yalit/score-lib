import useLocation from "../useLocation";

export interface ScorePathInformation {
    id: string,
    action: ScoreAction,
}

const pathPrefix = '/library/score/'
const scoreActions = ['display', 'new', 'edit'] as const
export type ScoreAction = typeof scoreActions[number]

const isScoreAction = (x: any): x is ScoreAction => {
    return scoreActions.includes(x)
}

export default function useScorePathInformation(): ScorePathInformation {
    const {path} = useLocation();

    const pathData = path.replace(pathPrefix, '').split('/')

    if (pathData.length === 1) {
        return {
            id: pathData[0] === 'new' ? '' : pathData[0],
            action: pathData[0] === 'new' ? 'new' : 'display',
        }
    }

    return {
        id: pathData[0],
        action: isScoreAction(pathData[1]) ? pathData[1] : 'display'
    }
}
