export interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
  likes: number;
  dislikes: number;
  onLike?: () => void;
  onDislike?: () => void;
  onFavorite?: () => void;
  onDelete?: (postId: number) => void;
  isFavorite?: boolean;
}
