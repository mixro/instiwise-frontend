import { Home, MeetingRoom, ChairAlt, TipsAndUpdates, Feedback, Support, Book, PlayLesson, Groups2Sharp, ArrowCircleUpSharp} from "@mui/icons-material";
import { Link } from 'react-router-dom'
import './sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebarContainer">
            <div className="sidebarTop">
                <div className="logo">
                    <Link className="link" to="/">
                        <p>INSTiWISE</p>
                    </Link>
                </div>
            </div>

            <div className="sidebarCenter">
                <div className="centerSection">
                    <ul>
                        <Link className="link" to="/">
                            <li><Home className="side-icons" />Home</li>
                        </Link>
                        <Link className="link" to="/lessons">
                            <li><Book className="side-icons" />Lessons</li>
                        </Link>
                        <Link className="link" to="/rooms">
                            <li><MeetingRoom className="side-icons" />Rooms</li>
                        </Link>
                        <Link  className="link" to="/courses">
                            <li><Groups2Sharp className="side-icons" />Courses</li>
                        </Link>
                    </ul>
                </div>

                <div className={"centerSection"}>
                    <ul>
                        <Link  className="link" to="/freerooms">
                            <li><ChairAlt className="side-icons" />Free rooms</li>
                        </Link>
                        <Link className="link" to="/roomsinuse">
                            <li><MeetingRoom className="side-icons" />Rooms in use</li>
                        </Link>
                        <Link  className="link" to="/ongoinglessons">
                            <li><PlayLesson className="side-icons" />On Lessons</li>
                        </Link>
                        <Link  className="link" to="/upcominglessons">
                            <li><ArrowCircleUpSharp className="side-icons" />Up Lessons</li>
                        </Link>                        
                    </ul>
                </div>

                <div className={"centerSection"}>
                    <ul>
                        <Link  className="link" to="/">
                            <li><Support className="side-icons" />Support</li>
                        </Link>
                        <Link  className="link" to="/">
                            <li><TipsAndUpdates className="side-icons" />Updates</li>
                        </Link>
                        <Link  className="link" to="/">
                            <li><Feedback className="side-icons" />Feedback</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar