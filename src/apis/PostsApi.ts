/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import axios from "axios";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { Post } from "../type/Post";
import { ApiResponse } from "../type/response/ApiResponse";
import { PostsResponse } from "../type/response/PostsResponse";


export async function getPostsFetcher(endPoint: string): Promise<Post[]> {

  try {

    const responseData: ApiResponse<PostsResponse> = await axios.get(endPoint);

    return (responseData.data).data.posts;

   } catch (error: unknown) {

    console.error(error);
    throw new Error("API ERROR: getPosts");
  }
}
