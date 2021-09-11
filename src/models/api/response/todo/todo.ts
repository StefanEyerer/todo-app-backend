import { User } from '../user/user';

export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    user: User;
}
