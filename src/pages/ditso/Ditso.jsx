import PostComp from '../../components/postComp/PostComp';
import './ditso.css';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Announcement, Facebook, Instagram, Search, Sort, Twitter, WhatsApp, YouTube } from '@mui/icons-material';

const Ditso = () => {
    const posts = useSelector((state) => state.posts.posts);
    const admin = useSelector((state) => state.user.currentUser?.isAdmin);
    const user = useSelector((state) => state.user.currentUser);
    
  return (
    <div className="ditsoOver_Container">
            <div className="ditsoContainer">
                <div className="Above">
                    <div className="ditsoProfile">
                        <div className="ditsoBackground">
                            <img src='/assets/cover.jpeg' alt='BACKGROUND PROFILE' />
                        </div>
                    </div>
                    <div className="ditsoTop">
                        <div className="ditsoImage">
                            <img src='/assets/profile.png' alt='DITSO LOGO' />
                        </div>
                        <div className="ditsoName">
                            <h1>DT STUDENTS ORGANIZATION</h1>
                            <div className="socialIcons">
                                <div className="socialIcons_item">
                                    <Facebook sx={{ fontSize: 24 }} />
                                </div>
                                <div className="socialIcons_item">
                                    <Instagram sx={{ fontSize: 24}} />
                                </div>
                                <div className="socialIcons_item">
                                    <WhatsApp sx={{ fontSize: 24}} />
                                </div>
                                <div className="socialIcons_item">
                                    <YouTube sx={{ fontSize: 24}} />
                                </div>
                                <div className="socialIcons_item">
                                    <Twitter sx={{ fontSize: 24}} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ditsoDesc_Container">
                        <div className="ditsoDesc">
                            <p className='BOLD'>DT Students Organization</p>
                            <p className='smallWidth'>The DIT student organization fosters student engagement, enhancing academic and social experiences through events, leadership development, and community building.</p>
                            <div className="socialIcons_Small SMALLSCREEN">
                                <div className="socialIcons_item">
                                    <Facebook sx={{ fontSize: 24 }} />
                                </div>
                                <div className="socialIcons_item">
                                    <Instagram sx={{ fontSize: 24}} />
                                </div>
                                <div className="socialIcons_item">
                                    <WhatsApp sx={{ fontSize: 24}} />
                                </div>
                                <div className="socialIcons_item">
                                    <YouTube sx={{ fontSize: 24}} />
                                </div>
                                <div className="socialIcons_item">
                                    <Twitter sx={{ fontSize: 24}} />
                                </div>
                            </div>       
                            <div className="ditsoButtons_Container">
                                <div className="ditsoDesc_buttons">
                                    <p>LEADERSHIP</p>
                                </div>                
                                <div className="ditsoDesc_buttons">
                                    <p>DIT WEBSITE</p>
                                </div>  
                                <div className="ditsoDesc_buttons">
                                    <p>PROSPECTUS</p>
                                </div>  
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
                </div>
                <div className="ditsoWrapper">
                    <div className="ditsoLeft">
                        <div className="ditsoPost">
                            <div className="ditsoPost_top">
                                <div className="ditsoPostHeader">
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
                                <div className="postSearch_Bar SMALLSCREEN">
                                    <div className="postSearchBar">
                                        <input type='text' placeholder='Search post...' />
                                        <div className="searchBar_Icon">
                                            <Search />
                                        </div>
                                    </div>
                                    <div className="postSearchSort_Icon">
                                        <Sort sx={{fontSize: 27}} />
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
    </div>
  )
}

export default Ditso