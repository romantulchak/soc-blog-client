import { Tag } from './tag.model';
import { User } from './user.model';

export class Post{
    id:number;
    name:string;
    text:string;
    tags: Tag[];
    images: string[];
    user:User;
}