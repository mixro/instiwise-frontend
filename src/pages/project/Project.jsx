import { LazyLoadImage } from 'react-lazy-load-image-component';
import './project.css';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const ITEM_HEIGHT = 48;

const Project = () => {
    const location = useLocation();
    const paramsId = location.pathname.split("/")[2];
    const project = useSelector((state) => state.projects.projects.find((project) => project._id === paramsId));
    const [profileLoading, setProfileLoading] = useState(true);
    const user = useSelector((state) => state.user.currentUser);
    const currentUserId = user._id;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileLoad = () => {
        setProfileLoading(false);
    };

  return (
    <div className="projectPage">
        <div className="projectWrapper">
            <div className="projectLeft_Side">
                <div className="projectTitle">
                    <h1>{project.title}</h1>
                    <div className="projectTitle_Details">
                        <div className="projectStatus">
                            <p>{project.status}</p>
                        </div>
                        <div className="projectTitle_type">
                            <p>{project.category} project</p>
                        </div>
                    </div>
                </div>
                <div className="projectUser_Update">
                    <div className="projectUser_Details">
                        <div className="projectUser_Profile">
                            <Link to={currentUserId === project.userId?._id ? '/profile' : `/user-profile/${project.userId?._id}`} className='link-main'>
                                <img src={project.userId?.img || '/assets/1.png'} style={{display: profileLoading ? "none" : "block"}} onLoad={handleProfileLoad} alt='PR' />
                                <div className="noProjectProfile ProjectProfile_IMAGE" style={{display: profileLoading ? "block" : "none"}}>
                                </div>
                            </Link>
                        </div>
                        <div className="projectUser_Info">
                            <p>{project.userId?.username}</p>
                            <span>{project.userId?.course} engineer</span>
                        </div>
                    </div>

                    {currentUserId === project.userId?._id && 
                        <div className="projectUpdate_moreBUTTON">
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVert />
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
                                    width: '15ch',
                                },
                                }}
                            >
                                <Link to={`/update-project/${project._id}`} className='link-main'>
                                    <MenuItem  onClick={handleClose}>
                                        Edit
                                    </MenuItem>
                                </Link>
                                <MenuItem>
                                    Delete
                                </MenuItem>
                            </Menu>
                        </div>
                    }
                </div>
                <div className="SMALLSCREEN">
                    <div className="projectSmall_Details">
                        <h2>Details</h2>
                        <div className="projectSmall_DetailsItem">
                            <p><span>Likes:</span> {project.likes.length}</p>
                            <p><span>Created:</span> {moment(project.createdAt).fromNow()}</p>
                            <p><span>Updated:</span> {moment(project.updatedAt).fromNow()}</p>
                            <p><span>Type:</span> {project.category} project</p>
                            <p><span>Problem:</span> {project.problem}</p>
                            <p><span>Duration:</span> {project.duration}</p>
                            <p><span>Status:</span> {project.status}</p>
                            <p><span>Owner:</span> {project.owner || project.userId?.username}</p>
                            <p><span>Created by:</span> {project.userId?.username}</p>
                        </div>
                    </div>
                </div>
                <div className="projectShort_Desc">
                    <p>{project.description}</p>
                </div>
                <div className="projectImages">
                    <LazyLoadImage 
                        alt='PROJECT'
                        src={project.img || '/assets/project.jpg'} 
                        style={{display: "block"}}
                    />
                </div>
                <div className="projectDescription">
                    {project.goals.length > 0 && <h1>PROJECT GOALS</h1>}
                    <ul>
                        {project.goals.map((goal) => (
                            <li key={goal}>{goal}</li>
                        ))}
                    </ul>
                </div>
                <div className="projectDescription">
                    {project.scope.length > 0 && <h1>PROJECT SCOPE</h1>}
                    <ul>
                        {project.scope.map((scope) => (
                            <li key={scope}>{scope}</li>
                        ))}
                    </ul>
                </div>
                <div className="projectDescription">
                    {project.plan.length > 0 && <h1>PROJECT PLAN</h1>}
                    <ul>
                        {project.plan.map((plan) => (
                            <li key={plan}>{plan}</li>
                        ))}
                    </ul>
                </div>
                <div className="projectDescription">
                    {project.resources.length > 0 && <h1>RESOURCES</h1>}
                    <ul>
                        {project.resources.map((resource) => (
                            <li key={resource}>{resource}</li>
                        ))}
                    </ul>
                </div>
                <div className="projectDescription">
                    {project.budget.length > 0 && <h1>PROJECT BUDGET</h1>}
                    <ul>
                        {project.budget.map((budget) => (
                            <li key={budget}>{budget}</li>
                        ))}
                    </ul>
                </div>
                <div className="projectDescription">
                    {project.challenges.length > 0 && <h1>PROJECT CHALLENGES</h1>}
                    <ul>
                        {project.challenges.map((challenge) => (
                            <li key={challenge}>{challenge}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="projectRight_Side">
                <div className="projectRight_Details">
                    <h2>PROJECT DETAILS</h2>
                    <div className="projectDetails_Items">
                        <p><span>Likes:</span> {project.likes.length}</p>
                        <p><span>Created:</span> {moment(project.createdAt).fromNow()}</p>
                        <p><span>Updated:</span> {moment(project.updatedAt).fromNow()}</p>
                        <p><span>Type:</span> {project.category} project</p>
                        <p><span>Problem:</span> {project.problem}</p>
                        <p><span>Duration:</span> {project.duration}</p>
                        <p><span>Status:</span> {project.status}</p>
                        <p><span>Owner:</span> {project.owner || project.userId?.username}</p>
                        <p><span>Created by:</span> {project.userId?.username}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Project