"use client"

import { Input } from "@chakra-ui/react";
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
        <form className="flex justify-self-auto" onSubmit={onSearch}>

<Input
    placeholder='Search for user...'
    _placeholder={{ opacity: 1, color: 'gray.500' }}
    onChange={(event) => setsearchQuery(event.target.value)}
    value={searchQuery}
    className="focus:outline-none"
    variant='flushed'

  />

        </form>
    );
}