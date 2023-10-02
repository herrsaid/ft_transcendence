'use client'
interface props{
  image:string,
  username:string,
  rank:number
}


export default function CardLeader(props:props) {
  return (
    <>
    
   
    <div className="flex flex-col items-center relative">
        <div className=" w-32 h-32">
            <img src={props.image} alt="" className=" rounded-full border border-purple-500 absolute top-[-30%]"/>
        </div>
        <div className="items-center">
            <h1 className="text-md text-center">{props.username}</h1>
            <h1 className=" text-2xl md:text-3xl lg:text-3xl font-semibold text-purple-500 text-center">
                rank
            </h1>
            <h1 className=" text-2xl md:text-3xl lg:text-3xl font-semibold text-purple-500 text-center">{props.rank}</h1>
        </div>
    </div>

    </>
  )
}