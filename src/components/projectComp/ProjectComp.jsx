import { LazyLoadImage } from 'react-lazy-load-image-component';
import './projectComp.css';
import { useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AddlikeForSearchedUserProject, AddlikeForUserProject, addlikeForProject, deleteProject } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import moment from 'moment';

const ITEM_HEIGHT = 48;

const ProjectComp = ({project, currentUserId, isCurrentUserProfile, isSearchedUserProfile }) => {
    const [profileLoading, setProfileLoading] = useState(true);
    const dispatch = useDispatch();
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

    const handleLike = (projectId) => {
        addlikeForProject(currentUserId, projectId, dispatch);
    }

    const handleLikeProject = (projectId) => {
        AddlikeForUserProject(currentUserId, projectId, dispatch);
        handleClose();
    }

    const handleLikeUserProject = (projectId) => {
        AddlikeForSearchedUserProject(currentUserId, projectId, dispatch);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const id = project._id;
        deleteProject(id, dispatch);
        handleClose();
    };
    
  return (
    <div className={!isCurrentUserProfile && !isSearchedUserProfile ? "projectComp_Wrapper projectComp_WrapperForPRojects" : "projectComp_Wrapper"}>
        <div className="projectComp_Image">
            <Link to={`/project/${project?._id}`} className='link-main'>
                <LazyLoadImage 
                    alt='PROJECT'
                    src={project?.img || '/assets/project.jpg'} 
                    style={{display: "block"}}
                />
            </Link>
        </div>
        <div className="projectComp_Desc">
            <div className="projectCompDesc_top">
                <div className="projectComp_Profile">
                    <Link to={currentUserId === project.userId?._id ? '/profile' : `/user-profile/${project.userId?._id}`} className='link-main'>
                        <img src={project.userId?.img || '/assets/1.png'} style={{display: profileLoading ? "none" : "block"}} onLoad={handleProfileLoad} alt='PR' />
                        <div className="noProfileComp" style={{display: profileLoading ? "block" : "none"}}>
                        </div>
                    </Link>
                </div>
                <div className="projectComp_userInfo">
                    <div className="projectUserInfo_item">
                        <p>{project.userId?.username || "unspecified"}</p>
                        <div className="projectUserInfo_Details">
                            <div className="projectUserInfo_DetailsItem projectBorderRigth">
                                <p><span>{project.likes.length}</span> likes</p>
                            </div>
                            <div className="projectUserInfo_DetailsItem">
                                <p>{moment(project.createdAt).fromNow()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="projectLikeIcons">
                        {currentUserId !== project.userId?._id 
                        ? 
                            project.likes.includes(currentUserId) 
                            ? ( <Favorite onClick={() => {isSearchedUserProfile ? handleLikeUserProject(project._id) : handleLike(project._id)}} sx={{ fontSize: { xs: 29, sm: 36 } }} />) 
                            : ( <FavoriteBorder onClick={() => {isSearchedUserProfile ? handleLikeUserProject(project._id) : handleLike(project._id)}} sx={{ fontSize: { xs: 29, sm: 36 } }} />)
                        :
                            <div className="projectMoreButton">
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
                                    <MenuItem  onClick={() => {isCurrentUserProfile ? handleLikeProject(project._id) : handleLike(project._id)}}>
                                        {project.likes.includes(currentUserId) ? "Dislike" : "Like"}
                                    </MenuItem>
                                    <Link to={`/update-project/${project._id}`} className='link-main'>
                                        <MenuItem  onClick={handleClose}>
                                            Edit
                                        </MenuItem>
                                    </Link>
                                    <MenuItem onClick={handleDelete}>
                                        Delete
                                    </MenuItem>
                                </Menu>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="projectComp_Header">
                <h1>{project.title}</h1>
            </div>
        </div>
    </div>
  )
}

export default ProjectComp