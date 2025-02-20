import {PropsWithChildren} from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./Searchbar";

export default function App({children}: PropsWithChildren) {
    return (
        <>
            <Sidebar />
            <div className="content flex-1 min-h-screen">
                <SearchBar/>
                <main className="w-full p-5">
                    { children }
                </main>
            </div>
        </>
    )
}
