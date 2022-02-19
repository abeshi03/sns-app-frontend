/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import React from "react";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./userDetailsPage.module.scss";

/* --- カスタムフック -------------------------------------------------------------------------------------------------- */
import { useUser } from "../../../hooks/useUser";


const userDetailsPage = () => {

  const { user, userError, userLoading } = useUser();

  return (
    <div className={styles.userDetailsPage}>
      <h1>ユーザー詳細ページ</h1>
      { userLoading && <p>ロード中</p> }
      { userError && <p>エラー発生</p> }
      { user &&
        <>
          <p>{user.id}</p>
          <p>{user.name}</p>
          <p>{user.description}</p>
        </>

      }
    </div>
  )
}


export default userDetailsPage;
