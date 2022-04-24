/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import axios from "axios";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { ApiResponse } from "../type/response/ApiResponse";
import { CommentsResponse } from "../type/response/CommentsResponse";
import { Comment } from "../type/Comment";

/* --- エンドポイント --------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../constants/endpoints";


export async function getCommentsFetcher(endPoint: string): Promise<CommentsResponse> {
  const response: ApiResponse<CommentsResponse> = await axios.get(endPoint);
  return (response.data).data;
}

export async function createComment(createCommentData: Pick<Comment, "text">): Promise<number> {
  const response: ApiResponse<{ id: number }> = await axios.post(Endpoint.createComment, {
    text: createCommentData.text
  });

  return (response.data).data.id;
}
