import type User from "./User";

export default interface LoginResponseData {
  token: string
  user: User
  refreshToken:string
  expiresIn:number
}