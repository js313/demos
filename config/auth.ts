/**
 * Config source: https://git.io/JY0mp
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import { AuthConfig } from '@ioc:Adonis/Addons/Auth'
import Env from "@ioc:Adonis/Core/Env";

/*
|--------------------------------------------------------------------------
| Authentication Mapping
|--------------------------------------------------------------------------
|
| List of available authentication mapping. You must first define them
| inside the `contracts/auth.ts` file before mentioning them here.
|
*/
const authConfig: AuthConfig = {
  guard: 'jwt',
  guards: {
    /*
    |--------------------------------------------------------------------------
    | Web Guard
    |--------------------------------------------------------------------------
    |
    | Web guard uses classic old school sessions for authenticating users.
    | If you are building a standard web application, it is recommended to
    | use web guard with session driver
    |
    */
    jwt: {
      driver: "jwt",
      publicKey: Env.get('JWT_PUBLIC_KEY', '').replace(/\\n/g, '\n'),
      privateKey: Env.get('JWT_PRIVATE_KEY', '').replace(/\\n/g, '\n'),
      persistJwt: false,
      jwtDefaultExpire: '10m',
      refreshTokenDefaultExpire: '10d',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'jwt_tokens',
        foreignKey: 'user_id'
      },
      provider: {
        driver: "lucid",
        identifierKey: "id",
        uids: [],
        model: () => import('App/Models/User')
      }
    },
  },
}

export default authConfig
