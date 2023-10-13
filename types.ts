export interface Post {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    username: string;
    name: string;
    image: string;
    id: string;
  };
  createdAt: string;
  comments: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      username: string;
      name: string;
      image: string;
      id: string;
    }[];
  }[];
  isComment?: boolean;
  isLiked?: boolean;
  userId: string;
  postId: string;
  isReposted?: boolean;
  repostAuthorName?: string[];
}

export interface Comment {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    username: string;
    name: string;
    image: string;
    id: string;
  };
  createdAt: string;
  isLiked?: boolean;
  userId: string;
  postId: string;
  isReposted?: boolean;
  repostAuthorName?: string[];
  isComment?: boolean;
  commentAuthor: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  userType: string;
}
