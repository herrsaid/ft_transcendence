
interface Achievevement{
    name:string,
    Description:string,
    background:string,
    image:string
}



const OneAchievevement = (props:Achievevement) => {
    return (
       
        <div className={`sm:w-40 sm:h-40 md:w-40 md:h-40 lg:w-40 lg:h-40 p-0 rounded-full w-32 h-32 border-2 border-blue-500/100 text-white transform transition-transform duration-300 hover:scale-105`}>
            <img src={props.image} alt="User Avatar" className="w-full h-full rounded-full cursor-pointer shadow-md" />
            {/* <h3 className="text-lg font-semibold mb-2">{props.name}</h3>
            <p className="text-gray-200">{props.Description}</p> */}
          
          </div>
    );
};
export default OneAchievevement;