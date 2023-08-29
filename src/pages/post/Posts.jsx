import { Link } from 'react-router-dom';
import './posts.css';
import { Announcement, Search, Sort } from '@mui/icons-material'
import PostComp from '../../components/postComp/PostComp';
import { useSelector } from 'react-redux';

const Posts = () => {
    const posts = useSelector((state) => state.posts.posts);
    const user = useSelector((state) => state.user.currentUser);
    const admin = useSelector((state) => state.user.currentUser?.isAdmin);


  return (
    <div className='postMainContainer'>
        <div className="SMALLSCREEN">
            <div className="postSearch_Bar">
                <div className="postSearchBar">
                    <input type='text' placeholder='Search post...' />
                    <div className="searchBar_Icon">
                        <Search />
                    </div>
                </div>
                <div className="postSearchSort_Icon">
                    <Sort sx={{fontSize: 25}} />
                </div>
            </div>
            {admin && 
                <div className="postCreate_Button">
                    <div className="createButton">
                        <Link to="/newpost" className="link-main">
                            <button>CREATE POST</button>
                        </Link>
                    </div>
                </div>
            }
        </div>
        <div className="ditsoWrapper postMainWrapper">
            <div className="ditsoLeft">
                <div className="ditsoPost postMain_Ditso">
                    <div className="ditsoPost_top">
                        <div className="ditsoPostHeader postMainHeader">
                            <h1>DTSO POSTS</h1>
                        </div>
                        <div className="ditsoPost_search LARGESCREEN">
                            <div className="ditsoSearch">
                                <input type='text' placeholder='Search post...' />
                                <div className="Search_Icon">
                                    <Search />
                                </div>
                            </div>
                        </div>
                    </div>
                {user ?
                    posts
                        .slice() 
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                        .map((post) => (
                        <PostComp key={post._id} post={post} />
                    ))
                :
                    <div className="noUser noPost">
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
                            Register or Login to view posts.
                        </div>
                    </div>
                }
                </div>
            </div>                                         
            <div className="ditsoRight">
                <div className="ditsoRight_top">
                    <h1>Pinned Announcements </h1>
                    <Announcement />
                </div>
                <div className="announcement">
                    <div className="announcement_item">
                        <p>This is students orgaziton at Dar es salaam Institute toiortioirtioio roitirtoi of technology</p>
                    </div>
                </div>
                <div className="announcement">
                    <div className="announcement_item">
                        <p>This is students orgaziton at Dar es salaam Institute toiortioirtioio roitirtoi of technology</p>
                    </div>
                </div>
                <div className="announcement">
                    <div className="announcement_item">
                        <p>This is students orgaziton at Dar es salaam Institute toiortioirtioio roitirtoi of technology</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Posts