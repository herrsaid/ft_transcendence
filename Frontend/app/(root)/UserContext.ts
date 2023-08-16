'use client'

import {Dispatch, SetStateAction, createContext } from "react";

export interface UserContextType {
    user: any;
    setUser: Dispatch<SetStateAction<{}>>;
   }
   const user: UserContextType = {
    user:{},
    setUser: () => {}
   }
const UserContext = createContext<UserContextType>(user);


// if have any problem on this version just remove line above and replace with yours

// yours: const UserContext = createContext<any>(null);

export default UserContext;