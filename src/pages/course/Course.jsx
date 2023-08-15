import { Link, useLocation } from 'react-router-dom';
import './course.css'
import { useSelector } from 'react-redux';
import { Book } from '@mui/icons-material'

const Course = () => {
    const location = useLocation();
    const roomId = location.pathname.split("/")[2];
    const course = useSelector((state) => state.courses.courses.find((course) => course._id === roomId));
    const lessons = useSelector((state) => state.lessons.lessons);
    const courseLessons = lessons.filter((lesson) => lesson.courseId._id === roomId);

  return (
    <div className="course_container">
        <div className="course_header">
            <h1>{course.name} Course</h1>
        </div>
        <div className="counter_body">
            <div className="course_left">
                <p className="location UPPERCASE"><Book /> {course.department}, DEPARTIMENT </p>

                <div className="lesson_desc">
                    <p>Name: <span>{course.name}</span></p>
                    <p>Starting year: <span> {course.starting}</span></p>
                    <p>Final year: <span> {course.ending}</span></p>
                    <p>Total students: <span> {course.numberOfStudents}</span></p>
                    <p>Departiment: <span> {course.department}</span></p>
                    <p>"{course.description}"</p>
                </div>

                <div className="course_desc">
                    <h2>Course Lessons:</h2>
                    <div className="LESSONS_MAIN">
                        {Array.isArray(courseLessons) && courseLessons.length > 0
                            ?   courseLessons.map((lesson) => (
                                    <Link to={`/lesson/${lesson._id}`} key={lesson._id} className='link-main DIVITEM_COMP'>
                                        <div className="lesson-container">
                                            <div className="lesson_top">
                                                <h1>{lesson.name}</h1>
                                                <p><span>Time:</span>{lesson.start} <span>to</span> {lesson.end}</p>
                                                <p><span>Room:</span>{lesson.roomId.roomName}</p>
                                            </div>

                                            <div className="lesson-bottom">
                                                <p><span>Day:</span> {lesson.day}</p>
                                                <p><span>Course:</span> {lesson.courseId.name}</p>
                                                <p><span>Lecturer:</span> {lesson.lecturer}</p>
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
                <div className="course_desc">
                    <h2>Courses Description:</h2>
                    <p>This course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generation</p>
                </div>
                <div className="course_desc">
                    <h2>Courses Overview:</h2>
                    <p>This course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generation</p>
                </div>
            </div>

            <div className="course_right">
                <h2>Course Info</h2>
                <div className="course_info">
                    <p>Total students: <span>{course.numberOfStudents}</span></p>
                    <p>Academic Year: <span>2023-2022</span></p>
                    <p>Starting year: <span>{course.starting}</span></p>
                    <p>Final year: <span>{course.ending}</span></p>
                    <p>{course.description}</p>
                </div>
                <div className="course_image">
                    <h1>INSTiWISE</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Course