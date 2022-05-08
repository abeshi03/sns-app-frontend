import { UserRole } from "../type/User";

export const BASE_URL = "http://localhost:5000";

export namespace Endpoint {

  /* --- 認証関連 ----------------------------------------------------------------------------------------------------- */
  export const signIn = `${BASE_URL}/auth/signIn`;

  export const signOut = `${BASE_URL}/auth/signOut`;

  /* --- ユーザー一覧取得 ----------------------------------------------------------------------------------------------- */
  export function getUsers(
    query: {
      paginationPageNumber: number;
      itemsCountPerPaginationPage: number;
      searchByUserName?: string | null;
      role?: UserRole;
    }
  ): string {

    if (!query.searchByUserName && !query.role) {

      return `${BASE_URL}/users?` +
        `paginationPageNumber=${query.paginationPageNumber}` +
        `&itemsCountPerPaginationPage=${query.itemsCountPerPaginationPage}`
    }

    if (query.searchByUserName && !query.role) {
      return `${BASE_URL}/users?` +
        `paginationPageNumber=${query.paginationPageNumber}` +
        `&itemsCountPerPaginationPage=${query.itemsCountPerPaginationPage}` +
        `&searchByUserName=${query.searchByUserName}`;
    }

    if (!query.searchByUserName && query.role) {
      return `${BASE_URL}/users?` +
        `paginationPageNumber=${query.paginationPageNumber}` +
        `&itemsCountPerPaginationPage=${query.itemsCountPerPaginationPage}` +
        `&role=${query.role}`;
    }

    return `${BASE_URL}/users?` +
      `paginationPageNumber=${query.paginationPageNumber}` +
      `&itemsCountPerPaginationPage=${query.itemsCountPerPaginationPage}` +
      `&searchByUserName=${query.searchByUserName}` +
      `&role=${query.role}`;
  }


  /* --- ユーザー取得 -------------------------------------------------------------------------------------------------- */
  export function getUser(pathParameter: { userId: number; }): string {
    return `${BASE_URL}/users/${pathParameter.userId}`
  }

  /* --- ユーザー追加 -------------------------------------------------------------------------------------------------- */
  export const addUser = `${BASE_URL}/users`;

  /* --- ユーザー更新 -------------------------------------------------------------------------------------------------- */
  export function updateUser(pathParameter: { userId: number; }): string {
    return `${BASE_URL}/users/${pathParameter.userId}`;
  }

  /* --- ユーザー削除 -------------------------------------------------------------------------------------------------- */
  export function deleteUser(pathParameter: { userId: number; }): string {
    return `${BASE_URL}/users/${pathParameter.userId}`;
  }


  /* --- 投稿一覧取得 -------------------------------------------------------------------------------------------------- */
  export function getPosts(
    query: {
      pageNumber: number;
      limit: number;
      searchByPostContent?: string;
    }
  ): string {

    if (!query.searchByPostContent) {
      return `${BASE_URL}/posts?pageNumber=${query.pageNumber}&limit=${query.limit}`;
    }

    return `${BASE_URL}/` +
      `posts?pageNumber=${query.pageNumber}` +
      `&limit=${query.limit}` +
      `&searchByPostContent=${query.searchByPostContent}`;
  }

  /* --- 投稿取得 ----------------------------------------------------------------------------------------------------- */
  export function getPost(
    { postId }: { postId: number }
  ): string {
    return `${BASE_URL}/posts/${postId}`;
  }

  /* --- コメント一覧取得 ----------------------------------------------------------------------------------------------- */
  export function getComments(
    query: {
      pageNumber: number;
      limit: number;
      postId: number;
    }
  ): string {
    return `${BASE_URL}/post-comments/${query.postId}?` +
      `pageNumber=${query.pageNumber}` +
      `&limit=${query.limit}`
  }

  export function createComment(
    postId: number
  ): string {
    return `${BASE_URL}/post-comments/${postId}`;
  }
}
