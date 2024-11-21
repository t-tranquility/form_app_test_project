export interface PostProps {
    id: number;
    title: string;
    body: string;
    userId: number;
    onLike?: (postId: number) => void;
    onDislike?: (postId: number) => void;
    onFavorite?: (postId: number) => void;
    onDelete?: (postId: number) => void;
    isFavorite?: boolean;
  }