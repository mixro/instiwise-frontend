import './rooms.css'
import { Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Rooms = () => {
  const rooms = useSelector((state) => state.rooms.rooms);
  const freeRooms = useSelector((state) => state.freeRooms.freeRooms);
  const inUseRooms = useSelector((state) => state.inUseRooms.inUseRooms);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle the search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter the lessons based on the search query
  const filteredRooms = Array.isArray(rooms) && rooms.filter((room) => {
    const roomName = room.roomName.toLowerCase();
    const buildingName = room.building.toLowerCase() || '';

    const query = searchQuery.toLowerCase();
    return (
      roomName.includes(query) ||
      buildingName.includes(query)
    );
  });

  return (
    <div className="RoomsContainer">
      <div className="room-wrapper">
        <div className="room-left LESSONS_LEFT">
          <div className="room_header">
            <h1>Institute Rooms</h1>
            <div className="input_search">
              <input type='text'
                placeholder='Search Lesson'
                value={searchQuery}
                onChange={handleSearchInputChange} 
              />
              <div className="search_icon">
                <Search />
              </div>
            </div>
          </div>

          <div className="SMALLSCREEN">
            <div className="small_room_header small_font ">
                <h1>Rooms</h1>
                <div className="input_search">
                    <input type='text'
                        placeholder='Search Lesson'
                        value={searchQuery}
                        onChange={handleSearchInputChange} 
                    />
                    <div className="search_icon small_search_icon">
                        <Search />
                    </div>
                </div>
            </div>   
          </div>  

          <div className="rooms_Category">
            <Link to='/freerooms' className='link-main CATER_DEX three_div_item'>
              <div className="Category_item">
                  <div className="details_item_header Category_item_header">
                      <p>FREE ROOMS</p>
                      <span>{freeRooms && freeRooms.length}</span>
                  </div>
                <div className="category_desc small_padding">
                <p>{window.innerWidth >= 770 ? "These are free rooms at the moment, yet they continually change due to ongoing lessons." : "These are free rooms at the moment"}</p>
                </div>
                <div className="center_display">
                    <div className="details_bottom">
                        <p>Explore</p>
                    </div>
                </div>
              </div>
            </Link>            
            <Link to='/roomsinuse' className='link-main CATER_DEX three_div_item'>
              <div className="Category_item">
                  <div className="details_item_header Category_item_header">
                      <p>ROOMS IN USE</p>
                      <span>{inUseRooms && inUseRooms.length}</span>
                  </div>
                <div className="category_desc small_padding">
                  <p>{window.innerWidth >= 770 ? "These rooms are currently in use, yet they continually change due to ongoing lessons." : "These rooms are currently in use"}</p>
                </div>
                <div className="center_display">
                    <div className="details_bottom">
                        <p>Explore</p>
                    </div>
                </div>
              </div>
            </Link>            
            <Link to='/rooms' className='link-main CATER_DEX three_div_item NODISPLAY_ONSMALL'>
              <div className="Category_item">
                  <div className="details_item_header Category_item_header LESSONS_HEADER">
                      <p>ALL ROOMS</p>
                      <span>{rooms && rooms.length}</span>
                  </div>
                <div className="category_desc small_padding">
                  <p>Explore our institute's thoughtfully designed rooms, tailored to diverse needs, fostering an enriching learning environment</p>
                </div>
                <div className="center_display">
                    <div className="details_bottom">
                        <p>Explore</p>
                    </div>
                </div>
              </div>
            </Link>            
          </div>

          <div className="search_results gray_color">
            <p>{filteredRooms.length} <span>Search Results</span></p>
          </div>

          <div className="free_RoomsContainer">
              {Array.isArray(filteredRooms) && filteredRooms.length > 0
                  ?   filteredRooms.map((room) => (
                          <div className="free_RoomsItem" key={room._id}>
                              <Link to={`/room/${room._id}`} className='link-main'>
                                  <div className="free_RoomsChildren">
                                      <div className="free_RoomsImage">
                                          <img src='/assets/room-1.jpg' alt='ROOM' />
                                      </div>
  
                                      <div className="free_RoomsData">
                                          <p>{room.roomName}</p>
                                          <p>Seats: {room.seats}</p>
                                          <p>Building: {room.building}</p>
                                          <p>Free Till: <span>2323</span></p>
                                          <div className="lesson_remaining">
                                              <span>{room.status === 'free' ? 'free' : 'occupied'}</span>
                                          </div>
                                      </div>
                                  </div>
                              </Link>
                          </div>
                      ))
                  :   <div className="NODATA_COMP">
                          <h1>NO ROOMS FOUND</h1>
                      </div>
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rooms