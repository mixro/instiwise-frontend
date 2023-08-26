import './postComp.css';
import moment from 'moment';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { MoreVert, Share, ThumbDown, ThumbUp, Visibility } from '@mui/icons-material';
import { deletePost } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
  
const ITEM_HEIGHT = 48;

const PostComp = ({ post }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = (id) => {
        deletePost(id, dispatch);
    };

  return (
    <div className="postContainer">
        <div className="postTop">
            <div className="postUser_profile">
                <img src='/assets/ditso.png' alt='PR' />
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
                        <Link to={`/post/${post._id}`} className='link-main'>
                            <MenuItem  onClick={handleClose}>
                                Edit
                            </MenuItem>
                        </Link>
                        <MenuItem  onClick={() => handleDelete(post._id)}>
                            Delete 
                        </MenuItem>
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
                    <Visibility sx={{fontSize: 26}} />
                    <p>{post.views.length} <span>Views</span></p>
                </div>
                <div className="postReaction_item">
                    <ThumbUp sx={{fontSize: 26}} />
                    <p>{post.likes.length} <span>Likes</span></p>
                </div>
                <div className="postReaction_item">
                    <ThumbDown sx={{fontSize: 26}} />
                    <p>{post.dislikes.length} <span>Dislikes</span></p>
                </div>
                <div className="postReaction_item">
                    <Share sx={{fontSize: 26}} />
                    <p><span>Share</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostComp