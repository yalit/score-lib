import {useSecurityStore} from "./securityContext";
import User, {UserRole} from "../../model/user.interface";

export function useUser(): User|null {
    return useSecurityStore((state) => state.user)
}

type SecurityHooks = {
    isGranted: (role: UserRole) => boolean,
    isLogged: () => boolean,
    user: User | null,
}

export function useSecurity(): SecurityHooks {
    const isGranted = (role: UserRole) => {
        const user = useUser()
        if (!user) return false

        return user.roles.includes(role)
    }

    const isLogged = () => null !== useUser()

    return {isGranted, isLogged, user: useUser()}
}
