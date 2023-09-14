import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const InuseRooms = () => {
    const inUseRooms = useSelector((state) => state.inUseRooms.inUseRooms);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    // Function to handle the search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to filter the lessons based on the search query
    const filteredRooms = Array.isArray(inUseRooms) && inUseRooms.filter((room) => {
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
                <h1>Rooms in use ({inUseRooms && inUseRooms.length})</h1>
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
            <h1>Rooms in use ({inUseRooms && inUseRooms.length})</h1>
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
                                                <LazyLoadImage
                                                    alt={room.roomName}
                                                    src={room.img}
                                                    style={{display: "block"}}
                                                />
                                            </div>
        
                                            <div className="free_RoomsData">
                                                <p>{room.roomName}</p>
                                                <p>Seats: {room.seats}</p>
                                                <p>Building: {room.building}</p>
                                                <p>Type: <span style={{textTransform: "capitalize"}}>{room.type}</span></p>
                                                <div className="lesson_remaining">
                                                    <span>occupied</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        :   <div className="NODATA_COMP">
                                <h1>NO ROOMS IN USE AT THE MOMENT</h1>
                            </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default InuseRooms