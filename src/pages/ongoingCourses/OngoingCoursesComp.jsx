import { Search } from '@mui/icons-material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const OngoingCoursesComp = () => {
    const ongoingCourses = useSelector((state) => state.ongoingCourses.ongoingCourses);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle the search input change
    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    // Function to filter the lessons based on the search query
    const filteredCourses = Array.isArray(ongoingCourses) && ongoingCourses.filter((course) => {
      const courseName = course.name.toLowerCase();
  
      const query = searchQuery.toLowerCase();
      return (
        courseName.includes(query) 
      );
    });

  return (
    <div className="container">
        <div className="SMALLSCREEN">
            <div className="small_room_header small_font smallest_font">
                <h1>Ongoing Courses ({ongoingCourses && ongoingCourses.length})</h1>
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
                <p>{filteredCourses && filteredCourses.length} <span>Search Results</span></p>
            </div>
        </div>  

        <div className="room_header">
            <h1>Ongoing Courses ({ongoingCourses && ongoingCourses.length})</h1>
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
            <p>{filteredCourses && filteredCourses.length} <span>Search Results</span></p>
        </div>

        <div className="lesson-wrapper">
            <div className="lesson-left">
                <div className="COURSE_CONTAINER">
                    <div className="LESSONS_MAIN">
                        {Array.isArray(filteredCourses) && filteredCourses.length > 0
                            ?   filteredCourses.map((course) => (
                                    <Link to={`/course/${course._id}`} key={course._id} className='link-main DIVITEM_COMP'>
                                        <div className="lesson-container">
                                            <div className="lesson_top COURSE_TOP">
                                                <h1>{course.name }</h1>
                                                <p>This course learn and deal with electrical enginering and power generationThis course </p>
                                            </div>

                                            <div className="lesson-bottom">
                                                <p><span>Class:</span> {course.name}</p>
                                                <p><span>Departiment:</span> electrical</p>
                                                <p><span>Staring year:</span> 2021</p>
                                                <p><span>Final year:</span> 2024</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            :   <div className="NODATA_COMP">
                                    <h1>NO COURSE WITH LESSON AT THE MOMENT</h1>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OngoingCoursesComp