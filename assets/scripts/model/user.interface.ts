export type UserRole = "ROLE_ADMIN" | "ROLE_USER"

export default interface User {
    name: string;
    roles: UserRole[];
}
