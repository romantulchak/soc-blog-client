import { User } from './user.model';
import { Post } from './post.model';

export class Notification{
    id: number;
    message: string;
    isRead: boolean;
    user: User;
    dateTime: Date;
    post:Post;
    eNotification: string;
}