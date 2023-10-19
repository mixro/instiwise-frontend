import { LazyLoadImage } from 'react-lazy-load-image-component';
import './people.css';
import { Link } from 'react-router-dom';
import { Search, Sort } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWithOtherUser, getUsers } from '../../redux/apiCalls';
import moment from 'moment';


const People = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const users = useSelector((state) => state.users.users);
    const currentUser = useSelector((state) => state.user.currentUser);
    const currentUserId = currentUser?._id;

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);

    const handleConnect = (anotherUserId) => {
        connectWithOtherUser(currentUserId, anotherUserId, dispatch);
    }

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPeople= Array.isArray(users) && users.filter((user) => {
        const username = user.username.toLowerCase();

        const query = searchQuery.toLowerCase();
        return (
            username.includes(query) 
        );
    });

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
                            <div className="peoplesearch_Sort">
                                <Sort />
                            </div>
                        </div>
                    </div>
                    <div className="connectPeople_Container">
                        {filteredPeople.length > 0 
                            ?   filteredPeople.slice(0, 15).sort((a, b) => b.connections.length - a.connections.length).map((person) => (
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
                                                    <p className='searcheduser_username'>{person?.username.toLowerCase()}</p>
                                                    <p>{person.course} engineer</p>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="personItem_ConnectButton">
                                            {currentUserId !== person._id && <button onClick={() => handleConnect(person._id)}>{person.connections.includes(currentUserId) ? "DISCONNECT" : "CONNECT"}</button>}
                                        </div>
                                    </div>
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
                            {users.slice(0, 5).sort((a, b) => b.connections.length - a.connections.length).map((person) => (
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
                                                    <p>{person?.username.toLowerCase()}</p>
                                                    <p>{person.connections.length} connections</p>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="personItem_ConnectButton modified-Button">
                                            {currentUserId !== person._id && <button onClick={() => handleConnect(person._id)}>{person.connections.includes(currentUserId) ? "DISCONNECT" : "CONNECT"}</button>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="peopleRight_Item">
                        <h2>Many Projects</h2>
                        <div className="peopleRight_List">
                            {users.slice(0, 5).sort((a, b) => b.projects.length - a.projects.length).map((person) => (
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
                                                    <p>{person?.username.toLowerCase()}</p>
                                                    <p>{person.projects.length} projects</p>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="personItem_ConnectButton modified-Button">
                                            {currentUserId !== person._id && <button onClick={() => handleConnect(person._id)}>{person.connections.includes(currentUserId) ? "DISCONNECT" : "CONNECT"}</button>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="peopleRight_Item">
                        <h2>Joined recently</h2>
                        <div className="peopleRight_List">
                            {users.slice(0, 5).sort((a, b) => a.createdAt.localeCompare(b.createdAt)).map((person) => (
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
                                                    <p>{person?.username.toLowerCase()}</p>
                                                    <p>Joined {moment(person.createdAt).fromNow()}</p>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="personItem_ConnectButton modified-Button">
                                            {currentUserId !== person._id && <button onClick={() => handleConnect(person._id)}>{person.connections.includes(currentUserId) ? "DISCONNECT" : "CONNECT"}</button>}
                                        </div>
                                    </div>
                                </div>
                            ))}
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