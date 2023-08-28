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
import { getCourses, getFreeRooms, getInUseRooms, getLessons, getOngoingCourse, getOngoingLessons, getPosts, getRooms, getUpcomingLessons } from './redux/apiCalls';
import InuseRooms from './pages/roomsInUse/InuseRooms';
import OngoingLessonsComp from './pages/ongoingLessons/OngoingLessonsComp';
import UpcomingLessonsComp from './pages/upcomingLessons/UpcomingLessonsComp';
import OngoingCoursesComp from './pages/ongoingCourses/OngoingCoursesComp';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import TodaysLessons from './pages/todaysLessons/TodaysLessons';
import Ditso from './pages/ditso/Ditso';
import NewPost from './pages/newPost/NewPost';
import EditPost from './pages/editPost/EditPost';
import Posts from './pages/post/Posts';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getRooms(dispatch);
    getCourses(dispatch);
    getLessons(dispatch);
  
    const sse = new EventSource("https://instiwise-backend.onrender.com/sse");

    sse.onopen = () => {
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

      if (data.posts) {
        getPosts(dispatch, data.posts);
      }

      if (data.lessons) {
        getLessons(dispatch, data.lessons)
      }

      if (data.rooms) {
        getRooms(dispatch, data.rooms)
      }

      if (data.courses) {
        getCourses(dispatch, data.courses)
      }
    };
    
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
                  <Route path="/todayslessons" element={<TodaysLessons />} />
                  <Route path="/lesson/:id" element={<Lesson />} />
                  <Route path="/upcominglessons" element={<UpcomingLessonsComp />} />
                  <Route path="/ongoinglessons" element={<OngoingLessonsComp />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:id" element={<Course />} />
                  <Route path="/ongoingcourses" element={<OngoingCoursesComp />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/ditso" element={<Ditso />} />
                  <Route path="/newpost" element={<NewPost />} />
                  <Route path="/post/:id" element={<EditPost />} />
                  <Route path="/posts" element={<Posts />} />
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
