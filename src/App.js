import './app.css'
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Rooms from "./pages/rooms/Rooms";
import Room from './pages/room/Room';
import Lessons from './pages/lessons/Lessons';
import Courses from './pages/courses/Courses';
import Course from './pages/course/Course';
import Lesson from './pages/lesson/Lesson';
import FreeRooms from './pages/freeRooms/FreeRooms';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, getFreeRooms, getInUseRooms, getLessons, getOngoingCourse, getOngoingLessons, getRooms, getUpcomingLessons } from './redux/apiCalls';
import InuseRooms from './pages/roomsInUse/InuseRooms';
import OngoingLessonsComp from './pages/ongoingLessons/OngoingLessonsComp';
import UpcomingLessonsComp from './pages/upcomingLessons/UpcomingLessonsComp';
import OngoingCoursesComp from './pages/ongoingCourses/OngoingCoursesComp';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    getRooms(dispatch);
    getCourses(dispatch);
    getLessons(dispatch);
  
    const sse = new EventSource("https://instiwise-backend.onrender.com/sse");

    sse.onopen = (event) => {
      console.log("SSE connection opened");
    };

    sse.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.freeRooms) {
        getFreeRooms(dispatch, data.freeRooms);
      }

      if (data.inUseRooms) {
        getInUseRooms(dispatch, data.inUseRooms);
      }

      if (data.ongoingLessons) {
        getOngoingLessons(dispatch, data.ongoingLessons);
      }

      if (data.upcomingLessons) {
        getUpcomingLessons(dispatch, data.upcomingLessons);
      }

      if (data.ongoingCourses) {
        getOngoingCourse(dispatch, data.ongoingCourses);
      }
    };

    // Clean up the socket on component unmount
    return () => {
      sse.close();
    };

  },[dispatch]);

  return (
    <>
      <Router>
      <Routes>
        {/* Routes without Layout */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Routes with Layout */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/room/:id" element={<Room />} />
                <Route path="/freerooms" element={<FreeRooms />} />
                <Route path="/roomsinuse" element={<InuseRooms />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/lesson/:id" element={<Lesson />} />
                <Route path="/upcominglessons" element={<UpcomingLessonsComp />} />
                <Route path="/ongoinglessons" element={<OngoingLessonsComp />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:id" element={<Course />} />
                <Route path="/ongoingcourses" element={<OngoingCoursesComp />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
    </>
  );
}

export default App;
