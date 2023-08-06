
interface Achievevement{
    name:string,
    Description:string
    background:string
}



const OneAchievevement = (props:Achievevement) => {
    return (
       
        <div className={`bg-gradient-to-b from-${props.background}-600 to-${props.background}-700 p-4 shadow-md rounded-lg text-white transform transition-transform duration-300 hover:scale-105`}>
            <h3 className="text-lg font-semibold mb-2">{props.name}</h3>
            <p className="text-gray-200">{props.Description}</p>
          
          </div>
    );
};
export default OneAchievevement;