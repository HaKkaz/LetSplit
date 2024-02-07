import { User } from './User';
import { Item } from './Item';

export interface Event {
    _id: string;
    event_name: string;
    event_time: string;
    user_list: User[];
    item_list: Item[];
}