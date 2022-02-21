/* --- ライブラリー、型定義 ---------------------------------------------------------------------------------------------- */
import useSWR from "swr";
import { useRouter } from "next/router";

/* --- ライブラリー、型定義 ---------------------------------------------------------------------------------------------- */
import { Endpoint } from "../constants/endpoints";

/* --- フェッチャー ---------------------------------------------------------------------------------------------------- */
import { getUserFetcher } from "../apis/UsersApi";

export const useUser = () => {
  const router = useRouter();

  const userId = parseInt(router.query.userId as string, 10);
  const { data: user, error: userError } = useSWR(
    userId ? Endpoint.getUser({ userId }) : null,
    getUserFetcher);

  return {
    user,
    userError,
    userLoading: !user && !userError
  }
}
