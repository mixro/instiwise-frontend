import { useState } from 'react';
import ProjectComp from '../projectComp/ProjectComp';
import './projectsList.css';
import { Search, Sort } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ITEM_HEIGHT = 48;

const ProjectsList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [sortedProjects, setSortedProjects] = useState([]);
    const projects = useSelector((state) => state.projects.projects);
    const user = useSelector((state) => state.user.currentUser);
    const currentUserId = user._id;

    useEffect(() => {
        if (projects) {
            const sortedData = [...projects].sort((a, b) => b.likes.length - a.likes.length);
            setSortedProjects(sortedData);
        }
    }, [projects]);

    const filteredProjects = Array.isArray(projects) && projects.filter((project) => {
    const title = project.title.toLowerCase();

    const query = searchQuery.toLowerCase();
        return (
            title.includes(query) 
        );
    });

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleSort = (value) => {
        handleClose();
      
        // Sort the filteredPeople based on the selected sorting criterion
        let sortedData = [...filteredProjects]; // Create a copy of the filteredPeople array
      
        if (value === "newest") {
          sortedData = sortedData.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        } else if (value === "popular") {
          sortedData = sortedData.sort((a, b) => b.likes.length - a.likes.length);
        } else if (value === "oldest") {
            sortedData = sortedData.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        }
      
        setSortedProjects(sortedData);
    };      


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
                    <div className="projectsSort_Icon sortIcon_Button">
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <Sort />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '17ch',
                            },
                            }}
                        > 
                            <MenuItem onClick={() => handleSort("newest")}>
                                New projects
                            </MenuItem>
                            <MenuItem onClick={() => handleSort("popular")}>
                                Popular projects
                            </MenuItem>
                            <MenuItem  onClick={() => handleSort("oldest")}>
                                Past projects
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className="createProject_BUTTON">
                        <Link to="/new-project" className="link-main">
                            <button>CREATE</button>
                        </Link>
                    </div>
                </div>
            </div>
            {searchQuery &&
                <div className="projectsSearch_results">
                    <p><span>{filteredProjects.length}</span> Search results</p>
                </div>
            }
            
            <div className="SMALLSCREEN">
                <div className="postCreate_Button">
                    <div className="createButton">
                        <Link to="/new-project" className="link-main">
                            <button>CREATE PROJECT</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="projectsContainer_Div">
                { sortedProjects.length > 0
                    ? sortedProjects
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