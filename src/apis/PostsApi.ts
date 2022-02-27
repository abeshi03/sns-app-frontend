/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import axios from "axios";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { ApiResponse } from "../type/response/ApiResponse";
import { Post } from "../type/Post";


export async function getPostsFetcher(endPoint: string): Promise<Post[]> {

  try {

    const responseData: ApiResponse<Post[]> = await axios.get(endPoint);

    return (responseData.data).data;

   } catch (error: unknown) {

    console.log(error);
    throw new Error("API ERROR: getPosts");
  }
}
