import {useTranslator} from "../../hooks/useTranslator";
import {useSearchScoreResults} from "../../hooks/library/useSearchScoreResults";
import {useQuery} from "react-query";
import {useEffect, useMemo, useState} from "react";
import {SearchResult} from "../../model/library/searchResult.interface";
import {ChevronRightIcon, CornerDownLeftIcon} from "lucide-react";
import useRouter from "../../hooks/useRouter";
import {useRedirect} from "../../hooks/useRedirect";

import '../../../styles/search.css';

export default function SearchBar() {
    const {generate} = useRouter()
    const {trans} = useTranslator();
    const {search} = useSearchScoreResults()
    const [searchValue, setSearchValue] = useState<string>("");
    const [q, setQ] = useState<string>("")
    const [focused, setFocused] = useState<boolean>(false);
    const redirect = useRedirect()

    const resultsTableUrl = useMemo<string>(() => {
        if (q === "") return '#'
        return generate('app_library_search', {q: q})
    }, [q])
    const queryScores = useQuery({
        queryKey: ["searchScores", q],
        queryFn: () => {
            if (q === '') return
            return search(q)
        }
    })

    useEffect(() => {
        const timeout = setTimeout(() => setQ(searchValue), 500)
        return () => clearTimeout(timeout)
    }, [searchValue]);

    useEffect(() => {
        const handleKeyboard = (e: KeyboardEvent) => {
            if (focused && q !== "" && e.key === "Enter") {
                redirect(resultsTableUrl)
            }
        }
        document.addEventListener("keydown", handleKeyboard)

        return () => {
            document.removeEventListener("keydown", handleKeyboard)
        }
    }, [focused, resultsTableUrl, q]);

    return (
        <div id="search__bar" className="w-full content__header p-5 shadow bg-white relative">
            <div className="content__search w-full relative flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor"
                     className="w-5 h-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
                </svg>
                <label className="w-full">
                    <input type="text" placeholder={trans('main.searchbar.placeholder')}
                           className="p-3 leading-6 bg-inherit focus:outline-none w-full"
                           value={searchValue} onChange={e => setSearchValue(e.currentTarget.value)}
                           onFocus={() => setFocused(true)}
                           onBlur={() => setFocused(false)}
                    />
                </label>
            </div>
            {queryScores.data && (
                <div className="absolute top-full px-5 pb-5 z-10 bg-white inset-x-0 shadow flex flex-col gap-2">
                    <a href={resultsTableUrl} className="my-2 font-semibold flex items-center gap-3">
                        <div>Voir les résultats en tableau</div>
                        <div className="font-normal text-gray-600 flex text-sm items-center gap-2 p-1 border rounded border-gray-300">
                            <CornerDownLeftIcon className="h-2 w-2"/> Enter
                        </div>
                    </a>
                    {queryScores.data.map((item, i) => <SearchResultLine key={i} result={item}/>)}
                </div>
            )}
        </div>
    )
}

const SearchResultLine = ({result}: { result: SearchResult }) => {
    const {generate} = useRouter()
    return(
        <a href={generate('app_library_score_show', {id: result.id})} className="flex items-center gap-2">
            <ChevronRightIcon className="h-4 w-4"/>
            <div>{result.title}</div>
            <div>
                (...<span dangerouslySetInnerHTML={{__html: result.matchings.map(match => match.snippet).join(', ')}} />...)
            </div>
        </a>
    )
}
