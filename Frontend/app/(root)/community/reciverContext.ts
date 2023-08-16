'use client'

import {Dispatch, SetStateAction, createContext } from "react";

export interface reciverContextType {
    reciver: any;
    setReciver: Dispatch<SetStateAction<{}>>;
   }
   const reciver: reciverContextType = {
    reciver:{},
    setReciver: () => {}
   }

const reciverContext = createContext<reciverContextType>(reciver);

// if have any problem on this version just remove line above and replace with yours

// yours: const reciverContext = createContext<any>(null);

export default reciverContext;