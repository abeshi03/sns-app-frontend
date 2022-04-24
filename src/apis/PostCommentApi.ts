/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import axios from "axios";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { ApiResponse } from "../type/response/ApiResponse";
import { CommentsResponse } from "../type/response/CommentsResponse";


export async function getCommentsFetcher(endPoint: string): Promise<CommentsResponse> {
  const response: ApiResponse<CommentsResponse> = await axios.get(endPoint);
  return (response.data).data;
}
