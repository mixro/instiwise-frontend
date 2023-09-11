import { Link } from 'react-router-dom'
import './freeRooms.css'
import { useSelector } from 'react-redux';
import { Search } from '@mui/icons-material';
import { useState } from 'react';

const FreeRooms = () => {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const freeRooms = useSelector((state) => state.freeRooms.freeRooms);

    // Function to handle the search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to filter the lessons based on the search query
    const filteredRooms = Array.isArray(freeRooms) && freeRooms.filter((room) => {
        const roomName = room.roomName.toLowerCase();
        const buildingName = room.building.toLowerCase() || '';

        const query = searchQuery.toLowerCase();
        return (
        roomName.includes(query) ||
        buildingName.includes(query)
        );
    });

    const handleLoad = () => {
        setLoading(false);
    };

  return (
    <div className="container">
        <div className="SMALLSCREEN">
            <div className="small_room_header small_font smallest_font">
                <h1>Free Rooms ({freeRooms && freeRooms.length})</h1>
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
            {searchQuery && 
                <div className="search_results gray_color">
                    <p>{filteredRooms && filteredRooms.length} <span>Search Results</span></p>
                </div>
            }
        </div>  

        <div className="room_header">
            <h1>Free Rooms ({freeRooms && freeRooms.length})</h1>
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
        {searchQuery && 
            <div className="search_results LARGESCREENS gray_color">
                <p>{filteredRooms && filteredRooms.length} <span>Search Results</span></p>
            </div> 
        } 

        <div className="lesson-wrapper">
            <div className="lesson-left">
                <div className="free_RoomsContainer">
                    {Array.isArray(filteredRooms) && filteredRooms.length > 0
                        ?   filteredRooms.map((room) => (
                                <div className="free_RoomsItem" key={room._id}>
                                    <Link to={`/room/${room._id}`} className='link-main'>
                                        <div className="free_RoomsChildren">
                                            <div className="free_RoomsImage">
                                                <img src={room.img} style={{display: loading ? "none" : "block"}} onLoad={handleLoad} alt='ROOM' />
                                                <div style={{display: loading ? "block" : "none"}} className="freeRoom_NoRoom">
                                                    <div className="freeRoom_loader">
                                                    <div className="loader smallLoader"></div>
                                                    </div>
                                                </div>
                                            </div>
        
                                            <div className="free_RoomsData">
                                                <p>{room.roomName}</p>
                                                <p>Seats: {room.seats}</p>
                                                <p>Building: {room.building}</p>
                                                <p>Type: <span style={{textTransform: "capitalize"}}>{room.type}</span></p>
                                                <div className="lesson_remaining">
                                                    <span>free</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        :   <div className="NODATA_COMP">
                                <h1>NO FREE ROOMS AT THE MOMENT</h1>
                            </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default FreeRooms