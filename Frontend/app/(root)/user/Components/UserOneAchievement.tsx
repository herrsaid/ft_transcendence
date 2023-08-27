interface Achievevement{
    name:string,
}


const UserOneAchievement = (props:Achievevement) => {
    return (
       
        <div className={`sm:w-30 sm:h-30 md:w-30 md:h-30 lg:w-30 lg:h-30 p-0 rounded-full w-32 h-32  bg-gradient-to-br from-purple-600 to-indigo-800 transform transition-transform duration-300 hover:scale-105`}>
           
            <h3 className="text-md font-semibold mb-2 text-center  mt-10">{props.name}</h3>
           
          <p className="text-blue-500 text-center"><img src="https://cdn.intra.42.fr/achievement/image/6/PRO002.svg" alt="User Avatar" className="w-10 h-10 rounded-full cursor-pointer shadow-md text-center mx-auto" /></p> 
          
          </div>
    );
};
export default UserOneAchievement;