import './profile.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserProjects, updateUser } from '../../redux/apiCalls';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firebaseApp from '../../firebase';
import { useEffect } from 'react';

const Profile = ({children}) => {
    const [buttonClicked, setButtonClicked] = useState(false);
    const [inputs, setInputs] = useState({});
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileCoverLoading, setProfileCoverLoading] = useState(true);
    const [cover, setCover] = useState(null);
    const [coverPerc, setCoverPerc] = useState(0);
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePerc, setProfilePicturePerc] = useState(0);
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
    const user = useSelector((state) => state.user.currentUser);
    const userId = user?._id;

    useEffect(() => {
        getUserProjects(userId, dispatch);
    }, [dispatch, userId]);

    const handleProfileLoad = () => {
        setProfileLoading(false);
    };

    const handleProfileCoverLoad = () => {
        setProfileCoverLoading(false);
    };

    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (cover !== null || profilePicture !== null) {
            if (cover !== null) {
                const coverName = new Date().getTime() + cover.name;
                const storage = getStorage(firebaseApp);
                const storageRef = ref(storage, coverName);
                const uploadTask = uploadBytesResumable(storageRef, cover);
            
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        setCoverPerc(progress);
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                            break;
                            case 'running':
                                console.log('Upload is running');
                            break;
                            default:
                                console.log("Upload is in progress");
                        }
                        }, 
                        (error) => {
                        }, 
                        () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            const user = {...inputs, cover: downloadURL};
                            const id = userId;
                            updateUser(id, dispatch, user);
                        });
                    }
                )
            }

            if (profilePicture !== null) {
                const profilePictureName = new Date().getTime() + profilePicture.name;
                const storage = getStorage(firebaseApp);
                const storageRef = ref(storage, profilePictureName);
                const uploadTask = uploadBytesResumable(storageRef, profilePicture);
            
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        setProfilePicturePerc(progress);
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                            break;
                            case 'running':
                                console.log('Upload is running');
                            break;
                            default:
                                console.log("Upload is in progress");
                        }
                        }, 
                        (error) => {
                        }, 
                        () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            const user = {...inputs, img: downloadURL};
                            const id = userId;
                            updateUser(id, dispatch, user);
                        });
                    }
                )
            }
        } else {
            setButtonClicked(true);
            const id = userId;
            const user = { ...inputs };
            updateUser(id, dispatch, user);
        }
    } 

    const handleDelete = (e) => {
        e.preventDefault();
        const id = userId;
        deleteUser(id, dispatch);
    }

  return (
    <div className="userProfile">
        {user ?
            <div className="userProfile_Wrapper">
                <div className="userProfile_Left">
                    <div className="userProfile_Images">
                        <div className="userProfile_cover">
                            <img src={user?.cover || '/assets/project.jpg'} style={{display: profileCoverLoading ? "none" : "block"}} onLoad={handleProfileCoverLoad} alt='BACKGROUND' />
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
                                <p>{user?.username}</p>
                                <span>{user?.bio || "Powering innovation through electrical engineering expertise."}</span>
                            </div>
                            <div className="userProfile_Connections">
                                <Link to='/profile' className='link-main'>
                                    <div className="userProfile-FollowItem">
                                        <p>Projects</p>
                                        <span>{user.projects.length}</span>
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
                                <Link to={`/profile-update/${user._id}`} className='link-main'>
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
                    <h2>Update your info</h2>
                    <div className="userProfile_Update">
                        <div className="userProfile_UpdateItem">
                            <p>Username</p>
                            <input 
                                type="text"
                                name="username"
                                placeholder={user?.username}
                                className="userUpdateInput"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="userProfile_UpdateItem">
                            <p>Bio</p>
                            <input 
                                type="text"
                                placeholder={user?.bio || "this is my biography"}
                                className="userUpdateInput"
                                onChange={handleChange}
                                name="bio"
                            />
                        </div>
                        <div className="userProfile_UpdateItem">
                            <p>Password</p>
                            <input 
                                type="password"
                                name="password"
                                placeholder="password"
                                className="userUpdateInput"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="userProfile_UpdateItem">
                            <p>Course</p>
                            <input 
                                type="text"
                                name="course"
                                placeholder={user?.course || "eg. electrical"}
                                className="userUpdateInput"
                                onChange={handleChange}
                            />
                        </div> 
                        <div className="userProfile_UpdateItem">
                            <p>Email</p>
                            <input 
                                type="text"
                                placeholder={user?.email || "eg. john@gmail.com"}
                                className="userUpdateInput"
                                onChange={handleChange}
                                name="email"
                            />
                        </div>
                        <div className="userProfile_UpdateItem">
                            <p>Phone</p>
                            <input 
                                type="text"
                                placeholder={user?.phoneNumber || "eg. +2556 986 778 999"}
                                onChange={handleChange}
                                name="phoneNumber"
                                className="userUpdateInput"
                            />
                        </div>       
                        <div className="userProfile_UpdateItem">
                            <p>Profile picture</p>
                            <input type='file' id='profile-picture' accept='.jpeg, .jpg, .png' onChange={(e) => setProfilePicture(e.target.files[0])} style={{ display: "none" }} placeholder='cover' />
                            <label htmlFor="profile-picture">
                                <div className="Profile_UploadButton">
                                    <span>{profilePicturePerc > 0 && profilePicturePerc <100 ? "UPLOADING..." : "UPLOAD PROFILE PICTURE"}</span>
                                </div>
                            </label>
                        </div>                  
                        <div className="userProfile_UpdateItem">
                            <p>Profile cover</p>
                            <input type='file' id='profile-cover' accept='.jpeg, .jpg, .png' onChange={(e) => setCover(e.target.files[0])}  style={{ display: "none" }} placeholder='cover' />
                            <label htmlFor="profile-cover">
                                <div className="Profile_UploadButton">
                                    <span>{coverPerc > 0 && coverPerc <100 ? "UPLOADING..." : "UPLOAD COVER"}</span>
                                </div>
                            </label>
                        </div>
                        <div className="userProfile_UpdateItem">
                            <p>Gender</p>
                            <select onChange={handleChange} className="newUserSelect" name="gender" id="active">
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="female">others</option>
                            </select>
                        </div>
                        <div className="userProfile-UpdateButton">
                            <button onClick={handleClick}>{isFetching ? "UPDATING..." : "UPDATE"}</button>
                            {buttonClicked && error && <p style={{color: "red"}}>error occurred</p>}
                        </div>

                        <div className="Profile_LogoutPart">
                            <h1 className="userTitle">DELETE ACCOUNT</h1>
                            <div className="logout">
                                <div className="logoutButton">
                                    <button onClick={handleDelete}>Delete Account</button>
                                </div>
                            </div>
                            <p className='logoutWarning'>*If you delete account, Your data will not be retrevied!</p>
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