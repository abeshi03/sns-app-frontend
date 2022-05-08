export const USER_ROLE = {
  admin: "ADMIN",
  normalUser: "NORMAL_USER"
} as const

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

export type User = {
  readonly id: number;
  email: string;
  name: string;
  role: UserRole;
  description: string;
  avatarUri?: string;
}


export type UserInputValues = {
  name: string;
  email: string;
  description: string;
  avatarUri?: FileList | null;
}
