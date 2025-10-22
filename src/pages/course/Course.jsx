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

    const isLessonOngoing = (lesson) => {
        const now = new Date();
        const dayOfWeek = now.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
      
        // Check if the current day matches the specified day
        if (dayOfWeek !== lesson.day.toLowerCase()) {
          return false;
        }
        const startTime = new Date(`${now.toDateString()} ${lesson.start}`);
        const endTime = new Date(`${now.toDateString()} ${lesson.end}`);
      
        return now >= startTime && now <= endTime;
    };

    const hasOngoingLesson = courseLessons.some(isLessonOngoing);

  return (
    <div className="course_container">
        <div className="course_header">
            <h1>{course.name}</h1>
        </div>
        <div className="counter_body">
            <div className="course_left">
                <p className="location UPPERCASE"><Book /> {course.department}, DEPARTIMENT </p>

                <div className="lesson_desc">
                    <div className="lessonStatus">
                            <p>Status: <span>{hasOngoingLesson ? 'Ongoing' : 'Not Ongoing'}</span></p>
                    </div>
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
                                                <div className="lesson_remaining">
                                                    <p>{isLessonOngoing(lesson) ? 'ongoing' : 'upcoming'}</p>
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
                <div className="course_desc">
                    <h2>Courses Description:</h2>
                    <p>{course.description}</p>
                </div>
                <div className="course_desc">
                    <h2>Courses Overview:</h2>
                    <p>"Explore this comprehensive course offerings designed to provide you with the knowledge and skills you need to succeed. This courses cover a wide range of subjects, from foundational to advanced topics, ensuring you receive a well-rounded education. Taught by experienced instructors, This courses blend theory with practical applications, preparing you for a successful future in your chosen field."</p>
                </div>
            </div>

            <div className="course_right">
                <h2>Course Info</h2>
                <div className="course_info">
                    <p>Total students: <span>{course.numberOfStudents}</span></p>
                    <p>Started: <span>2023-2022</span></p>
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