/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./postDetailsPage.module.scss"

/* --- api関連 ------------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../../../constants/endpoints";
import { getPostFetcher } from "../../../apis/PostsApi";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import {Post} from "../../../type/Post";

const PostDetailsPage: NextPage = () => {

  const router = useRouter();
  /* １回目のレンダリングのrouter.queryはundefinedの為、isReadyでクライアントで使える状態を確認する */
  if (!router.isReady) {
    return null
  }
  const { postId } = router.query;


  /* --- 投稿取得 ----------------------------------------------------------------------------------------------------- */
  const { data, error } = useSWR<Post>(Endpoint.getPost({ postId: Number(postId) }));

  return (
    <div className={styles.postDetailsPage}>
      <p>詳細</p>
    </div>
  );
}

export default PostDetailsPage;
