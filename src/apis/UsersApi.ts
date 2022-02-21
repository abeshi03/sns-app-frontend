/* --- ライブラリー ---------------------------------------------------------------------------------------------------- */
import axios from "axios";

/* --- 型定義 --------------------------------------------------------------------------------------------------------- */
import { ApiResponse } from "../type/response/ApiResponse";
import { User } from "../type/User";
import { UsersResponseType } from "../type/response/UsersResponse";

/* --- エンドポイント --------------------------------------------------------------------------------------------------- */
import { Endpoint } from "../constants/endpoints";


export async function getUsersFetcher(endPoint: string): Promise<UsersResponseType> {

  try {

    const response: ApiResponse<UsersResponseType> = await axios.get(endPoint)

    return (response.data).data;

  } catch (error: unknown) {

    console.log(error);
    throw new Error("API ERROR: getUsers");
  }
}


export async function getUserFetcher(endPoint: string): Promise<User> {

  try {

    const response: ApiResponse<User> = await axios.get(endPoint)

    return (response.data).data;

  } catch (error: unknown) {

    console.log(error);
    throw new Error("API ERROR: getUser");
  }
}


export async function updateUser(updateUserData: User): Promise<void> {

  try {

    await axios.patch<User>(Endpoint.updateUser({
      userId: updateUserData.id
    }), {
      name: updateUserData.name,
      email: updateUserData.email,
      description: updateUserData.description,
      avatarUri: updateUserData.avatarUri
    });

  } catch (error: unknown) {

    console.log(error);
    throw new Error("API ERROR: updateUser");
  }
}


export async function addUser(addUserData: Omit<User, "id">): Promise<number> {

  try {

    const response = await axios.post(Endpoint.addUser, {
      name: addUserData.name,
      email: addUserData.email,
      description: addUserData.description,
      avatarUri: addUserData.avatarUri
    });

    return (response.data).data.id;

  } catch (error: unknown) {

    console.log(error);
    throw new Error("API ERROR: addUser");
  }
}


export async function deleteUser(targetUserId: number): Promise<void> {

  try {

    await axios.delete(Endpoint.deleteUser({ userId: targetUserId }));

  } catch (error: unknown) {

    console.log(error);
    throw new Error("API ERROR: deleteUser");
  }
}
