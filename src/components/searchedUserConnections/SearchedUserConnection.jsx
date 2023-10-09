import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { connectWithOtherUser } from '../../redux/apiCalls';
import { Search, Sort } from '@mui/icons-material';

const SearchedUserConnection = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const userConnections = useSelector((state) => state.searchedUser.searchedUser.connections);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserId = currentUser._id;

  const handleConnect = (anotherUserId) => {
    connectWithOtherUser(currentUserId, anotherUserId, dispatch);
  }

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredConnections = Array.isArray(userConnections) && userConnections.filter((user) => {
    const username = user.username.toLowerCase();

    const query = searchQuery.toLowerCase();
    return (
        username.includes(query) 
    );
  });

  return (
    <div className="connectionContainer Profile_paddingTop">
      {userConnections.length > 0
        ?
        <div className="connectionsWrapper_List">
          <div className="connectionDiv">
            <div className="projectLeft_Top">
              <h1>YOUR PROJECT</h1>
              <div className="projectsSearch">
                  <div className="ditsoSearch projectSearchItem">
                      <input 
                          type='text'
                          placeholder='Search people...' 
                          value={searchQuery}
                          onChange={handleSearchInputChange} 
                      />
                      <div className="Search_Icon">
                          <Search />
                      </div>
                  </div>
                  <div className="projectsSort_Icon">
                      <Sort />
                  </div>
              </div>
            </div>
            {searchQuery && <div className="projectsSearch_results">
                <p><span>{filteredConnections.length}</span> Search results</p>
            </div>}
          </div>       
            
          {filteredConnections.length > 0 
            ?
              <div className="connectionsList">
                {filteredConnections
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
                  ))
                }
              </div>
            :
              <div className="noProjects_Found">
                <p>No connection found !!</p>
              </div>
          }
        </div>
        :
        <div className="noProjects_Found">
          <p>Your connections will appear here</p>
          <div className="noProjects_CreateButton">
              <Link to="/people" className='link-main'>
                  <button>CONNECT</button>
              </Link>
          </div>
        </div>
      }
    </div>
  )
}

export default SearchedUserConnection