/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import axios from "axios";

/* --- エンドポイント -------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../constants/endpoints";

/* --- interface ----------------------------------------------------------------------------------------------------- */
import { PostLikeApiImpl } from "./implements/PostLikeApiImpl";


export class PostLikeApi implements PostLikeApiImpl {

  public async add(postId: number): Promise<void> {
    await axios.post(Endpoint.addLike(postId),
      {},
      {
        withCredentials: true
      });
  }

  public async remove(postId: number): Promise<void> {
    await axios.delete(Endpoint.removeLike(postId),
      {
        withCredentials: true
      });
  }
}

export const postLikeApi = new PostLikeApi();
