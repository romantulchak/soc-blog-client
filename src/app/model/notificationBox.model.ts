import { Notification } from './notification.model';
import { User } from './user.model';

export class NotificationBox{
    id:number;
    notifications: Notification[];
    notificationCounter: number;
}