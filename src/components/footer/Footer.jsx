import './footer.css'

const Footer = () => {
  return (
    <div className="footer_container">
        <div className="footer_body">
            <div className="footer_item">
              <h1>ROOMS</h1>
              <ul>
                <li>Free Rooms</li>
                <li>Rooms In use</li>
                <li>Laboratories</li>
                <li>Workshops</li>
                <li>Libraries</li>
              </ul>
            </div>
            <div className="footer_item">
              <h1>LESSONS</h1>
              <ul>
                <li>Ongoing lessons</li>
                <li>Upcoming lessons</li>
                <li>Postponed lessons</li>
                <li>Lessons Rooms</li>
              </ul>
            </div>
            <div className="footer_item">
              <h1>COURSES</h1>
              <ul>
                <li>Ongoing courses</li>
                <li>Presentantion</li>
                <li>All courses</li>
              </ul>
            </div>

            <div className="footer_item">
              <h1>TIMETABLE</h1>
              <ul>
                <li>Lectures</li>
                <li>Lessons</li>
                <li>Rooms</li>
                <li>Time</li>
              </ul>
            </div>
        </div>
        <div className="footer_bottom">
            <p>© 2022 - 2023 INSTiWISE . All Right Reserved</p>
            <p>Micep International</p>
        </div>
    </div>
  )
}

export default Footer