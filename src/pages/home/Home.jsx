import './home.css'
import { Link } from 'react-router-dom'
import Details from '../../components/details/Details'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import TypeWriterEffect from 'react-typewriter-effect';


const Home = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentWeekNumber, setCurrentWeekNumber] = useState('');
  const [profileLoading, setProfileLoading] = useState(true);
  const rooms = useSelector((state) => state.rooms.rooms);
  const courses = useSelector((state) => state.courses.courses);
  const lessons = useSelector((state) => state.lessons.lessons);
  const ongoingLessons = useSelector((state) => state.ongoingLessons.ongoingLessons);
  const freeRooms = useSelector((state) => state.freeRooms.freeRooms);
  const upcomingLessons = useSelector((state) => state.upcomingLessons.upcomingLessons);
  const inUseRooms = useSelector((state) => state.inUseRooms.inUseRooms);

  useEffect(() => {
    const getCurrentInfo = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      const day = now.toLocaleDateString(undefined, { weekday: 'long' });
      const date = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
      const daysSinceFirstDay = Math.round((now - firstDayOfYear) / (24 * 60 * 60 * 1000));
      const weekNumber = Math.ceil((daysSinceFirstDay + firstDayOfYear.getDay() + 1) / 7);
    
      setCurrentTime(time);
      setCurrentDay(day);
      setCurrentDate(date);
      setCurrentWeekNumber(weekNumber);
    };    

    const interval = setInterval(getCurrentInfo, 1000);
    getCurrentInfo();

    return () => clearInterval(interval);
  }, []);  

  const handleProfileLoad = () => {
    setProfileLoading(false);
  };

  return (
    <div className="home_container">
      <div className="home_header">
        <div className="home_comp_left">
          <div className="header_autotyping">
            <TypeWriterEffect
              textStyle={{
                fontFamily: 'Poppins, sans-serif',
                color: 'black',
                fontWeight: 600,
                fontSize: '32px',
                lineHeight: '50px',
              }}
              startDelay={700}
              cursorColor="#ffffff"
              multiText={[
                "Seamless Scheduling",
                "Welcome to InstiWise"           
              ]}
              multiTextDelay={2000}
              typeSpeed={30}
            />
          </div>
          <p>Track, manage and Forecast your platform</p>
        </div>

        <div className="home_comp_right">
          <div className="comp_right_item">
            <h2>Time</h2>
            <p>{currentTime}</p>
          </div>
          <div className="comp_right_item">
            <h2>Date</h2>
            <p>{currentDate}</p>
          </div>
          <div className="comp_right_item">
            <h2>Day</h2>
            <p>{currentDay}</p>
          </div>
          <div className="comp_right_item">
            <h2>Weeks</h2>
            <p>{currentWeekNumber} week</p>
          </div>
        </div>
      </div>

      <div className="SMALLSCREEN">
        <div className="auto_typing">
          <div className="autotyping_item">
            <TypeWriterEffect
              textStyle={{
                fontFamily: 'Poppins, sans-serif',
                color: 'black',
                fontWeight: 600,
                fontSize: '30px',
                lineHeight: '40px',
              }}
              startDelay={700}
              cursorColor="#3F3D56"
              multiText={[
                "Enhance Learning Experience",
                "Institute Seamless Scheduling"            
              ]}
              multiTextDelay={2000}
              typeSpeed={30}
            />
          </div>

          <div className="autotyping_item">
            <img src='/assets/clock.png' style={{display: profileLoading ? "none" : "block"}} onLoad={handleProfileLoad} alt='CLOCK' />
            <div className="noClockImage" style={{display: profileLoading ? "block" : "none"}}>              
            </div>
          </div>
        </div>
      </div>

      <div className="home_header_smallScreen">
        <div className="header_div_smallScreen">
          <Link to='/ongoinglessons' className='link-main'>
            <div className="home_header_item">
              <p className='WHITESPACE'>On lessons </p>
              <div className="header_ongoing_dot">
                <span>{ongoingLessons && ongoingLessons.length}</span>
                <div className="blinking_dot"></div>
              </div>
            </div>
            <div className="HEADER_P">
              {ongoingLessons && ongoingLessons.length > 0 
                ? <p>These are ongoing lessons at the moment</p>
                : <p>There is no ongoing lesson at the moment</p>
              }
            </div>
            <div className="center_dots">
              <p>......</p>
            </div>
          </Link>
        </div>

        <div className="header_div_smallScreen">
          <Link to='/freerooms' className='link-main'>
            <div className="home_header_item">
              <p className='WHITESPACE'>Free rooms </p>
              <div className="header_ongoing_dot">
                <span>{freeRooms && freeRooms.length}</span>
                <div className="blinking_dot"></div>
              </div>
            </div>
            <div className="HEADER_P">
              {freeRooms && freeRooms.length > 0 
                ? <p>These are free rooms at the moment</p>
                : <p>There is no free room at the moment</p>
              }
            </div>
            <div className="center_dots">
              <p>......</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="home_header_smallScreen">
        <div className="header_div_smallScreen">
          <Link to='/upcominglessons' className='link-main'>
            <div className="home_header_item">
              <p className='WHITESPACE'>Up lessons </p>
              <div className="header_ongoing_dot">
                <span>{upcomingLessons && upcomingLessons.length}</span>
                <div className="blinking_dot"></div>
              </div>
            </div>
            <div className="HEADER_P">
              {upcomingLessons && upcomingLessons.length > 0 
                ? <p>These are upcoming lessons today</p>
                : <p>There is no upcoming lesson today</p>
              }
            </div>
            <div className="center_dots">
              <p>......</p>
            </div>
          </Link>
        </div>

        <div className="header_div_smallScreen">
          <Link to='/roomsinuse' className='link-main'>
            <div className="home_header_item">
              <p className='WHITESPACE'>Rooms in use </p>
              <div className="header_ongoing_dot">
                <span>{inUseRooms && inUseRooms.length}</span>
                <div className="blinking_dot"></div>
              </div>
            </div>
            <div className="HEADER_P">
              {inUseRooms && inUseRooms.length > 0 
                ? <p>These are rooms in use at the moment</p>
                : <p>There is no room in use at the moment</p>
              }
            </div>
            <div className="center_dots">
              <p>......</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="home_body">
        <div className="home_topInfo">          
          <div className="topInfo_item">
            <Link to='/lessons' className='link-main'>
              <div className="topInfo_header">
                <p>Lessons</p>
                <span>{lessons && lessons.length}</span>
              </div>
              <div className="topInfo_desc">
                <p>{window.innerWidth >= 770 ? "Complete access to all institute lessons" : "Complete access to all lessons"}</p>
                <div className="topInfo_item_link">
                  <span>Explore more!</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="topInfo_item">
            <Link to='/rooms' className='link-main'>
              <div className="topInfo_header">
                <p>Rooms</p>
                <span>{rooms && rooms.length}</span>
              </div>
              <div className="topInfo_desc">
                <p>{window.innerWidth >= 770 ? "Navigate rooms online before entering effortlessly." : "Explore rooms online before entry."}</p>
                <div className="topInfo_item_link">
                  <span>Explore more!</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="topInfo_item">
            <Link to='/courses' className='link-main'>
              <div className="topInfo_header">
                <p>Courses</p>
                <span>{courses && courses.length}</span>
              </div>
              <div className="topInfo_desc">
                <p>{window.innerWidth >= 770 ? "Access all courses with seamless convenience" : "Access all available courses easily"}</p>
                <div className="topInfo_item_link">
                  <span>Explore more!</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="topInfo_item">
            <div className="topInfo_header">
              <p>Students</p>
              <span>5000+</span>
            </div>
            <div className="topInfo_desc">
              <p>{window.innerWidth >= 770 ? "Institute's total student enrollment count." : "Institute's total student enrollment count."}</p>
              <div className="topInfo_item_link">
                <span>Explore more!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="homeNews_container">
        <div className="homeNews_item">
          <span>Get informed like never before!</span>
          <h1 className='LARGESCREEN'>Stay updated with <br /> your SO's timeline news</h1>
          <h1 className='SMALLSCREEN'>Stay updated with <br /> SO's timeline news</h1>
          <Link to="/posts" className='link-main'>
            <button>EXPLORE MORE</button>
          </Link>
        </div> 
      </div>

      <div className="SMALLSCREEN">
        <div className="div_header">
          <p>Access All</p>
        </div>
      </div>

      <Details />
    </div>
  )
}

export default Home