export const BASE_URL = "http://localhost:5000";

export namespace Endpoint {

  /* --- ユーザー一覧取得 ----------------------------------------------------------------------------------------------- */
  export function getUsers(
    query: {
      paginationPageNumber: number;
      itemsCountPerPaginationPage: number;
      searchByUserName?: string | null;
    }
  ): string {

    if (!query.searchByUserName) {

      return `${BASE_URL}/users?` +
        `paginationPageNumber=${query.paginationPageNumber}` +
        `&itemsCountPerPaginationPage=${query.itemsCountPerPaginationPage}`
    } else {

      return `${BASE_URL}/users?` +
      `paginationPageNumber=${query.paginationPageNumber}` +
      `&itemsCountPerPaginationPage=${query.itemsCountPerPaginationPage}` +
      `&searchByUserName=${query.searchByUserName}`
    }

  }


  /* --- ユーザー取得 -------------------------------------------------------------------------------------------------- */
  export function getUser(pathParameter: { userId: number; }): string {
    return `${BASE_URL}/users/${pathParameter.userId}`
  }


  /* --- ユーザー更新 -------------------------------------------------------------------------------------------------- */
  export function updateUser(pathParameter: { userId: number; }): string {
    return `${BASE_URL}/users/${pathParameter.userId}`;
  }
}
