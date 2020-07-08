import { Post } from './post.model';

export class DialogModel{
    post: Post;
    action: string;
    postName: string;
    constructor(post: Post, action: string, postName: string){
        this.post = post;
        this.action = action;
        this.postName = postName;
    }
}
