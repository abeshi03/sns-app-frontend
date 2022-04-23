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
import { Post } from "../../../type/Post";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import {PostCard} from "../../../components/organisms/Card/PostCard/PostCard";


const PostDetailsPage: NextPage = () => {

  const router = useRouter();
  const { postId } = router.query;

  /* --- 投稿取得 ----------------------------------------------------------------------------------------------------- */
  /* router.queryは初回レンダリングがundefinedのため考慮 */
  const { data: post, error } = useSWR<Post>(postId ? Endpoint.getPost({ postId: Number(postId) }) : null, getPostFetcher);
  const isPostLoading = !post && !error;
  const isPostError = error;

  return (
    <div className={styles.postDetailsPage}>
      {isPostLoading && <p>ローディング</p>}
      {isPostError && <p>エラーです</p>}
      {post &&
        <PostCard targetPostData={post}/>
      }
    </div>
  );
}

export default PostDetailsPage;
