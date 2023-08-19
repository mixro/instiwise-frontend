import './profile.css';
import {
    Groups2Sharp,
    Mail,
    Person,
    PhoneAndroid,
    School,
    Wc,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { UserLogout, deleteUser, updateUser } from '../../redux/apiCalls';

const Profile = () => {
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
    const user = useSelector((state) => state.user.currentUser);
    const userId = user?._id;
  
    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };
  
    const handleClick = (e) => {
      e.preventDefault();
      const id = userId;
      const user = { ...inputs };
      updateUser(id, dispatch, user);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        UserLogout(dispatch);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const id = userId;
        deleteUser(id, dispatch);
    }

  return (
    <div className="profileContainer">
        {user ?
            <div className="user">
                <div className="userTitleContainer">
                    <h1 className="userTitle">YOUR INFORMATION</h1>
                </div>
                <div className="userContainer">
                    <div className="userShow">
                        <div className="userShowTop">
                            <img
                                src={user?.img || "/assets/1.png"}
                                alt=""
                                className="userShowImg"
                            />
                            <div className="userShowTopTitle">
                                <span className="userShowUsername">{user?.username}</span>
                                <span className="userShowUserTitle">student</span>
                            </div>
                        </div>
                        <div className="userShowBottom">
                            <span className="userShowTitle">Account Details</span>
                            <div className="userShowInfo">
                                <Person className="userShowIcon" />
                                <span className="userShowInfoTitle Capitalize">{user?.username}</span>
                            </div>
                            <div className="userShowInfo">
                                <Wc className="userShowIcon" />
                                <span className="userShowInfoTitle Capitalize">{user?.gender || "*not set"}</span>
                            </div>
                            <div className="userShowInfo">
                                <Groups2Sharp className="userShowIcon" />
                                <span className="userShowInfoTitle Capitalize">{user?.course || "*not set"}</span>
                            </div>
                            <span className="userShowTitle">Contact Details</span>
                            <div className="userShowInfo">
                                <PhoneAndroid className="userShowIcon" />
                                <span className="userShowInfoTitle Capitalize">{user?.phoneNumber || "*not set"}</span>
                            </div>
                            <div className="userShowInfo">
                                <Mail className="userShowIcon" />
                                <span className="userShowInfoTitle">{user?.email}</span>
                            </div>
                            <div className="userShowInfo">
                                <School className="userShowIcon" />
                                <span className="userShowInfoTitle Capitalize">DIT</span>
                            </div>
                        </div>
                    </div>
                    <div className="userUpdate">
                        <span className="userUpdateTitle">Update Your Info</span>
                        <form className="userUpdateForm">
                            <div className="userUpdateLeft">
                                <div className="userUpdateItem">
                                    <label>Username</label>
                                    <input
                                    type="text"
                                    name="username"
                                    placeholder={user?.username}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Password</label>
                                    <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Course</label>
                                    <input
                                    type="text"
                                    name="course"
                                    placeholder={user?.course || "eg. electrical"}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Email</label>
                                    <input
                                    type="text"
                                    placeholder={user?.email || "eg. john@gmail.com"}
                                    className="userUpdateInput"
                                    onChange={handleChange}
                                    name="email"
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Phone</label>
                                    <input
                                    type="text"
                                    placeholder={user?.phoneNumber || "eg. +2556 986 778 999"}
                                    onChange={handleChange}
                                    name="phoneNumber"
                                    className="userUpdateInput"
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Gender</label>
                                    <select onChange={handleChange} className="newUserSelect" name="gender" id="active">
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="userUpdateRight">
                                <div className="productButton-container">
                                    <button onClick={handleClick} className="userUpdateButton">{isFetching ? "Updating.." : "Update"}</button>
                                    {error && <p style={{color: "red"}}>error occurred</p>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="logoutContainer">
                    <h1 className="userTitle">LOGOUT</h1>
                    <div className="logout">
                        <div className="logoutButton">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                        <div className="logoutButton delete">
                            <button onClick={handleDelete}>Delete Account</button>
                        </div>
                    </div>
                    <p className='logoutWarning'>*If you delete account, Your data will not be retrevied!</p>
                </div>
            </div>
        :   <div className="noUser">
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