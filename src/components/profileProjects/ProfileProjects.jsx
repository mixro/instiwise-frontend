import { useState } from 'react';
import './profileProjects.css';
import { Search, Sort } from '@mui/icons-material';
import ProjectComp from '../projectComp/ProjectComp';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileProjects = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const user = useSelector((state) => state.user.currentUser);
    const userId = user?._id;
    const userProjects = useSelector((state) => state.userProjects.projects);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProjects = Array.isArray(userProjects) && userProjects.filter((project) => {
        const title = project.title.toLowerCase();

        const query = searchQuery.toLowerCase();
        return (
            title.includes(query) 
        );
    });

  return (
    <div className="profileProjects Profile_paddingTop">
        <div className="userProfile-details">
            {userProjects.length > 0
                ?
                <div className="userProfileDiv">
                    <div className="projectProfile_DivDiv">
                        <div className="projectLeft_Top">
                            <h1>YOUR PROJECT</h1>
                            <div className="projectsSearch">
                                <div className="ditsoSearch projectSearchItem">
                                    <input 
                                        type='text'
                                        placeholder='Search projects...' 
                                        value={searchQuery}
                                        onChange={handleSearchInputChange} 
                                    />
                                    <div className="Search_Icon">
                                        <Search />
                                    </div>
                                </div>
                                <div className="projectsSort_Icon">
                                    <Sort />
                                </div>
                            </div>
                        </div>
                        {searchQuery && <div className="projectsSearch_results">
                            <p><span>{filteredProjects.length}</span> Search results</p>
                        </div>}
                    </div>

                    <div className="projectsContainer_Div projectList_div">
                        {filteredProjects.length > 0 
                            ? 
                                filteredProjects.map((project) => (
                                    <ProjectComp key={project._id} project={project} currentUserId={userId} isCurrentUserProfile={true} />
                                ))
                            :
                                <div className="noProjects_Found">
                                    <p>No project found !!</p>
                                    <div className="noProjects_CreateButton">
                                        <Link to="new-project" className='link-main'>
                                            <button>CREATE PROJECT</button>
                                        </Link>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                :
                <div className="noProjects_Found">
                    <p>Your projects will appear here</p>
                    <div className="noProjects_CreateButton">
                        <Link to="new-project" className='link-main'>
                            <button>CREATE PROJECT</button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default ProfileProjects