export const BASE_URL = "http://localhost:5000";

export namespace Endpoint {

  /* --- ユーザー一覧取得エンドポイント ----------------------------------------------------------------------------------- */
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
    }

    return `${BASE_URL}/users?` +
      `paginationPageNumber=${query.paginationPageNumber}` +
      `&itemsCountPerPaginationPage=${query.itemsCountPerPaginationPage}` +
      `&searchByUserName=${query.searchByUserName}`
  }
}
