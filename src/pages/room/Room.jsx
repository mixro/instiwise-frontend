import { Link, useLocation } from 'react-router-dom';
import './room.css'
import {CalendarMonth, MeetingRoom, ChairAlt, Light, LocationOn, Person, Wifi, WindPower, Build, House} from "@mui/icons-material";
import { useSelector } from 'react-redux';

const Room = () => {
    const location = useLocation();
    const roomId = location.pathname.split("/")[2];
    const lessons = useSelector((state) => state.lessons.lessons);
    const roomLessons = lessons.filter((lesson) => lesson.roomId._id === roomId);
    const room = useSelector((state) => state.rooms.rooms.find((room) => room._id === roomId));

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength);
    }    

  return (
    <div className="container">
        <div className="room_wrapper">
            <div className="room_left">
                <div className="room_top">
                    <div className="header">
                        <h1>{room.roomName}</h1>
                        <p className="free">{room.status}</p>
                    </div>
                    <p className="location"><span><LocationOn /> Building:</span> {room.building} </p>
                    {room.type && <p className="location"> <span><House /> Type:</span> {room.type} </p>}
                    {room.type === "class" && <p className="location"> <span><ChairAlt /> Seats:</span> {room.seats} </p>}
                    <p className="roomDesc">{room.description}</p>
                </div>
                
                <div className="room_images">
                    <div className="room_image">
                        <img src="/assets/room-1.jpg" className="room-item" alt='ROOM' />
                    </div>
                    <div className="room_image">
                        <img src="/assets/room-1.jpg" className="room-item" alt='ROOM' />
                    </div>
                    <div className="room_image">
                        <img src="/assets/room-1.jpg" className="room-item" alt='ROOM' />
                    </div>
                    <div className="room_image">
                        <img src="/assets/room-1.jpg" className="room-item" alt='ROOM' />
                    </div>
                    <div className="room_image">
                        <img src="/assets/room-1.jpg" className="room-item" alt='ROOM' />
                    </div>
                    <div className="room_image">
                        <img src="/assets/room-1.jpg" className="room-item" alt='ROOM' />
                    </div>
                </div>
                
                <div className="room_description">
                    <h2>Room Description</h2>
                    <p>This room found on the fifth floor in TT(teaching tower) ,it good for learning and studying , So far its good for meeting an seminars. room found on the fifth floor in TT(teaching tower) ,it good for learning and studying , So far its good for meeting an seminars.  </p>
                </div>
                <div className="contents">
                    <h2>Room Contents</h2>
                    <div className="content">
                        <ul>
                            <li><Person /> {room.seats} people</li>
                            <li><ChairAlt /> {room.seats} seats</li>
                        </ul>

                        <ul>
                            <li><WindPower /> 6 fans</li>
                            <li><Wifi /> wifi</li>
                        </ul>

                        <ul>
                            <li><Light /> 12 lights</li>
                            <li><CalendarMonth /> 2 boards</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="room_right">
                <div className="rightHeader">
                    <h2>Lessons On This Room</h2>
                </div>

                {roomLessons.map((lesson) => (
                    <Link to={`/lesson/${lesson._id}`} className='link-main' key={lesson._id}>
                        <div className="lessonMain" key={lesson._id}>
                            <div className="lesson">
                                <div className="room_profile">{truncateText(lesson.courseId.name, 2)}</div>
                                <div className="details">
                                    <p>{lesson.name}</p>
                                    <span>{lesson.day}</span>
                                </div>
                            </div>                
                            <div className="info">
                                <p>Lecturer: <b>{lesson.lecturer}</b></p>
                                <p>Class: <b>{lesson.courseId.name}</b></p>
                                <p className='info_duration'>{lesson.start} - {lesson.end}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Room