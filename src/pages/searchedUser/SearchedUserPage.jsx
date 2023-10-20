import { useState } from 'react';
import './searchedUser.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWithSearchedUser, getUsers, searchUser } from '../../redux/apiCalls';
import { Verified } from '@mui/icons-material';

const SearchedUserPage = ({children}) => {
    const location = useLocation();
    const searchedUserId = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileCoverLoading, setProfileCoverLoading] = useState(true);
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentUserId = currentUser._id;
    const users = useSelector((state) => state.users.users);
    const searchedUser = useSelector((state) => state.searchedUser.searchedUser);

    useEffect(() => {
        searchUser(searchedUserId, dispatch);
        getUsers(dispatch);
    }, [searchedUserId, dispatch]);

    const handleConnect = () => {
        connectWithSearchedUser(currentUser, searchedUserId, dispatch);
    }

    const handleProfileLoad = () => {
        setProfileLoading(false);
    };

    const handleProfileCoverLoad = () => {
        setProfileCoverLoading(false);
    };

  return (
    <div className="userProfile">
        {searchedUser ? 
            <div className="userProfile_Wrapper">
                <div className="userProfile_Left">
                    <div className="userProfile_Images">
                        <div className="userProfile_cover">
                            <img src={searchUser?.cover || '/assets/project.jpg'} style={{display: profileCoverLoading ? "none" : "block"}} onLoad={handleProfileCoverLoad} alt='BACKGROUND' />
                            <div className="noProfileCover" style={{display: profileCoverLoading ? "block" : "none"}}>
                            </div>
                        </div>
                        <div className="userProfile_Self">
                            <div className="userProfile_SmallImage">
                                <img src={searchedUser?.img || '/assets/1.png'} style={{display: profileLoading ? "none" : "block"}} onLoad={handleProfileLoad} alt='PR' />
                                <div className="noProjectProfile" style={{display: profileLoading ? "block" : "none"}}>
                                </div>
                            </div>
                            <div className="userProfile_name">
                                <div className="userProfile_Verified">
                                    <p>{searchedUser?.username}</p>
                                    {searchedUser.isAdmin && <Verified sx={{fontSize: {xs: 21, sm: 24, m: 24}}} />}
                                </div>
                                <span>{searchedUser?.bio}</span>
                            </div>
                            <div className="userProfile_Connections">
                                <Link to={`/user-profile/${searchedUserId}`} className='link-main'>
                                    <div className="userProfile-FollowItem">
                                        <p>Projects</p>
                                        <span>{searchedUser.projects.length || 0}</span>
                                    </div>
                                </Link>
                                <Link to="./connections" className='link-main'> 
                                    <div className="userProfile-FollowItem">
                                        <p>Connections</p>
                                        <span>{searchedUser?.connections.length || 0}</span>
                                    </div>
                                </Link>
                                <Link to="./awards" className='link-main'>
                                    <div className="userProfile-FollowItem">
                                        <p>Awards</p>
                                        <span>{searchedUser?.awards.length || 0}</span>
                                    </div>
                                </Link>
                            </div>
                            {currentUserId !== searchedUser._id && <div className="userProfile-Connect">
                                <button onClick={handleConnect}>{searchedUser.connections.some((user) => user._id === currentUserId) ? "DISCONNECT" : "CONNECT"}</button>
                            </div>}
                        </div>
                    </div>

                    <div className="userProfile_Children">
                        {children}
                    </div>
                </div>

                <div className="userProfile_Right">
                    <div className="userProfile_RightHeader">
                        <h2>Discover People</h2>
                    </div>
                    
                    <div className="userProfile_People">
                    {users
                        .slice() // Create a shallow copy of the users array to avoid modifying the original
                        .sort((a, b) => b.connections.length - a.connections.length) // Sort in descending order
                        .map((user) => (
                            <Link to={currentUserId === user._id ? '/profile' : `/user-profile/${user._id}`} className="link-main">
                                <div className="userProfile_PeopleItem" key={user._id}>
                                    <div className="userProfile_PeopleImage">
                                        <LazyLoadImage
                                        alt="."
                                        src={user.img || '/assets/1.png'}
                                        style={{ display: 'block' }}
                                        />
                                    </div>
                                    <div className="userProfile_PeopleDesc">
                                        <p>{user.username}</p>
                                        <span>{user.connections.length} Connections</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            :
            <div className="LoadingUser">
                <div className="loadingUser_wrapper">
                    <div className="loadingUser_Left">
                        <div className="loadingUser_CoverDiv">
                            <div className="loadingUser_Cover"></div>
                        </div>
                        <div className="loadingUser_Self">
                            <div className="loadingUser_ImgDiv">
                                <div className="loadingUser_Image"></div>
                            </div>
                            <div className="loadingUser_username"></div>
                            <div className="loadingUser_Desc"></div>
                            <div className="loadingUser_Connections">
                                <div className="loadingConnection_Item"></div>
                                <div className="loadingConnection_Item"></div>
                                <div className="loadingConnection_Item"></div>
                            </div>
                        </div>
                        <div className="loadingUser_Details"></div>
                        <div className="loadingUser_Projects">
                            <div className="loadingUser_Header"></div>
                            <div className="loadingUser_ProjectsList"></div>
                        </div>
                    </div>

                    <div className="loadingUser_Right"></div>
                </div>
            </div>
        }
    </div>
  )
}

export default SearchedUserPage