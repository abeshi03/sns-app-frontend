/* --- 型定義 -------------------------------------------------------------------------------------------------------- */
import { USER_ROLE, UserRole } from "../type/User";

class FormatterStrings {

  public userRole(role: UserRole) {
    switch (role) {
      case USER_ROLE.normalUser:
        return "一般ユーザー";
      case USER_ROLE.admin:
        return "管理者";
    }
  }
}

export const formatterStrings = new FormatterStrings();
