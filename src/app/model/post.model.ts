import { Tag } from './tag.model';
import { User } from './user.model';

export class Post{
    id:number;
    name:string;
    text:string;
    tags: Tag[];
    image: string;
    user:User;
    createdDate: Date;
    smallDescription: string;
    likesCounter: number;
    meLiked: boolean;
    constructor(){
        this.user = new User();
        this.tags = [];
    }   
}