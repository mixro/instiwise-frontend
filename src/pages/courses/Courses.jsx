import { Link } from 'react-router-dom'
import './courses.css'
import { Search } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Courses = () => {
  const courses = useSelector((state) => state.courses.courses);
  const ongoingCourses = useSelector((state) => state.ongoingCourses.ongoingCourses);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle the search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter the lessons based on the search query
  const filteredCourses = Array.isArray(courses) && courses.filter((course) => {
    const courseName = course.name.toLowerCase();

    const query = searchQuery.toLowerCase();
    return (
      courseName.includes(query) 
    );
  });


  return (
    <div className="RoomsContainer">
      <div className="room-wrapper">
        <div className="room-left LESSONS_LEFT">
          <div className="room_header">
            <h1>Institute Courses</h1>
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
            <h1>Courses</h1>
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
            <Link to='/courses' className='link-main CATER_DEX three_div_item'>
              <div className="Category_item">
                  <div className="details_item_header Category_item_header LESSONS_HEADER">
                      <p>ALL COURSES</p>
                      <span>{courses && courses.length}</span>
                  </div>
                <div className="category_desc">
                  <p>these are free rooms in real time. Are always changing depending to the lessons ongoing on those rooms.</p>
                </div>
                <div className="details_bottom Category_bottom">
                    <p>Explore More</p>
                </div>
              </div>
            </Link>            
            <Link to='/ongoingcourses' className='link-main CATER_DEX three_div_item'>
              <div className="Category_item">
                  <div className="details_item_header Category_item_header LESSONS_HEADER">
                      <p>ONGOING COURSES</p>
                      <span>{ongoingCourses && ongoingCourses.length}</span>
                  </div>
                <div className="category_desc">
                  <p>these are free rooms in real time. Are always changing depending to the lessons ongoing on those rooms.</p>
                </div>
                <div className="details_bottom Category_bottom">
                    <p>Explore More</p>
                </div>
              </div>
            </Link>            
            <Link to='/courses' className='link-main CATER_DEX three_div_item NODISPLAY_ONSMALL'>
              <div className="Category_item">
                  <div className="details_item_header Category_item_header LESSONS_HEADER">
                      <p>ALL COURSES</p>
                      <span>{courses && courses.lenght}</span>
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
            <p>{filteredCourses.length} <span>Search Results</span></p>
          </div>

          <div className="LESSONS_MAIN">
            {Array.isArray(filteredCourses) && filteredCourses.length > 0
              ?   filteredCourses.map((course) => (
                      <Link to={`/course/${course._id}`} key={course._id} className='link-main DIVITEM_COMP'>
                          <div className="lesson-container">
                              <div className="lesson_top COURSE_TOP">
                                  <h1>{course.name}</h1>
                                  <p>{course.description}</p>
                              </div>

                              <div className="lesson-bottom">
                                  <p><span>Class:</span> {course.name}</p>
                                  <p><span>Students:</span> {course.numberOfStudents}</p>
                                  <p><span>Departiment:</span> {course.department}</p>
                                  <p><span>Final year:</span> 2024</p>
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

export default Courses