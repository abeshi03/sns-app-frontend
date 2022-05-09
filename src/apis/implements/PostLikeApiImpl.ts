export interface PostLikeApiImpl {
  add(postId: number): Promise<void>;
  remove(postId: number): Promise<void>;
}
