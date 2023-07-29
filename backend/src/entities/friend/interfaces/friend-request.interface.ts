import { User } from "../../user/user.entity";


export type FriendRequest_Status = 'not-sent' | 'pending' | 'accepted' | 'declined' | 'waiting-for-current-user-response' | 'blocked';


export interface FriendRequestStatus{
    status?: FriendRequest_Status;
}


export interface FriendRequest_Interface{
    id?: number;
    creator?: User;
    receiver?: User;
    status?: FriendRequest_Status;

}