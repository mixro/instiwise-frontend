import './profile.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogout, fetchUsernames, getUserProjects, searchCurrentUser } from '../../redux/apiCalls';
import { useEffect } from 'react';
import { Delete, HowToReg, Login, Logout, Person, Settings, Shield, Verified } from '@mui/icons-material';


const Profile = ({children}) => {
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileCoverLoading, setProfileCoverLoading] = useState(true);
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const userProjects = useSelector((state) => state.userProjects.projects);
    const userId = user?._id;

    useEffect(() => {
        getUserProjects(userId, dispatch);
        fetchUsernames(dispatch);
        searchCurrentUser(userId, dispatch);
    }, [dispatch, userId]);

    const handleProfileLoad = () => {
        setProfileLoading(false);
    };

    const handleProfileCoverLoad = () => {
        setProfileCoverLoading(false);
    };        

    const handleLogout = (e) => {
        e.preventDefault();
        UserLogout(dispatch);
    }

  return (
    <div className="userProfile">
        {user ?
            <div className="userProfile_Wrapper">
                <div className="userProfile_Left">
                    <div className="userProfile_Images">
                        <div className="userProfile_cover">
                            <img src={user?.cover || '/assets/no-profile.png'} style={{display: profileCoverLoading ? "none" : "block"}} onLoad={handleProfileCoverLoad} alt='BACKGROUND' />
                            <div className="noProfileCover" style={{display: profileCoverLoading ? "block" : "none"}}>
                            </div>
                        </div>
                        <div className="userProfile_Self">
                            <div className="userProfile_SmallImage">
                                <img src={user?.img || '/assets/1.png'} style={{display: profileLoading ? "none" : "block"}} onLoad={handleProfileLoad} alt='PR' />
                                <div className="noProjectProfile" style={{display: profileLoading ? "block" : "none"}}>
                                </div>
                            </div>
                            <div className="userProfile_name">
                                <div className="userProfile_Verified">
                                    <p>{user?.username}</p>
                                    {user.isAdmin && <Verified sx={{fontSize: {xs: 21, sm: 24, m: 24}}} />}
                                </div>
                                <span>{user?.bio || "Your bio will appear here. Update your info"}</span>
                            </div>
                            <div className="userProfile_Connections">
                                <Link to='/profile' className='link-main'>
                                    <div className="userProfile-FollowItem">
                                        <p>Projects</p>
                                        <span>{userProjects.length}</span>
                                    </div>
                                </Link>
                                <Link to='./connections' className='link-main'>
                                    <div className="userProfile-FollowItem">
                                        <p>Connections</p>
                                        <span>{user.connections.length}</span>
                                    </div>
                                </Link>
                                <Link to='./awards' className='link-main'>
                                    <div className="userProfile-FollowItem">
                                        <p>Awards</p>
                                        <span>{user?.awards.length}</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="userProfile_Buttons">
                                <div className="userProfile-ButtonItem">
                                    <Link to="/people" className='link-main'>
                                        <button>CONNECT</button>
                                    </Link>
                                </div>
                                <div className="userProfile-ButtonItem">
                                    <Link to="/new-project" className='link-main'>
                                        <button>CREATE PROJECT</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="ProfielUpdate-SmallButton">
                                <Link to={`/settings`} className='link-main'>
                                    <button>UPDATE YOUR INFO</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="profileChildren">
                        {children}
                    </div>
                </div>

                <div className="userProfile_Right userProfile_Nosticky">
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
            :
            <div className="noUser">
                <div className="noUserButtons">
                    <div className="noUserButton">
                        <Link to="/login" className='link-main'>
                            <button>Login</button>
                        </Link>
                    </div>
                    <div className="noUserButton">
                        <Link to="/register" className='link-main'>
                            <button>Register</button>
                        </Link>
                    </div>
                </div>
                <div className="loginText">
                    Register if you are a new member or log in if you are an existing member to access and view your personalized profile.
                </div>
            </div> 
        }
    </div>
  )
}

export default Profile