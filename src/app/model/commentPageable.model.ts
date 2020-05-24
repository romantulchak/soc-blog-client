import { Comment } from './commnet.model';

export class CommentPageable{
    comments: Comment[];
    currentPage: number;
    totalPages: number;
    commentsCounter: number;
}