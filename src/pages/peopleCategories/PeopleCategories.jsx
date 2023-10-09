import { useDispatch, useSelector } from 'react-redux';
import './peopleCategories.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { connectWithOtherUser } from '../../redux/apiCalls';
import moment from 'moment';

const PeopleCategories = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserId = currentUser?._id;

  const handleConnect = (anotherUserId) => {
    connectWithOtherUser(currentUserId, anotherUserId, dispatch);
  }

  return (
    <div className="peopleCategories">
      {currentUser ? 
        <div className="peopleCategories_Wrapper">
          <div className="peopleCategories_Item">
            <div className="peopleCategory-Header">
              <h2>Most Connected</h2>
            </div>
            
            <div className="peopleCategory_ItemsContainer">
              {users
                .slice(0, 6)
                .sort((a, b) => b.connections.length - a.connections.length)
                .map((person) => (
                <div className="peopleCategory_Item" key={person._id}>
                  <div className="peopleCategory_profile">
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
                            <p>{person.username}</p>
                            <p>{person.connections.length} connections</p>
                        </Link>
                    </div>
                  </div>
                  <div className="personItem_ConnectButton">
                      <button onClick={() => handleConnect(person._id)}>{person.connections.includes(currentUserId) ? "DISCONNECT" : "CONNECT"}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="peopleCategories_Item">
            <div className="peopleCategory-Header">
              <h2>Most Projects</h2>
            </div>
            
            <div className="peopleCategory_ItemsContainer">
              {users
                .slice(0, 6)
                .sort((a, b) => b.projects.length - a.projects.length)
                .map((person) => (
                <div className="peopleCategory_Item" key={person._id}>
                  <div className="peopleCategory_profile">
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
                            <p>{person.username}</p>
                            <p>{person.projects.length} projects</p>
                        </Link>
                    </div>
                  </div>
                  <div className="personItem_ConnectButton">
                      <button onClick={() => handleConnect(person._id)}>{person.connections.includes(currentUserId) ? "DISCONNECT" : "CONNECT"}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="peopleCategories_Item">
            <div className="peopleCategory-Header">
              <h2>Joined recently</h2>
            </div>
            
            <div className="peopleCategory_ItemsContainer">
              {users
                .slice(0, 6)
                .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                .map((person) => (
                <div className="peopleCategory_Item" key={person._id}>
                  <div className="peopleCategory_profile">
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
                            <p>{person.username}</p>
                            <p>Joined {moment(person.createdAt).fromNow()}</p>
                        </Link>
                    </div>
                  </div>
                  <div className="personItem_ConnectButton">
                      <button onClick={() => handleConnect(person._id)}>{person.connections.includes(currentUserId) ? "DISCONNECT" : "CONNECT"}</button>
                  </div>
                </div>
              ))}
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

export default PeopleCategories