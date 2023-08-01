import { Rating } from '@mui/material'
import { Link } from 'react-router-dom';
import './roomComp.css'

const RoomComp = () => {
  return (
    <div>
        <Link className='link-main' to="/room/123akdjkasdo24k42k42kjk2">
            <div className="room-list">
                <div className="roomImg">
                    <div className="image-list">
                        <img src='/assets/room-1.jpg' />
                    </div>
                </div>

                <div className="room_Desc">
                    <p className="topDesc">TT BULDING - 2 FLOOR</p>
                    <h1>Room 1</h1>
                    <p className="room-seats"><span>12 seats</span> | <span>WIFI</span> | <span>3 doors</span> | <span>2 boards</span></p>
                    <div className="room-rating">
                        <Rating name='half-rating' sx={{color: "red", display:{xs: 15, sm: 10,}}} size="small" defaultValue={3.5} precision={0.5} readOnly />
                    </div>
                    <div className="descBottom">
                        <span>in use</span>
                        <p>Free after 54 mins</p>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default RoomComp