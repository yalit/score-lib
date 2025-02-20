import {PropsWithChildren} from "react";
import User from "../model/user.interface";
import {QueryClient, QueryClientProvider, useQuery, UseQueryResult} from "react-query";
import {fetchCurrentUser} from "../repository/security.repository";
import SecurityProvider from "./provider/SecurityProvider";

const queryClient = new QueryClient();

export default function App({children}: PropsWithChildren){
    return (
        <QueryClientProvider client={queryClient}>
            <SecurityProvider>
                {children}
            </SecurityProvider>
        </QueryClientProvider>
    )
}
