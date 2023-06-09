import Link from 'next/link';

import {FaChevronUp, FaDollarSign, FaTrophy, FaUserEdit} from 'react-icons/fa'

const ProfileInfoNav = () => {
    return (
        <div>
            <div className="side_two_nav">
                        <span className="span_one"><span className="icon"><FaTrophy /></span> <span> 4132 </span> </span>

                        <span className="span_one"><span className="icon"><FaChevronUp /></span> <span> 41 </span> </span>
                            
                            <span className="span_one"><span className="icon"><FaDollarSign/></span> <span> 480</span></span>
                            
                            <Link  href="/profile/Setting">
                            <span className="span_right"><FaUserEdit/></span>
                            </Link>
                        
                        </div>
        </div>
        
    );
};
export default ProfileInfoNav;