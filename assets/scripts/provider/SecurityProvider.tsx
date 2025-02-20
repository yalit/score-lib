import {PropsWithChildren, useEffect} from "react";
import {useQuery, UseQueryResult} from "react-query";
import User from "../model/user.interface";
import {fetchCurrentUser} from "../repository/security.repository";
import {useSetUser} from "../context/security/security.hooks";

export default function SecurityProvider({children}: PropsWithChildren){
    const currentUserQuery: UseQueryResult<User | null> = useQuery({
        queryKey: "currentUser",
        queryFn: fetchCurrentUser,
    })
    const setUser = useSetUser()


    useEffect(() => {
        if(currentUserQuery.data === undefined){return}

        setUser(currentUserQuery.data)
    }, [currentUserQuery.data])

    return <>{children}</>;
}
