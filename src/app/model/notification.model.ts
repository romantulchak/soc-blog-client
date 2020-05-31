import { User } from './user.model';

export class Notification{
    id: number;
    message: string;
    isRead: boolean;
    user: User;
    dateTime: Date;
    eNotification: string;
}