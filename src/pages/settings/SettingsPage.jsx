import './settings.css';
import { Link } from 'react-router-dom';
import { Delete, HowToReg, Login, Logout, Person, Settings, Shield } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogout } from '../../redux/apiCalls';

const SettingsPage = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    UserLogout(dispatch);
  }

  return (
    <div className="settingsContainer">
      <div className="settingsWrapper">
        <div className="settingBody">
          <div className="profile_settings">
              <h2>Settings</h2>
              <Settings />
          </div>
          <div className="profileSetting_buttons">
              <Link to={`/profile-update/${user._id}`} className='link-main'>
                  <div className="profileSetting_item">
                      <Person />
                      <p>Personal details</p>
                  </div>
              </Link>
              <Link to={`/password-update/${user._id}`} className='link-main'>
                  <div className="profileSetting_item">
                      <Shield />
                      <p>Password and security</p>
                  </div>
              </Link>
              <Link to={`/delete-account/${user._id}`} className='link-main'>
                <div className="profileSetting_item">
                    <Delete />
                    <p>Delete account</p>
                </div>
              </Link>
          </div>

          <div className="profile_settings profileAuthentication">
              <h2>Authentication</h2>
              <HowToReg />
          </div>
          <div className="profileSetting_buttons">
              <Link to='/register' className='link-main'>
                  <div className="profileSetting_item">
                      <HowToReg />
                      <p>Register</p>
                  </div>
              </Link>
              <Link to='/login' className='link-main'>
                  <div className="profileSetting_item">
                      <Login />
                      <p>Login</p>
                  </div>
              </Link>
              <div className="profileSetting_item" onClick={handleLogout}>
                  <Logout />
                  <p>Logout</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage