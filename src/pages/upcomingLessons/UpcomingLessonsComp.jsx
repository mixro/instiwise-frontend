import { Search } from '@mui/icons-material'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UpcomingLessonsComp = () => {
    const upcomingLessons = useSelector((state) => state.upcomingLessons.upcomingLessons);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle the search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to filter the lessons based on the search query
    const filteredLessons = upcomingLessons.filter((lesson) => {
        const lessonName = lesson.name.toLowerCase();
        const roomName = lesson.roomId.roomName.toLowerCase();
        const courseName = lesson.courseId.name.toLowerCase();
        const day = lesson.day.toLowerCase();
        const lecturer = lesson.lecturer.toLowerCase();

        const query = searchQuery.toLowerCase();
        return (
        lessonName.includes(query) ||
        roomName.includes(query) ||
        courseName.includes(query) ||
        day.includes(query) ||
        lecturer.includes(query)
        );
    });

    const calculateTimeUntilStart = (start) => {
        const now = new Date();
        const startTimestamp = new Date(`${now.toDateString()} ${start}`);
    
        if (startTimestamp < now) {
          return 'Lesson has already started';
        }
    
        const timeUntilStart = startTimestamp - now;
        const minutes = Math.floor((timeUntilStart / 1000 / 60) % 60);
        const hours = Math.floor((timeUntilStart / (1000 * 60 * 60)) % 24);
    
        return `${hours} hrs ${minutes} mins to Start`;
    };

  return (
    <div className="container">
       <div className="SMALLSCREEN">
            <div className="small_room_header small_font smallest_font">
                <h1>Upcoming Lessons ({upcomingLessons && upcomingLessons.length})</h1>
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
            <div className="search_results gray_color">
                <p>{filteredLessons && filteredLessons.length} <span>Search Results</span></p>
            </div>
        </div> 

        <div className="room_header">
            <h1>Upcoming Lessons ({upcomingLessons.length})</h1>
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
        <div className="search_results LARGESCREENS gray_color">
            <p>{filteredLessons && filteredLessons.length} <span>Search Results</span></p>
        </div>
        
        <div className="lesson-wrapper">
            <div className="lesson-left">
                <div className="LESSONS_MAIN">
                    {Array.isArray(filteredLessons) && filteredLessons.length > 0
                        ?   filteredLessons.map((lesson) => (
                                <Link to={`/lesson/${lesson._id}`} key={lesson._id} className='link-main DIVITEM_COMP'>
                                    <div className="lesson-container">
                                        <div className="lesson_top">
                                            <h1>{lesson.name}</h1>
                                            <p><span>Time:</span>{lesson.start} <span>to</span> {lesson.end}</p>
                                            <p><span>Room:</span>{lesson.roomId.roomName}</p>
                                        </div>

                                        <div className="lesson_dot"></div>

                                        <div className="lesson-bottom">
                                            <p><span>Day:</span> {lesson.day}</p>
                                            <p><span>Course:</span> {lesson.courseId.name}</p>
                                            <p><span>Lecturer:</span> {lesson.lecturer}</p>
                                            <div className="lesson_remaining">
                                                <p>{calculateTimeUntilStart(lesson.start)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        :   <div className="NODATA_COMP">
                                <h1>NO UPCOMING LESSONS TO DAY</h1>
                            </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpcomingLessonsComp
