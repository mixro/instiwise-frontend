import './lesson.css'
import { Book } from '@mui/icons-material'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Lesson = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const lesson = useSelector((state) => state.lessons.lessons.find((lesson) => lesson._id === id));

    // Function to calculate the lesson duration
    const calculateLessonDuration = (start, end) => {
        // Convert start and end times to Date objects
        const startTime = new Date(`01/01/2023 ${start}`);
        const endTime = new Date(`01/01/2023 ${end}`);

        // Calculate the time difference in milliseconds
        const timeDiff = endTime - startTime;

        // Calculate hours and minutes
        const hours = Math.floor(timeDiff / 3600000);
        const minutes = Math.floor((timeDiff % 3600000) / 60000);

        // Format the duration as "hh:mm"
        const duration = `${hours.toString().padStart(2, '0')} hrs ${minutes.toString().padStart(2, '0')} mins`;

        return duration;
    };

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
    <div className="course_container">
        <div className="course_header">
            <h1>{lesson.name}</h1>
        </div>
        <div className="counter_body">
            <div className="course_left">
                <p className="location UPPERCASE"><Book /> {lesson.courseId && lesson.courseId.name}, {lesson.courseId.courseName}</p>
                <div className="lesson_desc">
                    <div className="lessonStatus">
                        <p>Status: <span>{isLessonOngoing(lesson.day, lesson.start, lesson.end) ? 'Ongoing' : 'Upcoming'}</span></p>
                    </div>
                    <p>Class: <span>{lesson.courseId && lesson.courseId.name}</span></p>
                    <p>Room: <span>{lesson.roomId && lesson.roomId.roomName}</span></p>
                    <p>Day: <span>{lesson.day}</span></p>
                    <p>Starting time: <span>{lesson.start}</span></p>
                    <p>Ending time: <span>{lesson.end}</span></p>
                    <p>Lesson duration: <span>{calculateLessonDuration(lesson.start, lesson.end)}</span></p>
                    <p>"{lesson.description}"</p>
                </div>

                <div className="course_gallery">
                    <div className="galleryItem">
                        <p>INSTiWISE</p>
                    </div>
                    <div className="galleryItem">
                        <p>INSTiWISE</p>
                    </div>
                    <div className="galleryItem">
                        <p>INSTiWISE</p>
                    </div>
                </div>
                <div className="course_desc">
                    <h2>Lesson Description:</h2>
                    <p>{lesson.description}</p>
                </div>
                <div className="course_desc">
                    <h2>Lesson Overview:</h2>
                    <p>This lesson is an essential component of our curriculum, designed to provide a comprehensive understanding of {lesson.name}. Whether you're new to this subject or seeking to deepen your knowledge, this lesson will equip you with valuable insights and skills <br /> Experienced instructors are dedicated to facilitating your learning journey, ensuring that you grasp each concept thoroughly. By the end of this lesson, you'll have a solid foundation in {lesson.name} and be ready to apply your newfound expertise</p>
                </div>
            </div>

            <div className="course_right">
                <h2>Class Info</h2>
                <div className="course_info">
                    <p>Name: <span>{lesson.courseId.name}</span></p>
                    <p>Total students: <span>{lesson.courseId.numberOfStudents}</span></p>
                    <p>Academic Year: <span>2023-2024</span></p>
                    <p>Starting year: <span>{lesson.courseId.starting}</span></p>
                    <p>Final year: <span>{lesson.courseId.ending}</span></p>
                    <p>Join us for this enlightening lesson and take a significant step forward in your quest for knowledge and mastery of {lesson.name}.</p>
                </div>
                <div className="course_image">
                    <h1>InstiWise</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Lesson