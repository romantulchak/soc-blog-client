export class DialogModel{
    postId: number;
    action: string;
    postName: string;
    constructor(postId: number, action: string, postName: string){
        this.postId = postId;
        this.action = action;
        this.postName = postName;
    }
} 