import User, {userSchema} from "../model/user.interface";

export const fetchCurrentUser = (): Promise<User|null> => {
    return fetch('api/current_users')
        .then(res => res.json())
        .then(userSchema.parseAsync)
}
