import './app.css'
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Rooms from "./pages/rooms/Rooms";
import Room from './pages/room/Room';
import Lessons from './pages/lessons/Lessons';
import Courses from './pages/courses/Courses';
import Course from './pages/course/Course';
import Lesson from './pages/lesson/Lesson';
import FreeRooms from './pages/freeRooms/FreeRooms';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCourses, getFreeRooms, getInUseRooms, getLessons, getOngoingCourse, getOngoingLessons, getRooms, getUpcomingLessons } from './redux/apiCalls';
import { io } from "socket.io-client";
import InuseRooms from './pages/roomsInUse/InuseRooms';
import OngoingLessonsComp from './pages/ongoingLessons/OngoingLessonsComp';
import UpcomingLessonsComp from './pages/upcomingLessons/UpcomingLessonsComp';
import OngoingCoursesComp from './pages/ongoingCourses/OngoingCoursesComp';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    getRooms(dispatch);
    getCourses(dispatch);
    getLessons(dispatch);

    const socket = io('http://localhost:8800');
    socket.on('connect', () => {
      console.log('Connected to the Socket.IO server.');
      socket.emit('requestData');
    });

    // Event listener for connection error
    socket.on('connect_error', (error) => {
      console.error('Connection failed:', error.message);
    });

    // Event listener for disconnection
    socket.on('disconnect', (reason) => {
      console.log('Disconnected:', reason);
    });

    socket.on('freeRoomsData', (data) => {
      console.log('FREE ROOMS:', data);
      getFreeRooms(dispatch, data);
    });

    socket.on('InUseRoomsData', (data) => {
      console.log('INUSE ROOMS:', data);
      getInUseRooms(dispatch, data);
    });

    socket.on('ongoingLessonsData', (data) => {
      console.log('ONGOING LESSONS:', data);
      getOngoingLessons(dispatch, data);
    });

    socket.on('upcomingLessonsData', (data) => {
      console.log('UPCOMING LESSONS:', data);
      getUpcomingLessons(dispatch, data);
    });

    socket.on('ongoingCoursesData', (data) => {
      console.log('ONGOING COURSES:', data);
      getOngoingCourse(dispatch, data);
    });

    // Clean up the socket on component unmount
    return () => {
      socket.disconnect();
    };

  },[dispatch]);

  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/rooms' element={<Rooms />} />
            <Route path='/room/:id' element={<Room />} />
            <Route path='/freerooms' element={<FreeRooms />} />
            <Route path='/roomsinuse' element={<InuseRooms />} />
            <Route path='/lessons' element={<Lessons />} />
            <Route path='/lesson/:id' element={<Lesson />} />
            <Route path='/upcominglessons' element={<UpcomingLessonsComp />} />
            <Route path='/ongoinglessons' element={<OngoingLessonsComp />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/course/:id' element={<Course />} />
            <Route path='/ongoingcourses' element={<OngoingCoursesComp />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
