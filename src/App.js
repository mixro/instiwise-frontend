 import './app.css'
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import Posts from './pages/posts/Posts';
import Rooms from "./pages/rooms/Rooms";
import Room from './pages/room/Room';
import Lessons from './pages/lessons/Lessons';
import Courses from './pages/courses/Courses';
import Course from './pages/course/Course';
import Lesson from './pages/lesson/Lesson';
import FreeRooms from './pages/freeRooms/FreeRooms';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Ditso from './pages/ditso/Ditso';
import NewPost from './pages/newPost/NewPost';
import EditPost from './pages/editPost/EditPost';
import InuseRooms from './pages/roomsInUse/InuseRooms';
import TodaysLessons from './pages/todaysLessons/TodaysLessons';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import OngoingLessonsComp from './pages/ongoingLessons/OngoingLessonsComp';
import OngoingCoursesComp from './pages/ongoingCourses/OngoingCoursesComp';
import UpcomingLessonsComp from './pages/upcomingLessons/UpcomingLessonsComp';
import { getCourses, getFreeRooms, getInUseRooms, getLessons, getOngoingCourse, getOngoingLessons, getRooms, getTodaysLessons, getUpcomingLessons } from './redux/apiCalls';
import Projects from './pages/projects/Projects';
import Project from './pages/project/Project';
import NewProject from './pages/newProject/NewProject';
import UserUpdate from './pages/userUpdate/UserUpdate';
import Profile from './pages/profile/Profile';
import UserProfile from './pages/userProfile/UserProfile';
import UpdateProject from './pages/updateProject/UpdateProject';
import People from './pages/people/People';
import PeopleLayout from './components/peopleLayout/PeopleLayout';
import PeopleCategories from './pages/peopleCategories/PeopleCategories';
import ProjectsList from './components/projectsList/ProjectsList';
import Problems from './components/problems/Problems';
import ProfileProjects from './components/profileProjects/ProfileProjects';
import Connections from './components/connections/Connections';
import Awards from './components/awards/Awards';
import SearchedUserProjects from './components/searchedUserProjects/SearchedUserProjects';
import SearchedUserConnection from './components/searchedUserConnections/SearchedUserConnection';
import Researches from './components/researches/Researches';

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

      if (data.todaysLessons) {
        getTodaysLessons(dispatch, data.todaysLessons)
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

                  <Route 
                    path="/profile/*" 
                    element={
                      <Profile>
                        <Routes>
                          <Route index element={<ProfileProjects />} />
                          <Route path="/connections" element={<Connections />} />
                          <Route path="/awards" element={<Awards />} />
                        </Routes>
                      </Profile>
                    } 
                  />
                  <Route path="/profile-update/:id" element={<UserUpdate />} />
                  <Route 
                    path="/user-profile/:id/*" 
                    element={
                      <UserProfile>
                        <Routes>
                          <Route index element={<SearchedUserProjects />} />
                          <Route path='/connections' element={<SearchedUserConnection />} />
                          <Route path='/awards' element={<Awards />} />
                        </Routes>
                      </UserProfile>
                    } 
                  />
                  <Route path="/user/:id" element={<UserUpdate />} />

                  <Route path="/ditso" element={<Ditso />} />
                  <Route path="/newpost" element={<NewPost />} />
                  <Route path="/post/:id" element={<EditPost />} />
                  <Route path="/posts" element={<Posts />} />

                  <Route 
                    path="/projects/*" 
                    element={
                      <Projects>
                        <Routes>
                          <Route index element={<ProjectsList />} />
                          <Route path="/problems" element={<Problems />} />
                          <Route path="/researches" element={<Researches />} />
                        </Routes>
                      </Projects>
                    } 
                  />
                  <Route path="/project/:id" element={<Project />} />
                  <Route path="/new-project" element={<NewProject />} />
                  <Route path="/update-project/:id" element={<UpdateProject />} />

                  <Route
                    path="/people/*"
                    element={
                      <PeopleLayout>
                        <Routes>
                          <Route index element={<People />} />
                          <Route path="/people-categories" element={<PeopleCategories />} />
                        </Routes>
                      </PeopleLayout>
                    }
                  />
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
