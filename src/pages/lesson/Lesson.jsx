import './lesson.css'
import { Book } from '@mui/icons-material'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Lesson = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const lesson = useSelector((state) => state.lessons.lessons.find((lesson) => lesson._id === id));

  return (
    <div className="course_container">
        <div className="course_header">
            <h1>{lesson.name}</h1>
        </div>
        <div className="counter_body">
            <div className="course_left">
                <p className="location UPPERCASE"><Book /> {lesson.courseId && lesson.courseId.name} LESSON, GENERAL STUDY</p>
                <div className="lesson_desc">
                    <p>Class: <span>{lesson.courseId && lesson.courseId.name}</span></p>
                    <p>Room: <span>{lesson.roomId && lesson.roomId.roomName}</span></p>
                    <p>Starting time: <span>{lesson.start}</span></p>
                    <p>Ending time: <span>{lesson.end}</span></p>
                    <p>Remainigning: <span>1hrs 23min</span></p>
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
                    <p>This course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generation</p>
                </div>
                <div className="course_desc">
                    <h2>Lesson Overview:</h2>
                    <p>This course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generationThis course learn and deal with electrical enginering and power generation</p>
                </div>
            </div>

            <div className="course_right">
                <h2>Lesson Info</h2>
                <div className="course_info">
                    <p>Total studentss: <span>56</span></p>
                    <p>Academic Year: <span>2023-2022</span></p>
                    <p>Starting year: <span>2021</span></p>
                    <p>Final year: <span>2024</span></p>
                    <p>This course learn and deal with electrical enginering and power generation</p>
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