import Link from 'next/link';

import {FaChevronUp, FaDollarSign, FaTrophy, FaUserEdit} from 'react-icons/fa'

const ProfileInfoNav = () => {
    return (
        <div>
            <div className="side_two_nav">
                        
                            <Link  href="/profile/Setting">
                                <button>
                                <span>Profile Setting</span>
                                </button>
                           
                            </Link>
                        
                        </div>
        </div>
        
    );
};
export default ProfileInfoNav;