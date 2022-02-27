import React, { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import {useIntersection} from "../utility/intersection";
import {Post} from "../type/Post";
import {Endpoint} from "../constants/endpoints";
import {getPostsFetcher} from "../apis/PostsApi";
import {PostCard} from "../components/organisms/Card/PostCard/PostCard";


export default function App() {

  const ref = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;

  const intersection = useIntersection(ref);

  const limit = 15;

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
    if (intersection && !isReachingEnd) {
      getNextDataPosts();
    }
  }, [intersection, isReachingEnd]);

  if (error) return "failed to load";
  if (!posts) return "loading";

  const postList = posts.flat();
  console.log("際レンダリング")

  return (
    <div className="App">
      <h2>SWRを使った無限スクロール</h2>
      {postList.map((post, i) => (
        <PostCard targetPostData={post}/>
      ))}

      {/* 次のデータを取得するトリガー */}
      <div ref={ref}>
        {!isReachingEnd ? "読み込み中" : "すべて読み込みました。"}
        {isEmpty ? "取得するデータはありませんでした。" : null}
      </div>
    </div>
  );
}
