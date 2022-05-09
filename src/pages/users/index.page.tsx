/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import React, { useCallback, useState, VFC } from "react";
import useSWR from 'swr'
import Select, { SingleValue } from "react-select";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "./usersListPage.module.scss";
import { formatterStrings } from "../../config/formatterStrings";

/* --- フェッチャー ---------------------------------------------------------------------------------------------------- */
import { getUsersFetcher } from "../../apis/UsersApi";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { UsersResponseType } from "../../type/response/UsersResponse";
import { USER_ROLE, UserRole } from "../../type/User";
import { SelectField } from "../../lib/ReactSelect";

/* --- エンドポイント -------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../../constants/endpoints";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------ */
import { Pagination } from "../../components/molecules/Pagination/Pagination";
import { UserCard } from "../../components/organisms/Card/UserCard/UserCard";
import { SearchInputField } from "../../components/atoms/SearchInputField/SearchInputField";
import { NoSearchGroup } from "../../components/molecules/NoSearchGroup/NoSearchGroup";

/* --- 補助関数 ------------------------------------------------------------------------------------------------------- */
import { scrollTop } from "../../utility/scrollTop";


const UsersListPage: VFC = () => {


  /* --- state ------------------------------------------------------------------------------------------------------- */
  const [ paginationPageNumber, setPaginationPageNumber ] = useState(1);
  const [ searchWard, setSearchWard ] = useState<string>("");
  const [ filteringRole, setFilteringRole ] = useState<UserRole | undefined>(undefined);
  const PER_PAGE_NUMBER: number = 15;


  /* --- ユーザー一覧取得 ----------------------------------------------------------------------------------------------- */
  const { data, error } = useSWR<UsersResponseType>(Endpoint.getUsers({
      paginationPageNumber,
      itemsCountPerPaginationPage: PER_PAGE_NUMBER,
      searchByUserName: searchWard,
      role: filteringRole
    }), getUsersFetcher);

  const isLoading = !data && !error;
  const isError = error;
  const isNoUsers = data && data.totalItemsCount === 0;
  const isNoSearchResults = data && data.itemsCountInSelection === 0;


  /* --- 見出し ------------------------------------------------------------------------------------------------------- */
  const heading = (): string => {
    if (searchWard === "") {
      return "ユーザー一覧";
    }

    return `"${searchWard}"の検索結果一覧`;
  }


  /* --- 検索関連 ----------------------------------------------------------------------------------------------------- */
  const onSearchUserName = useCallback((searchWard: string): void => {
    setPaginationPageNumber(1);
    setSearchWard(searchWard);
  }, []);

  const resetFiltering = useCallback((): void => {
    setPaginationPageNumber(1);
    setSearchWard("");
    setFilteringRole(undefined);
  }, []);


  /* --- セレクトフィールド --------------------------------------------------------------------------------------------- */
  const roleOptions: SelectField.Option<UserRole>[] =
    Object.values(USER_ROLE).map((value) => ({
      label: formatterStrings.userRole(value),
      value
    }));

  const onChangeFilteringRole = (select: SingleValue<SelectField.Option<UserRole>>): void => {
    setFilteringRole(select?.value);
  }


  /* --- ページネーション ----------------------------------------------------------------------------------------------- */
  const onChangePage = useCallback((pageNumber: number): void => {
    scrollTop();
    setPaginationPageNumber(pageNumber);
  }, []);


  /* --- ユーザー情報表示 ----------------------------------------------------------------------------------------------- */
  const usersData = (): JSX.Element | null => {

    if (isLoading) {
      return (
        <div className={styles.usersCardsFlow}>
          <p>ローディング中</p>
        </div>
      )
    }

    if (isError) {
      return <p>エラーです</p>
    }

    if (isNoUsers) {
      return <p>ユーザーはいません</p>
    }

    if (isNoSearchResults) {
      return <NoSearchGroup className={styles.noSearchGroup} resetFunction={resetFiltering}/>
    }

    if (data) {
      return (
        <>
          <Select
            placeholder="権限で絞り込み"
            options={roleOptions}
            onChange={onChangeFilteringRole}
          />
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
            onChangePage={onChangePage}
          />
        </>
      )
    }

    return null;
  }


  /* --- view -------------------------------------------------------------------------------------------------------- */
  return (
    <div className={styles.usersListPage}>
      <SearchInputField
        onSearchFunction={onSearchUserName}
      />
      <h1 className={styles.heading}>{ heading() }</h1>
      { usersData() }
    </div>
  )
}


export default UsersListPage;
