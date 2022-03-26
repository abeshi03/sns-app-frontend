/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import axios from "axios";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { ApiResponse } from "../type/response/ApiResponse";
import { User } from "../type/User";

/* --- エンドポイント --------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../constants/endpoints";

type SignInRequestBody = {
  email: string;
  password: string;
}


export async function signInApi(requestBody: SignInRequestBody): Promise<User> {
  const response: ApiResponse<User> = await axios.post(Endpoint.signIn, {
    email: requestBody.email,
    password: requestBody.password
  });

  return (response.data).data;
}

