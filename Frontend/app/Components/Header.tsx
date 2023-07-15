
import './Header.css'

export default  function Header()
{
    return(
        <div className="header">
            <div className='logo'>
                <h1>42PONG</h1>
            </div>
            <div className='profile'>
                {/* <div className='profile-img'>
                    <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="test" />
                </div> */}
            </div>
        </div>
    )
}