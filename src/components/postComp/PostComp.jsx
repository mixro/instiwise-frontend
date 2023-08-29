import './postComp.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { MoreVert, Share, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined, Visibility } from '@mui/icons-material';
import { addDislike, addLike, addView, deletePost } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
  
const ITEM_HEIGHT = 48;

const PostComp = ({ post }) => {
    const postId = post._id;
    const user = useSelector((state) => state.user.currentUser);
    const userId = user._id;
    const admin = user.isAdmin;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    useEffect(() => {
        addView(userId, postId, dispatch);
    }, [userId, postId,dispatch]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = (id) => {
        deletePost(id, dispatch);
    };

    const handleLike = (postId) => {
        addLike(userId, postId, dispatch);
    }

    const handleDislike = (postId) => {
        addDislike(userId, postId, dispatch);
    }

  return (
    <div className="postContainer">
        <div className="postTop">
            <div className="postUser_profile">
                <img src='/assets/profile.png' alt='PR' />
            </div>
            <div className="postUser_info">
                <div className="postUserInfo_item">
                    <p>{post.header}</p>
                    <span>{moment(post.createdAt).fromNow()}</span>
                </div>
                <div className="postOptions">
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
                        {admin && 
                        <Link to={`/post/${post._id}`} className='link-main'>
                            <MenuItem  onClick={handleClose}>
                                Edit
                            </MenuItem>
                        </Link>
                        }
                        {admin && 
                        <MenuItem  onClick={() => handleDelete(post._id)}>
                            Delete 
                        </MenuItem>
                        }
                        <MenuItem  onClick={handleClose}>
                            Share
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
        <div className="postBody">
            <div className="postCaption">
                <p>{post.desc}</p>
            </div>
            {post.img && 
                <div className="postImage">
                    <img src={post?.img} alt='POST' />
                </div>
            }
            <div className="postReactions">
                <div className="postReaction_item">
                    <Visibility sx={{fontSize: {xs: 24, sm: 26}}} />
                    <p>{post.views.length + 30} <span>Views</span></p>
                </div>
                <div className="postReaction_item">
                    {post.likes.includes(userId) ? (
                        <ThumbUp onClick={() => handleLike(post._id)} sx={{ fontSize: { xs: 24, sm: 26 } }} />
                    ) : (
                        <ThumbUpOutlined onClick={() => handleLike(post._id)} sx={{ fontSize: { xs: 24, sm: 26 } }} />
                    )}
                    <p>{post.likes.length + 20} <span>Likes</span></p>
                </div>
                <div className="postReaction_item">
                    {post.dislikes.includes(userId) ? (
                        <ThumbDown onClick={() => handleDislike(post._id)} sx={{ fontSize: { xs: 24, sm: 26 } }} />
                    ) : (
                        <ThumbDownOutlined onClick={() => handleDislike(post._id)} sx={{ fontSize: { xs: 24, sm: 26 } }} />
                    )}
                    <p>{post.dislikes.length} <span>Dislikes</span></p>
                </div>
                <div className="postReaction_item">
                    <Share sx={{fontSize: {xs: 24, sm: 26}}} />
                    <p><span>Share</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostComp