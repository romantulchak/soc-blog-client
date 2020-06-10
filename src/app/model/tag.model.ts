import { Post } from './post.model';
import { User } from './user.model';

export class Tag{
    id:number;
    name:string;
    posts: Post[];
    user: User;
    myInterest: boolean;
}