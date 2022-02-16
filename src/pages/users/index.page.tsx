/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import {useEffect, useState, VFC} from "react";
import useSWR from 'swr'

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./usersListPage.module.scss";

/* --- フェッチャー ---------------------------------------------------------------------------------------------------- */
import { getUsersFetcher } from "../../apis/UsersApi";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { UsersResponseType } from "../../type/response/UsersResponse";

/* --- エンドポイント -------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../../constants/endpoints";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------ */
import { Pagination } from "../../components/molecules/Pagination/Pagination";
import { UserCard } from "../../components/organisms/Card/UserCard/UserCard";
import { SearchInputField } from "../../components/atoms/SearchInputField/SearchInputField";
import {set} from "react-hook-form";


const UsersListPage: VFC = () => {


  const [ paginationPageNumber, setPaginationPageNumber ] = useState(1);
  const [ searchWard, setSearchWard ] = useState<string>("");
  const PER_PAGE_NUMBER: number = 10;


  const { data, error } = useSWR<UsersResponseType>(
    Endpoint.getUsers({
      paginationPageNumber,
      itemsCountPerPaginationPage: PER_PAGE_NUMBER,
      searchByUserName: searchWard
    }),
    getUsersFetcher
  )

  const isLoading = !data && !error;

  const heading = (): string => {
    if (searchWard === "") {
      return "ユーザー一覧";
    }

    return `"${searchWard}"の検索結果一覧`
  }


  const usersData = (): JSX.Element | null => {

    if (isLoading) {
      return (
        <div className={styles.usersCardsFlow}>
          <p>ローディング中</p>
        </div>
      )
    }

    if (error) {
      return <p>エラーです</p>
    }

    if (data && data.totalItemsCount === 0) {
      return <p>ユーザーはいません</p>
    }

    if (data && data.itemsCountInSelection === 0) {
      return <p>検索結果なし</p>
    }

    if (data) {
      return (
        <>
          <div className={styles.userCardsFlow}>
            {data.users.map((user) => (
              <UserCard key={user.id} targetUser={user}/>
            ))}
          </div>
          <Pagination
            className={styles.pagination}
            totalCount={data.itemsCountInSelection}
            currentPageNumber={paginationPageNumber}
            perPageNumber={PER_PAGE_NUMBER}
            setStatePageNumber={setPaginationPageNumber}
          />
        </>
      )
    }

    return null;

  }


  return (
    <div className={styles.usersListPage}>
      <SearchInputField
        setStateSearchWard={setSearchWard}
        setStatePageNumber={setPaginationPageNumber}
      />
      <h1 className={styles.heading}>{ heading() }</h1>
      {usersData()}
    </div>
  )
}


export default UsersListPage;
