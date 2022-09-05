import { IUser } from "./user";

declare module '@ioc:Adonis/Core/HttpContext' {

    interface HttpContextContract {
        user: IUser | null
    }
}
