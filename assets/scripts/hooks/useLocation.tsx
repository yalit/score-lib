import {number, string} from "yup";

export interface URL {
    path: string,
    search: string
}

export default function useLocation(): URL {
    return {
        path: window.location.pathname,
        search: window.location.search
    }
}
