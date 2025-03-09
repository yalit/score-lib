import {useTranslator} from "../../hooks/useTranslator";
import {useSearchScores} from "../../hooks/library/useSearchScores";
import {useQuery} from "react-query";
import {useEffect, useState} from "react";
import {SearchResult} from "../../model/library/searchResult.interface";
import {ChevronRightIcon, EllipsisIcon} from "lucide-react";

import '../../../styles/search.css';
import useRouter from "../../hooks/useRouter";

export default function SearchBar() {
    const {trans} = useTranslator();
    const {search} = useSearchScores()
    const [searchValue, setSearchValue] = useState<string>("");
    const [q, setQ] = useState<string>("")

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

    return (
        <div id="search__bar" className="w-full content__header p-5 shadow bg-white relative">
            <div className="content__search w-full relative flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor"
                     className="w-5 h-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
                </svg>
                <label>
                    <input type="text" placeholder={trans('main.searchbar.placeholder')}
                           className="p-3 leading-6 bg-inherit focus:outline-none w-full"
                           value={searchValue} onChange={e => setSearchValue(e.currentTarget.value)} // Need to debounce
                    />
                </label>
            </div>
            {queryScores.data && (
                <div className="absolute top-full px-5 py-1 z-10 bg-white inset-x-0 shadow flex flex-col gap-2">
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
