import useLocation from "../useLocation";
import {useMemo} from "react";

export interface LibraryPathInformation {
    action: LibraryAction,
    data?: string
}

const pathPrefix = '/library'
const libraryActions = ['index', 'search'] as const
export type LibraryAction = typeof libraryActions[number]

const isLibraryAction = (x: any): x is LibraryAction => {
    return libraryActions.includes(x)
}

export default function useLibraryPathInformation(): LibraryPathInformation {
    const {path} = useLocation();

    const pathData = useMemo<string[]>(() => path.replace(pathPrefix, '').split('/'), [path])

    return useMemo<LibraryPathInformation>(() => {
        if (pathData.length === 1) {
            return {action: 'index'}
        }

        return {
            action: isLibraryAction(pathData[1]) ? pathData[1] : 'index',
            data: pathData[2]
        }
    }, [pathData])
}
