/* --- フレームワーク、ライブラリー --------------------------------------------------------------------------------------- */
import type { NextPage } from "next";
import React, { useCallback, useState } from "react";
import useSWR from "swr";

/* --- アセット ------------------------------------------------------------------------------------------------------- */
import styles from "../users/usersListPage.module.scss";
import { formatterStrings } from "../../config/formatterStrings";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { UsersResponseType } from "../../type/response/UsersResponse";
import { USER_ROLE, UserRole } from "../../type/User";

/* --- 子コンポーネント ------------------------------------------------------------------------------------------------- */
import { Tabs, Tab } from "../../components/atoms/Tabs/Tabs";
import { UserCard } from "../../components/organisms/Card/UserCard/UserCard";

/* --- api ----------------------------------------------------------------------------------------------------------^ */
import { Endpoint } from "../../constants/endpoints";
import { getUsersFetcher } from "../../apis/UsersApi";


const TabSample2: NextPage = () => {

  /* --- ユーザー一覧取得 ----------------------------------------------------------------------------------------------- */
  const [ paginationPageNumber, setPaginationPageNumber ] = useState(1);
  const [ filteringRole, setFilteringRole ] = useState<UserRole>(USER_ROLE.admin);
  const PER_PAGE_NUMBER: number = 15;
  const { data, error } = useSWR<UsersResponseType>(Endpoint.getUsers({
    paginationPageNumber,
    itemsCountPerPaginationPage: PER_PAGE_NUMBER,
    role: filteringRole
  }), getUsersFetcher);

  const isLoading = !data && !error;
  const isError = error;
  const isNoUsers = data && data.totalItemsCount === 0;

  /* --- タブ --------------------------------------------------------------------------------------------------------- */
  const [ activeTab, setActiveTab ] = useState<UserRole>(USER_ROLE.admin);

  const tabs: Tab<UserRole>[] =
    Object.values(USER_ROLE).map((value) => ({
      label: formatterStrings.userRole(value),
      key: value
    }));

  const onClickTab = useCallback( (tab: Tab<UserRole>): void => {
    setActiveTab(tab.key);
    setFilteringRole(tab.key);
  }, [ filteringRole, activeTab ])


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

    if (data) {
      return (
        <>
          <div className={styles.userCardsFlow}>
            {data.users.map((user) => (
              <UserCard key={user.id} targetUser={user}/>
            ))}
          </div>
        </>
      )
    }

    return null;
  }

  return (
    <div>
      <h1>タブapi実装のサンプルページ</h1>
      <Tabs
        tabs={tabs}
        onClickTabFunction={onClickTab}
      />
      { usersData() }
    </div>
  )
}

export default TabSample2;
