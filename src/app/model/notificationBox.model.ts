import { Notification } from './notification.model';
import { User } from './user.model';

export class NotificationBox{
    id:number;
    notificationDTOS: Notification[];
    notificationCounter: number;
}