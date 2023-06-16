import '../profile.css'
import Switch from '@mui/material/Switch';


const SettingProfile = () => {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
       <div>
        <div className="setting_page">
            <div className="setting_security">
                <h2>Security</h2>
                <h3>2FA <Switch {...label} defaultChecked />  </h3>
            </div>

            <div className="setting_profile_info">
                <div className="edit_username">
                    <h3>UserName</h3>
                    
                    <input type='text' placeholder='enter new username'/>
                </div>

            </div>


            <button className="update_info_button">Save</button>
        </div>


       </div>
    );
};
export default SettingProfile;