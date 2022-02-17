/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import axios from "axios";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { ApiResponse } from "../type/response/ApiResponse";
import { UsersResponseType } from "../type/response/UsersResponse";


export async function getUsersFetcher(endPoint: string): Promise<UsersResponseType> {

  try {

    const response: ApiResponse<UsersResponseType> = await axios.get(endPoint)

    return (response.data).data;

  } catch (error: unknown) {

    console.log(error);
    throw new Error("API ERROR: getUsers");
  }
}

