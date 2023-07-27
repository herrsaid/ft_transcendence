"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";



export default function SearchInput()
{
    const [searchQuery, setsearchQuery] = useState("");
    const router = useRouter();

    const onSearch = (event:React.FormEvent) =>
    {
        event.preventDefault();
        const encodedsearchQuery = encodeURI(searchQuery);
        router.push(`/search_u?q=${encodedsearchQuery}`)
    };



    return(
        <form className="flex justify-center" onSubmit={onSearch}>

            <input  
            value={searchQuery}
    
            onChange={(event) => setsearchQuery(event.target.value)}
            className="w-96 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800
            focus:bg-black rounded-full focus:outline-none " placeholder="Search for user"/>

        </form>
    );
}