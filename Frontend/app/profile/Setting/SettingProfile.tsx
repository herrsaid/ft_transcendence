import { Switch } from '@chakra-ui/react';
import '../profile.css'



const SettingProfile = () => {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
       <div>
        <div className="setting_page">
            <div className="setting_security">
                <h2>Security</h2>
                <h3>2FA <Switch size='lg' />  </h3>
            </div>

            <div className="setting_profile_info">
                <div className="edit_username">
                    <h3>Username</h3>
                    
                    <input type='text' placeholder='enter new username'/>
                </div>

            </div>


            <button className="update_info_button">Save</button>
        </div>


       </div>
    );
};
export default SettingProfile;