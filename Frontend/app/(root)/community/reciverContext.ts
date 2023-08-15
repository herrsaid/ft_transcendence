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
export default reciverContext;