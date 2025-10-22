import { Link, useLocation } from 'react-router-dom';
import './room.css'
import {CalendarMonth, ChairAlt, Light, LocationOn, Person, Wifi, WindPower, House} from "@mui/icons-material";
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

    const isLessonOngoing = (day, start, end) => {
        const now = new Date();
        const dayOfWeek = now.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
      
        // Check if the current day matches the specified day
        if (dayOfWeek !== day.toLowerCase()) {
          return false;
        }
        const startTime = new Date(`${now.toDateString()} ${start}`);
        const endTime = new Date(`${now.toDateString()} ${end}`);
      
        return now >= startTime && now <= endTime;
    };

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
                    <div className="roomImage_Cont SMALLSCREEN">
                        <img src={room.img} alt='room' />
                    </div>
                    <p className="roomDesc">{room.description}</p>
                </div>
                
                <div className="room_images">
                    <div className="room_image">
                        <img src={room.img} className="room-item" alt='ROOM' />
                    </div>
                    <div className="room_image">
                        <img src={room.img} className="room-item" alt='ROOM' />
                    </div>
                    <div className="room_image">
                        <img src={room.img} className="room-item" alt='ROOM' />
                    </div>
                    <div className="room_image">
                        <img src={room.img} className="room-item" alt='ROOM' />
                    </div>
                    <div className="room_image">
                        <img src={room.img} className="room-item" alt='ROOM' />
                    </div>
                    <div className="room_image">
                        <img src={room.img} className="room-item" alt='ROOM' />
                    </div>
                </div>
                
                <div className="room_description">
                    <h2>Room Description</h2>
                    <p>"Welcome to our Institute's Classroom, where learning meets inspiration! Our classrooms are designed to foster an environment of knowledge-sharing and growth. Equipped with state-of-the-art technology, comfortable seating, and a dedicated faculty, we provide the ideal space for students to immerse themselves in the world of education. With interactive whiteboards, multimedia tools, and ample natural light, our classrooms offer an engaging and dynamic learning experience. Join us on this educational journey, where every seat is a front-row seat to your future success!"</p>
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
                                {isLessonOngoing(lesson.day, lesson.start, lesson.end) && <div className="RoomLesson_Dot"></div>}
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