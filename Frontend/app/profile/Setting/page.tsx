import '../profile.css'
        
const SettingProfile = () => {
    return (
       <div>
        <div className="setting_page">
            <div className="setting_security">
                <h2>Security</h2>
                <h3>2FA  <label className="switch">
  <input type="checkbox"/>
  <span className="slider"></span>
</label>  2-Factor Authentication</h3>
            </div>

            <div className="setting_profile_info">
                <div className="edit_username">
                    <h3>UserName</h3>
                    <input type='text' defaultValue="selhanda"/>
                </div>

            </div>

        </div>


       </div>
    );
};
export default SettingProfile;