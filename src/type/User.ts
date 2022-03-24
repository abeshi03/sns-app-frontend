export type User = {
  readonly id: number;
  email: string;
  name: string;
  description: string;
  avatarUri?: string;
}


export type UserInputValues = {
  name: string;
  email: string;
  description: string;
  avatarUri?: FileList | null;
}
