import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => {

  return (
    <div className="footer_container">
        <div className="footer_body">
            <div className="footer_item">
              <h1>ROOMS</h1>
              <ul>
                <Link to='/freerooms' className='link-main'>
                  <li>Free Rooms</li>
                </Link>
                <Link to='/roomsinuse' className='link-main'>
                  <li>Rooms In use</li>
                </Link>
                <Link to='/rooms' className='link-main'>
                  <li>Laboratories</li>
                </Link>
                <Link to='/rooms' className='link-main'>
                  <li>Workshops</li>
                </Link>
                <Link to='/rooms' className='link-main'>
                  <li>Libraries</li>
                </Link>
              </ul>
            </div>
            <div className="footer_item">
              <h1>LESSONS</h1>
              <ul>
                <Link to='/ongoinglessons' className='link-main'>
                  <li>Ongoing lessons</li>
                </Link>
                <Link to='/upcominglessons' className='link-main'>
                  <li>Upcoming lessons</li>
                </Link>
                <Link to='/todayslessons' className='link-main'>
                  <li>Today's lessons</li>
                </Link>
                <Link to='/lessons' className='link-main'>
                  <li>Postponed lessons</li>
                </Link>
              </ul>
            </div>
            <div className="footer_item">
              <h1>COURSES</h1>
              <ul>
                <Link to='/ongoingcourses' className='link-main'>
                  <li>Ongoing courses</li>
                </Link>
                <Link to='/courses' className='link-main'>
                  <li>Presentantion</li>
                </Link>
                <Link to='/courses' className='link-main'>
                  <li>All courses</li>
                </Link>
              </ul>
            </div>

            <div className="footer_item">
              <h1>TIMETABLE</h1>
              <ul>
                <Link to='/rooms' className='link-main'>
                  <li>Lectures</li>
                </Link>
                <Link to='/lessons' className='link-main'>
                  <li>Lessons</li>
                </Link>
                <Link to='/lessons' className='link-main'>
                  <li>Rooms</li>
                </Link>
                <Link to='/lessons' className='link-main'>
                  <li>Time</li>
                </Link>                
              </ul>
            </div>
        </div>
        <div className="footer_bottom">
            <p>© 2022 - 2024 INSTiWISE . All Right Reserved</p>
            <p>Micep International</p>
        </div>
    </div>
  )
}

export default Footer