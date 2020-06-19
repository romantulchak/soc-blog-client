import { Post } from './post.model';
import { User } from './user.model';
import { Replay } from './replay.model';

export class Comment{
    id: number;
    post: Post;
    text: string;
    user: User;
    commentsCounter: number;
    replays:Replay[];
    createdDate: Date;
}