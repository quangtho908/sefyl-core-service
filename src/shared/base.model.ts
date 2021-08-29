import { Role } from "src/role/role.enum"

export type ResModel = {
    statusCode: number
    data?: any
    message: string
}
export type ReqUserModel = {
    id: string
    role: Role,
    [fieldname: string]: any
}