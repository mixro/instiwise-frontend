import { Home, MeetingRoom, ChairAlt, Feedback, Book, PlayLesson, ArrowCircleUpSharp, HowToReg, Login, Today, Handyman, RssFeed, Diversity3, Groups} from "@mui/icons-material";
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
                <div className="centerSection centerSectio_Margin">
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
                            <li><Groups className="side-icons" />Classes</li>
                        </Link>
                        <Link  className="link" to="/posts">
                            <li><RssFeed className="side-icons" />News</li>
                        </Link>
                        <Link  className="link" to="/projects">
                            <li><Handyman className="side-icons" />Projects</li>
                        </Link>
                        <Link  className="link" to="/people">
                            <li><Diversity3 className="side-icons" />People</li>
                        </Link>
                    </ul>
                </div>

                <div className="centerSection centerSectio_Margin">
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
                        <Link  className="link" to="/todayslessons">
                            <li><Today className="side-icons" />Today's Lessons</li>
                        </Link>                        
                    </ul>
                </div>

                <div className="centerSection">
                    <ul>
                        <Link  className="link" to="/login">
                            <li><HowToReg className="side-icons" />Login</li>
                        </Link>
                        <Link  className="link" to="/register">
                            <li><Login className="side-icons" />Register</li>
                        </Link>
                        <Link  className="link" to="/ditso">
                            <li><Feedback className="side-icons" />Ditso</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar