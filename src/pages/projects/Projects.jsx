import { useEffect, useState } from 'react';
import './projects.css';
import { Handyman, Info, Science } from '@mui/icons-material';
import { getProjects } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Projects = ({children}) => {
  const [coverLoading, setCoverLoading] = useState(true);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    getProjects(dispatch);
  }, [dispatch]);

  const handleCoverLoading = () => {
    setCoverLoading(false)
  }

  return (
    <div className="projectsContainer">
        {user ? 
          <div className="projectsWrapper">
            <div className="projectsTop">
              <div className="projectTopImage">
                <img src='/assets/project.jpg' style={{display: coverLoading ? "none" : "block"}} onLoad={handleCoverLoading} alt='COVER' />
                <div className="noProjectCover" style={{display: coverLoading ? "block" : "none"}}>
                </div>
              </div>

              <div className="projectTopHeader">
                <div className="projectTopHeader_left">
                  <h1>INNOVATIVE PROJECTS</h1>
                  <span>Exploring Innovative Creations</span>
                </div>
                <div className="projectTopHeader_right">
                  <div className="projectTopHeader_Item">
                    <Link to="/projects" className='link-main'>
                      <div className="projectItem_Inner">
                        <div className="projectItem_icon">
                          <p>Projects</p>
                          <Handyman sx={{fontSize: {xs: 24, sm: 30}}} />
                        </div>
                        <span>{projects.length}</span>
                      </div>
                    </Link>
                  </div>
                  <div className="projectTopHeader_Item">
                    <Link to='./problems' className='link-main'>
                      <div className="projectItem_Inner">
                        <div className="projectItem_icon">
                          <p>Problems</p>
                          <Info sx={{fontSize: {xs: 24, sm: 30}}} />
                        </div>
                        <span>10</span>
                      </div>
                    </Link>
                  </div>
                  <div className="projectTopHeader_Item">
                    <Link to="./researches" className='link-main'>
                      <div className="projectItem_Inner">
                        <div className="projectItem_icon">
                          <p>Researches</p>
                          <Science sx={{fontSize: {xs: 24, sm: 30}}} />
                        </div>
                        <span>8</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="projectsBody">
              {children}
            </div>
          </div> 
          :
          <div className="noUser">
            <div className="noUserButtons">
                <div className="noUserButton">
                    <Link to="/login" className='link-main'>
                        <button>Login</button>
                    </Link>
                </div>
                <div className="noUserButton">
                    <Link to="/register" className='link-main'>
                        <button>Register</button>
                    </Link>
                </div>
            </div>
            <div className="loginText">
                Register or login to view projects
            </div>
          </div> 
        }
    </div>
  )
}

export default Projects