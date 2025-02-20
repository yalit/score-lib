import {PropsWithChildren} from "react";
import {QueryClient, QueryClientProvider, useQuery, UseQueryResult} from "react-query";
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
