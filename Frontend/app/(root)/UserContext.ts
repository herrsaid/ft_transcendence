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

export default UserContext;