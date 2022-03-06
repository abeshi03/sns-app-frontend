/* --- ライブラリー --------------------------------------------------------------------------------------------------- */
import React, { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";

/* --- アセット ------------------------------------------------------------------------------------------------------ */
import styles from "./Home.module.scss";

/* --- エンドポイント ------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../constants/endpoints";

/* --- 型定義 -------------------------------------------------------------------------------------------------------- */
import { Post } from "../type/Post";

/* --- フェッチャー ---------------------------------------------------------------------------------------------------- */
import { getPostsFetcher } from "../apis/PostsApi";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------ */
import { PostCard } from "../components/organisms/Card/PostCard/PostCard";

/* --- 補助関数 ------------------------------------------------------------------------------------------------------- */
import { useIntersection } from "../utility/intersection";



export default function App() {

  const ref = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;

  const intersection = useIntersection(ref);

  const limit = 2;

  // useSWRInfiniteのキーとなるパラメータ付きURLを生成
  const getKey = (pageNumber: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) return null;
    // pageIndexは0からのため+1をしてpageIndexを1からにする
    return Endpoint.getPosts({ pageNumber: pageNumber + 1, limit })
  };


  const { data: posts, error, size, setSize } = useSWRInfinite( getKey, getPostsFetcher, { initialSize: 2 });

  const isEmpty = posts?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (posts && posts[posts.length - 1]?.length < limit);


  // 次のデータの取得
  const getNextDataPosts = async () => {
    await setSize(size + 1);
  };

  useEffect(() => {
    // トリガーが表示されたらデータを取得
    setTimeout(() => {
      if (intersection && !isReachingEnd) {
        getNextDataPosts();
      }
    }, 1000)
  }, [intersection, isReachingEnd]);

  if (error) return "failed to load";
  if (!posts) return "loading";

  const postList = posts.flat();

  return (
    <div className={styles.homePage}>

      <div className={styles.postCardsFlow}>
        {postList.map((post, index) => (
          <PostCard targetPostData={post} key={index}/>
        ))}
      </div>

      {/* 次のデータを取得するトリガー */}
      <div ref={ref}>
        {!isReachingEnd ? "...Loading" : null}
        {isEmpty ? "取得するデータはありませんでした。" : null}
      </div>
    </div>
  );
}
