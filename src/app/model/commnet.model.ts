import { Post } from './post.model';
import { User } from './user.model';

export class Comment{
    id: number;
    post: Post;
    text: string;
    user: User;
    commentsCounter: number;
}