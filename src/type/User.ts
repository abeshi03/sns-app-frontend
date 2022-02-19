export type User = {
  readonly id: number;
  email: string;
  name: string;
  description: string;
  avatarUri?: string | null;
}
