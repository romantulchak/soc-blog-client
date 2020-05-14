import { Post } from './post.model';

export class PostPageable{
    posts:Post[];
    currentPage: number;
    totalPages: number;
}