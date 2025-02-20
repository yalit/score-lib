import { z } from "zod";

const UserRoles = z.enum(["ROLE_ADMIN", "ROLE_USER"])
export type UserRole = z.infer<typeof UserRoles>

export const userSchema = z.object({
    name: z.string(),
    roles: z.array(UserRoles),
})

type User = z.infer<typeof userSchema>
export default User
