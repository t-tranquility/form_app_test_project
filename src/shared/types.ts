export interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
  likes?: number;
  dislikes?: number;
  onLike?: () => void;
  onDislike?: () => void;
  onFavorite?: () => void;
  onDelete?: (postId: number) => void;
  isFavorite?: boolean;
}

export interface FavoritesStore {
    favorites: number[];
    addFavorite: (postId: number) => void;
    removeFavorite: (postId: number) => void;
}

export interface PostStore {
  posts: PostProps[];
  getAllPosts: () => Promise<void>;
  addPost: (post: PostProps) => void;
  removePost: (postId: number) => void;
}

export interface UserItemProps {
    user: UserProps;
    onUpdate: (userId: number, updatedData: any) => void;
}

export interface UserProps {
    id: number;
    name: string;
    email: string;
    address: {
      street: string;
      city: string;
    };
    phone: string;
    website: string;
}
