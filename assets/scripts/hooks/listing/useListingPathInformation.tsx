import useLocation from "../useLocation";
import {useMemo} from "react";

export interface ListingPathInformation {
    action: ListingAction,
    data?: string
}

const pathPrefix = '/listing'
const listingActions = ['list', 'show', 'edit', 'new'] as const
export type ListingAction = typeof listingActions[number]

const isListingAction = (x: any): x is ListingAction => {
    return listingActions.includes(x)
}

export default function useListingPathInformation(): ListingPathInformation {
    const {path} = useLocation();

    const pathData = useMemo<string[]>(() => path.replace(pathPrefix, '').split('/'), [path])

    return useMemo<ListingPathInformation>(() => {
        if (pathData.length === 1) {
            return {action: 'list'}
        }

        return {
            action: isListingAction(pathData[1]) ? pathData[1] : 'list',
            data: pathData[2]
        }
    }, [pathData])
}
