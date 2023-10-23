import { LazyLoadImage } from 'react-lazy-load-image-component';
import './people.css';
import { Link } from 'react-router-dom';
import { Search, Sort, Verified } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWithOtherUser, getUsers } from '../../redux/apiCalls';
import moment from 'moment';
import { IconButton, Menu, MenuItem } from '@mui/material';

const ITEM_HEIGHT = 48;


const People = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const users = useSelector((state) => state.users.users);
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentUserId = currentUser?._id;
    const [sortedPeople, setSortedPeople] = useState([]);
    
    const filteredPeople= Array.isArray(users) && users.filter((user) => {
        const username = user.username.toLowerCase();

        const query = searchQuery.toLowerCase();
        return (
            username.includes(query) 
        );
    });
    
    useEffect(() => {
        getUsers(dispatch);

        if (filteredPeople.length > 0) {
            const defaultSortedPeople = [...filteredPeople].sort((a, b) => b.connections.length - a.connections.length);
            setSortedPeople(defaultSortedPeople);
        }
    }, [dispatch, filteredPeople]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleConnect = (anotherUserId) => {
        connectWithOtherUser(currentUserId, anotherUserId, dispatch);
    }

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const handleSort = (value) => {
        handleClose();
      
        // Sort the filteredPeople based on the selected sorting criterion
        let sortedData = [...filteredPeople]; // Create a copy of the filteredPeople array
      
        if (value === "recent") {
          sortedData = sortedData.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        } else if (value === "connections") {
          sortedData = sortedData.sort((a, b) => b.connections.length - a.connections.length);
        } else if (value === "projects") {
          sortedData = sortedData.sort((a, b) => b.projects.length - a.projects.length);
        } else if (value === "oldest") {
            sortedData = sortedData.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        }
      
        // Update the filteredPeople variable with the sorted array
        setSortedPeople(sortedData);
    };      

  return (
    <div className="peopleContainer">
        {currentUser ? 
           <div className="peopleWrapper">
                <div className="peopleLeft">
                    <div className="peopleSearch">
                        <h1>CONNECT</h1>
                        <div className="peopleSearch_Item">
                            <div className="peopleSearch_Input">
                                <input 
                                    type="text" 
                                    placeholder='Search people..' 
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                />
                                <div className="peopleSearch_InputIcon">
                                    <Search />
                                </div>
                            </div>
                            <div className="peoplesearch_Sort sortIcon_Button">
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <Sort sx={{color: "white"}} />
                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'long-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '17ch',
                                    },
                                    }}
                                > 
                                    <MenuItem onClick={() => handleSort("recent")}>
                                        Newest members
                                    </MenuItem>
                                    <MenuItem onClick={() => handleSort("oldest")}>
                                        Senior members
                                    </MenuItem>
                                    <MenuItem  onClick={() => handleSort("connections")}>
                                        By Connections
                                    </MenuItem>
                                    <MenuItem  onClick={() => handleSort("projects")}>
                                        By Projects
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className="connectPeople_Container">
                        {sortedPeople.length > 0 
                            ?   sortedPeople.slice(0, 95).map((person) => (
                                <div className="connectPeople_Item" key={person._id}>
                                    <div className="connectPeople_ItemTop">
                                        <div className="personItem_profile">
                                            <Link to={currentUserId === person._id ? "/profile" : `/user-profile/${person._id}`} className='link-main'>
                                                <div className="personItem_ProfileImage">
                                                    <LazyLoadImage
                                                        alt='PR'
                                                        src={person.img || '/assets/1.png'} 
                                                        style={{display: "block"}}
                                                    />
                                                </div>
                                            </Link>
                                            <div className="personItem_profileUsername">
                                                <Link to={currentUserId === person._id ? "/profile" : `/user-profile/${person._id}`} className='link-main'>
                                                    <div className="personItem_Verified">
                                                        <p className='searcheduser_username'>{person?.username.toLowerCase()}</p>
                                                        {person.isAdmin && <Verified sx={{fontSize: {xs: 21, sm: 24, m: 24}}} />}
                                                    </div>
                                                    {person.isAdmin ? <p>Seamless Scheduling </p> : <p>{person.course} engineer</p>}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="personItem_ConnectButton">
                                            {currentUserId !== person._id && <button onClick={() => handleConnect(person._id)}>{person.connections.includes(currentUserId) ? "DISCONNECT" : "CONNECT"}</button>}
                                        </div>
                                    </div>
                                    <Link to={currentUserId === person._id ? "/profile" : `/user-profile/${person._id}`} className='link-main'>
                                        <div className="personItem_Details">
                                            <div className="personDetails_Item">
                                                <p>{person.projects.length}</p>
                                                <span>Projects</span>
                                            </div>
                                            <div className="personDetails_Item">
                                                <p>{person.connections.length}</p>
                                                <span>Connections</span>
                                            </div>
                                            <div className="personDetails_Item">
                                                <p>{person.awards.length}</p>
                                                <span>Awards</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                            :   <div className="noPeople">
                                    <p>No user Found</p>
                                </div>
                        }
                    </div>
                </div>

                <div className="peopleRight">
                    <div className="peopleRight_Item">
                        <h2>Many Connections</h2>
                        <div className="peopleRight_List">
                            {users
                                .slice()
                                .sort((a, b) => b.connections.length - a.connections.length)
                                .slice(0, 6)
                                .map((person) => (
                                <div className="peopleRight_ListItem" key={person._id}>
                                    <div className="connectPeople_ItemTop">
                                        <div className="personItem_profile">
                                            <Link to={`/user-profile/${person._id}`} className='link-main'>
                                                <div className="personItem_ProfileImage peopleRigthImage">
                                                    <LazyLoadImage
                                                        alt='PR'
                                                        src={person.img || '/assets/1.png'} 
                                                        style={{display: "block"}}
                                                    />
                                                </div>
                                            </Link>
                                            <div className="personItem_profileUsername">
                                                <Link to={`/user-profile/${person._id}`} className='link-main'>
                                                    <div className="personItem_Verified">
                                                        <p>{person?.username.toLowerCase()}</p>
                                                        {person.isAdmin && <Verified sx={{fontSize: {xs: 21, sm: 22, m: 22}}} />}
                                                    </div>
                                                    <p>{person.connections.length} connections</p>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="personItem_ConnectButton modified-Button">
                                            {currentUserId !== person._id && <button onClick={() => handleConnect(person._id)}>{person.connections.includes(currentUserId) ? "DISCONNECT" : "CONNECT"}</button>}
                                        </div>
                                    </div>
                                </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="peopleRight_Item">
                        <h2>Many Projects</h2>
                        <div className="peopleRight_List">
                            {users
                                .slice()
                                .sort((a, b) => b.projects.length - a.projects.length)
                                .slice(0, 6)
                                .map((person) => (
                                    <div className="peopleRight_ListItem" key={person._id}>
                                        <div className="connectPeople_ItemTop">
                                            <div className="personItem_profile">
                                                <Link to={`/user-profile/${person._id}`} className='link-main'>
                                                    <div className="personItem_ProfileImage peopleRigthImage">
                                                        <LazyLoadImage
                                                            alt='PR'
                                                            src={person.img || '/assets/1.png'} 
                                                            style={{display: "block"}}
                                                        />
                                                    </div>
                                                </Link>
                                                <div className="personItem_profileUsername">
                                                    <Link to={`/user-profile/${person._id}`} className='link-main'>
                                                        <div className="personItem_Verified">
                                                            <p>{person?.username.toLowerCase()}</p>
                                                            {person.isAdmin && <Verified sx={{fontSize: {xs: 21, sm: 22, m: 22}}} />}
                                                        </div>
                                                        <p>{person.projects.length} projects</p>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="personItem_ConnectButton modified-Button">
                                                {currentUserId !== person._id && <button onClick={() => handleConnect(person._id)}>{person.connections.includes(currentUserId) ? "DISCONNECT" : "CONNECT"}</button>}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="peopleRight_Item">
                        <h2>Joined recently</h2>
                        <div className="peopleRight_List">
                            {users
                                .slice()
                                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                                .slice(0, 6)
                                .map((person) => (
                                    <div className="peopleRight_ListItem" key={person._id}>
                                        <div className="connectPeople_ItemTop">
                                            <div className="personItem_profile">
                                                <Link to={`/user-profile/${person._id}`} className='link-main'>
                                                    <div className="personItem_ProfileImage peopleRigthImage">
                                                        <LazyLoadImage
                                                            alt='PR'
                                                            src={person.img || '/assets/1.png'} 
                                                            style={{display: "block"}}
                                                        />
                                                    </div>
                                                </Link>
                                                <div className="personItem_profileUsername">
                                                    <Link to={`/user-profile/${person._id}`} className='link-main'>
                                                        <div className="personItem_Verified">
                                                            <p>{person?.username.toLowerCase()}</p>
                                                            {person.isAdmin && <Verified sx={{fontSize: {xs: 21, sm: 22, m: 22}}} />}
                                                        </div>
                                                        <p>Joined {moment(person.createdAt).fromNow()}</p>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="personItem_ConnectButton modified-Button">
                                                {currentUserId !== person._id && <button onClick={() => handleConnect(person._id)}>{person.connections.includes(currentUserId) ? "DISCONNECT" : "CONNECT"}</button>}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
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
                    Register if you are a new member or log in if you are an existing member to connect with people.
                </div>
            </div>     
        }
    </div>
  )
}

export default People