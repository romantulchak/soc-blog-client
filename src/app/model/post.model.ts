import { Tag } from './tag.model';
import { User } from './user.model';

export class Post{
    id:number;
    name:string;
    text:string;
    tags: Tag[];
    imagePath: string;
    user:User;
    createdDate: Date;
    smallDescription: string;
    constructor(){
        this.user = new User();
        this.tags = [];
    }   
}