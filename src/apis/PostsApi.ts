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

    console.log(error);
    throw error;
  }
}

export async function getPostFetcher(endPoint: string): Promise<Post> {

  try {

    const responseData: ApiResponse<Post> = await axios.get(endPoint);
    return (responseData.data).data;
  } catch (error: unknown) {

    console.log(error);
    throw error;
  }
}
