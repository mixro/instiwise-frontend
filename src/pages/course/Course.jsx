import { useLocation } from 'react-router-dom';
import './course.css'
import { Book } from '@mui/icons-material'
import { useEffect, useState } from 'react';
import { publicRequest } from '../../requestMethod';

const Course = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [course, setCourse] = useState({});

    useEffect(() => {
        const getCourse = async () => {
            try {
                const res = await publicRequest.get('/courses/find/' + id);
                setCourse(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        getCourse();
    }, [id]);

  return (
    <div className="course_container">
        <div className="course_header">
            <h1>{course.name}</h1>
        </div>
        <div className="counter_body">
            <div className="course_left">
                <p className="location UPPERCASE"><Book /> {course.department}, DEPARTIMENT </p>

                <div className="lesson_desc">
                    <p>Name: <span>{course.name}</span></p>
                    <p>Starting year: <span> 2021</span></p>
                    <p>Final year: <span> 2024</span></p>
                    <p>Total students: <span> {course.numberOfStudents}</span></p>
                    <p>Departiment: <span> {course.department}</span></p>
                    <p>"{course.description}"</p>
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
                    <p>Starting year: <span>2021</span></p>
                    <p>Final year: <span>2024</span></p>
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