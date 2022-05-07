/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import axios from "axios";

/* --- エンドポイント -------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../constants/endpoints";


export namespace LikeApi {

  export async function add(postId: number): Promise<void> {
    await axios.post(Endpoint.addLike(postId),
      {},
      {
        withCredentials: true
      });
  }

  export async function remove(postId: number): Promise<void> {
    await axios.delete(Endpoint.removeLike(postId),
      {
        withCredentials: true
      });
  }
}
