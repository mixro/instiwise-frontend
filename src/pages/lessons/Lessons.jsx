import { Link } from 'react-router-dom'
import { Search } from '@mui/icons-material'
import './lessons.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Lessons = () => {
  const lessons = useSelector((state) => state.lessons.lessons);
  const ongoingLessons = useSelector((state) => state.ongoingLessons.ongoingLessons);
  const upcomingLessons = useSelector((state) => state.upcomingLessons.upcomingLessons);
  const [searchQuery, setSearchQuery] = useState('');

  const isLessonOngoing = (start, end) => {
    const now = new Date();
    const startTime = new Date(`${now.toDateString()} ${start}`);
    const endTime = new Date(`${now.toDateString()} ${end}`);
    return now >= startTime && now <= endTime;
  };


  // Function to handle the search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter the lessons based on the search query
  const filteredLessons = Array.isArray(lessons) && lessons.filter((lesson) => {
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

  return (
    <div className="RoomsContainer">
      <div className="room-wrapper">
        <div className="room-left LESSONS_LEFT">
          <div className="room_header">
            <h1>Institute Lessons</h1>
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
          
          <div className="small_room_header">
            <h1>Lessons</h1>
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

          <div className="rooms_Category">
            <Link to='/ongoinglessons' className='link-main CATER_DEX three_div_item'>
              <div className="Category_item">
                  <div className="details_item_header Category_item_header LESSONS_HEADER">
                      <p>ONGOING LESSONS</p>
                      <span>{ongoingLessons && ongoingLessons.length}</span>
                  </div>
                <div className="category_desc">
                  <p>these are free rooms in real time. Are always changing depending to the lessons ongoing on those rooms.</p>
                </div>
                <div className="details_bottom Category_bottom">
                    <p>Explore More</p>
                </div>
              </div>
            </Link>            
            <Link to='/upcominglessons' className='link-main CATER_DEX three_div_item'>
              <div className="Category_item">
                  <div className="details_item_header Category_item_header LESSONS_HEADER">
                      <p>UPCOMING LESSONS</p>
                      <span>{upcomingLessons && upcomingLessons.length}</span>
                  </div>
                <div className="category_desc">
                  <p>these are free rooms in real time. Are always changing depending to the lessons ongoing on those rooms.</p>
                </div>
                <div className="details_bottom Category_bottom">
                    <p>Explore More</p>
                </div>
              </div>
            </Link>            
            <Link to='/lessons' className='link-main CATER_DEX three_div_item NODISPLAY_ONSMALL'>
              <div className="Category_item">
                  <div className="details_item_header Category_item_header LESSONS_HEADER">
                      <p>ALL LESSONS</p>
                      <span>{lessons && lessons.length}</span>
                  </div>
                <div className="category_desc">
                  <p>these are free rooms in real time. Are always changing depending to the lessons ongoing on those rooms.</p>
                </div>
                <div className="details_bottom Category_bottom">
                    <p>Explore More</p>
                </div>
              </div>
            </Link>            
          </div>

          <div className="search_results gray_color">
            <p>{filteredLessons.length} <span>Search Results</span></p>
          </div>

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

                                  {isLessonOngoing(lesson.start, lesson.end) && <div className="lesson_dot"></div>}

                                  <div className="lesson-bottom">
                                      <p><span>Day:</span> {lesson.day}</p>
                                      <p><span>Class:</span> {lesson.courseId.name}</p>
                                      <p><span>Lecturer:</span> {lesson.lecturer}</p>
                                      <div className="lesson_remaining">
                                          <p>{isLessonOngoing(lesson.start, lesson.end) ? 'ongoing' : 'upcoming'}</p>
                                      </div>
                                  </div>
                              </div>
                          </Link>
                      ))
                  :   <div className="NODATA_COMP">
                          <h1>NO LESSONS</h1>
                      </div>
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lessons