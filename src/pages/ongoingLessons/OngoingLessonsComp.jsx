import { Search } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import "./ongoingLessonsStyle.css"
import { useSelector } from 'react-redux'
import { useState } from 'react'

const OngoingLessonsComp = () => {
    const ongoingLessons = useSelector((state) => state.ongoingLessons.ongoingLessons);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle the search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to filter the lessons based on the search query
    const filteredLessons = ongoingLessons.filter((lesson) => {
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

  return (
    <div className="container">
        <div className="SMALLSCREEN">
            <div className="small_room_header small_font smallest_font">
                <h1>Ongoing Lessons ({ongoingLessons && ongoingLessons.length})</h1>
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
            <h1>Ongoing Lessons ({ongoingLessons.length})</h1>
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
                                            <p><span>Class:</span> {lesson.courseId.name}</p>
                                            <p><span>Lecturer:</span> {lesson.lecturer}</p>
                                            <div className="lesson_remaining">
                                                <p>{calculateRemainingTime(lesson.end)} to End</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        :   <div className="NODATA_COMP">
                                <h1>NO ONGOING LESSONS AT THE MOMENT</h1>
                            </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default OngoingLessonsComp