import {PropsWithChildren} from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./Searchbar";

export default function Layout({children}: PropsWithChildren) {
    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row gap-0">
            <Sidebar />
            <div className="content flex-1 min-h-screen">
                <SearchBar/>
                <main className="w-full p-5">
                    { children }
                </main>
            </div>
        </div>
    )
}
