
// interface props{
//     avatar:string,
//     email:string,
//     username:string,
//     rank:string,
//     avatar_updated:boolean
//   }


const ProfileState = () => {
    
    return (
        <>
             <div className="text-center">
    <div className="stats-bg bg-white rounded-lg shadow-lg p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      



      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-600">Total Games</h3>
        <p className="text-3xl font-bold text-blue-500">153</p>
      </div>




      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-600">Total Wins</h3>
        <p className="text-3xl font-bold text-green-500">89</p>
      </div>




      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-600">Total Achievements</h3>
        <p className="text-3xl font-bold text-purple-500">22</p>
      </div>



      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-600">Total Losses</h3>
        <p className="text-3xl font-bold text-yellow-500">5</p>
      </div>
    </div>
  </div>
    
  </div>
        </>
    );
};
export default ProfileState;
