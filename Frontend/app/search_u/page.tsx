"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Cookies from 'js-cookie';

import useSWR from "swr"


const fetchUsers = async (url:string) => {
    const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`,
             },
          }).then((response) => response.json())
          .then(data => data)

    console.log(res)
    return res.json();
}

export default function SearchPage()
{
    
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    const encodedsearchQuery = encodeURI(query || "");

    const {data, isLoading} = useSWR(`http://localhost:1337/user/search?q=${encodedsearchQuery}`,
    fetchUsers
    );

    
    // console.log(data);
    return(
       <>
       <div>
       SearchPage

       </div>
       </>
    );
}