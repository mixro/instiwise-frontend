import { useState } from 'react';
import ProjectComp from '../projectComp/ProjectComp';
import './projectsList.css';
import { Search, Sort } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const ProjectsList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const projects = useSelector((state) => state.projects.projects);
    const user = useSelector((state) => state.user.currentUser);
    const currentUserId = user._id;

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProjects = Array.isArray(projects) && projects.filter((project) => {
    const title = project.title.toLowerCase();

    const query = searchQuery.toLowerCase();
        return (
            title.includes(query) 
        );
    });

  return (
    <div className="projectList_Container">
        <div className="projectsBody_Left">
            <div className="projectLeft_Top">
            <h1>DISCOVER</h1>

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
            {searchQuery &&
                <div className="projectsSearch_results">
                    <p><span>{filteredProjects.length}</span> Search results</p>
                </div>
            }

            <div className="projectsContainer_Div">
                { filteredProjects.length > 0
                    ? filteredProjects
                        .slice()
                        .sort((a, b) => b.likes.length - a.likes.length)
                        .map((project) => (
                            <ProjectComp key={project._id} project={project} currentUserId={currentUserId} />
                        ))
                    : 
                    <div className="noProjects_Found">
                        <p>No project found!! </p>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default ProjectsList