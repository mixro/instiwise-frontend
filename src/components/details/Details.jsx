import './details.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Table from '../table/Table';

const Details = () => {
    const courses = useSelector((state) => state.courses.courses);
    const freeRooms = useSelector((state) => state.freeRooms.freeRooms);
    const inUseRooms = useSelector((state) => state.inUseRooms.inUseRooms);
    const ongoingLessons = useSelector((state) => state.ongoingLessons.ongoingLessons);
    const ongoingCourses = useSelector((state) => state.ongoingCourses.ongoingCourses);
    const upcomingLessons = useSelector((state) => state.upcomingLessons.upcomingLessons);

    const calculateRemainingTime = (end) => {
        const now = new Date();
        const endTimestamp = new Date(`${now.toDateString()} ${end}`);
    
        if (endTimestamp < now) {
          return 'Lesson has ended';
        }
    
        const remainingTime = endTimestamp - now;
        const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    
        return `${hours} hrs ${minutes} mins`;
    };

    const calculateTimeUntilStart = (start) => {
        const now = new Date();
        const startTimestamp = new Date(`${now.toDateString()} ${start}`);
    
        if (startTimestamp < now) {
          return 'Lesson has already started';
        }
    
        const timeUntilStart = startTimestamp - now;
        const minutes = Math.floor((timeUntilStart / 1000 / 60) % 60);
        const hours = Math.floor((timeUntilStart / (1000 * 60 * 60)) % 24);
    
        return `${hours} hrs ${minutes} mins`;
    };

    const MAX_LENGTH = 6;

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + "..";
    }

  return (
    <div className="details_body">
        <div className="details_container">
            <div className="details_item">
                <div className="details_item_header">
                    <p>ONGOING LESSONS</p>
                    <span>{ongoingLessons && ongoingLessons.length}</span>
                </div>
                
                {ongoingLessons.length > 0 
                    ? 
                    <div className="parent_body">
                        <div className="details_item_body">
                            {ongoingLessons.slice(0, window.innerWidth >= 770 ? 3 : 4).map((lesson) => (
                                <Link to={`lesson/${lesson._id}`} key={lesson._id} className='link-main'>
                                    <div className="details_body_item">
                                        <div className="details_body_image">
                                            <p>{lesson.courseId && truncateText(lesson.courseId.name, MAX_LENGTH)}</p>
                                            <div className="ongoing_dot"></div>                                            
                                        </div>
                                        <div className="details_body_desc">
                                            <h1>{lesson.name}</h1>
                                            <p>start: <span> {lesson.start}</span></p>
                                            <p>End: <span> {lesson.end}</span></p>
                                            <p>Remaining:<span> {calculateRemainingTime(lesson.end)}</span></p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <Link to='/ongoinglessons' className='link-main'>
                            <div className="center_display">
                                <div className="details_bottom">
                                    <p>Explore More</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    :
                    <div className="noData_loading">
                        <p>No Ongoing Lessons</p>
                    </div>
                }
            </div>

            <div className="details_item">
                <div className="details_item_header">
                    <p>FREE ROOMS</p>
                    <span>{freeRooms && freeRooms.length}</span>
                </div>

                {freeRooms.length > 0 
                    ? 
                    <div className="parent_body">
                        <div className="details_item_body">
                            {freeRooms.slice(0, window.innerWidth >= 770 ? 3 : 4).map((room) => (
                                <Link to={`room/${room._id}`} key={room._id} className='link-main'>
                                    <div className="details_body_item">
                                        <div className="details_body_image roomImage">
                                            <img src={room.img} alt='ROOM' />
                                        </div>
                                        <div className="details_body_desc freeRoomDesc">
                                            <h1>{room.roomName}</h1>
                                            <p>seats:<span> {room.seats}</span></p>
                                            <p>Building:<span> {room.building}</span></p>
                                            <p>Status: free</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <Link to='/freerooms' className='link-main'>
                            <div className="center_display">
                                <div className="details_bottom">
                                    <p>Explore More</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    :
                    <div className="noData_loading">
                        <p>No Free Rooms</p>
                    </div>
                }
            </div>
        </div>

        <div className="tableContainer">
            <div className="tableHeader">
                <h2>TODAY'S LESSONS</h2>
            </div>
            <div className="tableMain">
                <Table />
            </div>
            <div className="center_display">
                <div className="details_bottom">
                    <Link to='/todayslessons' className='link-main'>
                        <p>Explore More Lessons</p>
                    </Link>
                </div>
            </div>
        </div>

        <div className="todaysQuote">
            <p>Today's Quote</p>
            <h2>"Engineering is the art of turning dreams into reality, one innovation at a time. Embrace the challenges, for they are the stepping stones to progress"</h2>
            <div className="quoteDot SMALLSCREEN">
                <span>...</span>
            </div>
            <button>EXPLORE MORE QUOTES</button>
        </div>

        <div className="details_grid">
            <div className="grid_left">
                <div className="details_item_header courseDetails-border">
                    <p>ONGOING COURSES</p>
                    <span>{ongoingCourses && ongoingCourses.length}</span>
                </div>
                
                <div className="LARGESCREEN">
                    <div className="coursesBody">
                        {Array.isArray(ongoingCourses) && ongoingCourses.length > 0 
                            ? ongoingCourses.slice(0, window.innerWidth >= 768 ? 5 : 4).map((course) => (
                                    <div className="course_item" key={course._id}>
                                        <Link to={`/course/${course._id}`} className='link-main'>
                                            <p>{course.name}</p>
                                        </Link>
                                    </div>
                                ))
                                : (
                            <div className="noData_courses">
                                <p>NO ONGOING COURSES</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="SMALLSCREEN">
                    <div className="courseDetails_Container">
                        {Array.isArray(ongoingCourses) && ongoingCourses.length > 0
                            ? ongoingCourses.slice(0, window.innerWidth >= 770 ? 20 : 6).map((course) => (
                                    <Link to={`course/${course._id}`} className="link-main">
                                        <div className="courseDetails" key={course._id}>
                                            <div className="courseDetails_left">
                                                <p>OD</p>
                                            </div>

                                            <div className="courseDetails_right">
                                                <div className="courseDetailsRight_item">
                                                    <h2>{course.name}</h2>
                                                    <div className="courseDetails_desc">
                                                        <p>{course.starting} to {course.ending}</p>
                                                        <p>{course.department}</p>
                                                    </div>
                                                </div>
                                                <div className="courseDetailsRight_item">
                                                    <div className="courseDetails_Dot greenBackground"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            : <div className="noData_courses">
                                <p>NO COURSES</p>
                            </div>
                        }
                    </div>
                </div>

                {Array.isArray(ongoingCourses) && ongoingCourses.length > 0 && 
                    <Link to='/ongoingcourses' className='link-main'>
                        <div className="center_display">
                            <div className="details_bottom">
                                <p>Explore More</p>
                            </div>
                        </div>
                    </Link>
                }
            </div>
        </div>

        <div className="details_container">
            <div className="details_item">
                <div className="details_item_header">
                    <p>UPCOMING LESSONS</p>
                    <span>{upcomingLessons && upcomingLessons.length}</span>
                </div>

                {upcomingLessons.length > 0 
                    ? 
                    <div className="parent_body">
                        <div className="details_item_body">
                            {upcomingLessons.slice(0, window.innerWidth >= 770 ? 3 : 4).map((lesson) => (
                                <Link to={`lesson/${lesson._id}`} className='link-main' key={lesson._id}>
                                    <div className="details_body_item">
                                        <div className="details_body_image">
                                            <p>{lesson.courseId && truncateText(lesson.courseId.name, MAX_LENGTH)}</p>
                                        </div>
                                        <div className="details_body_desc">
                                            <h1>{lesson.name}</h1>
                                            <p>start: <span>{lesson.start}</span></p>
                                            <p>End: <span>{lesson.end}</span></p>
                                            <p>Time Untill start: <span>{calculateTimeUntilStart(lesson.start)}</span></p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <Link to='/upcominglessons' className='link-main'>
                            <div className="center_display">
                                <div className="details_bottom">
                                    <p>Explore More</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    :
                    <div className="noData_loading">
                        <p>No Ongoing Lessons</p>
                    </div>
                }
            </div>

            <div className="details_item">
                <div className="details_item_header">
                    <p>ROOMS IN USE</p>
                    <span>{inUseRooms && inUseRooms.length}</span>
                </div>

                
                {inUseRooms.length > 0 
                    ? 
                    <div className="parent_body">
                        <div className="details_item_body">
                            {inUseRooms.slice(0, window.innerWidth >= 770 ? 3 : 4).map((room) => (
                                <Link to={`room/${room._id}`} key={room._id} className='link-main'>
                                    <div className="details_body_item">
                                        <div className="details_body_image roomImage">
                                            <img src={room.img} alt='ROOM' />
                                        </div>
                                        <div className="details_body_desc freeRoomDesc">
                                            <h1>{room.roomName}</h1>
                                            <p>seats:<span> {room.seats}</span></p>
                                            <p>Building:<span> {room.building}</span></p>
                                            <p>Status: in use</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}                    
                        </div>

                        <Link to='/roomsinuse' className='link-main'>
                            <div className="center_display">
                                <div className="details_bottom">
                                    <p>Explore More</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    :
                    <div className="noData_loading">
                        <p>No Rooms In Use</p>
                    </div>
                }
            </div>
        </div>

        <div className="details_grid flex-inverse">
            <div className="grid_left">
                <div className="details_item_header courseDetails-border">
                    <p>COURSES</p>
                    <span>{courses && courses.length}</span>
                </div>

                <div className="LARGESCREEN">
                    <div className="coursesBody">
                        {Array.isArray(courses) && courses.length > 0
                            ? courses.slice(0, window.innerWidth >= 770 ? 20 : 4).map((course) => (
                                <div className="course_item" key={course._id}>
                                    <Link to={`course/${course._id}`} className="link-main">
                                        <p>{course.name}</p>
                                    </Link>
                                </div>
                                ))
                            : <div className="noData_courses">
                                <p>NO COURSES</p>
                            </div>
                        }
                    </div>
                </div>
                
                <div className="SMALLSCREEN">
                    <div className="courseDetails_Container">
                        {Array.isArray(courses) && courses.length > 0
                            ? courses.slice(0, window.innerWidth >= 770 ? 20 : 6).map((course) => (
                                    <Link to={`course/${course._id}`} className="link-main">
                                        <div className="courseDetails" key={course._id}>
                                            <div className="courseDetails_left">
                                                <p>OD</p>
                                            </div>

                                            <div className="courseDetails_right">
                                                <div className="courseDetailsRight_item">
                                                    <h2>{course.name}</h2>
                                                    <div className="courseDetails_desc">
                                                        <p>{course.starting} to {course.ending}</p>
                                                        <p>{course.department}</p>
                                                    </div>
                                                </div>
                                                <div className="courseDetailsRight_item">
                                                    <div className="courseDetails_Dot"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            : <div className="noData_courses">
                                <p>NO COURSES</p>
                            </div>
                        }
                    </div>
                </div>

                {Array.isArray(courses) && courses.length > 0 && 
                    <Link to='/courses' className='link-main'>
                        <div className="center_display">
                            <div className="details_bottom courseExplore">
                                <p>Explore More</p>
                            </div>
                        </div>
                    </Link>
                }
            </div>
        </div>
    </div>
  )
}

export default Details