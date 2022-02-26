/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import type { NextPage } from 'next'
import Link from "next/link";

/* --- ルーティング ---------------------------------------------------------------------------------------------------- */
import { pagesPath } from "../lib/$path";
import {ChangeEvent} from "react";

const Home: NextPage = () => {

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  return (
    <>
      <Link href={pagesPath.users.$url()}>
        <a style={{color: "blue", textDecoration: "underline"}}>ユーザー一覧</a>
      </Link>
    </>
  )
}

export default Home
