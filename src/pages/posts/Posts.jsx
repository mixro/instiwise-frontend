import { Link } from 'react-router-dom';
import './posts.css';
import { Announcement, Search, Sort } from '@mui/icons-material'
import PostComp from '../../components/postComp/PostComp';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Posts = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const posts = useSelector((state) => state.posts.posts);
    const user = useSelector((state) => state.user.currentUser);
    const admin = useSelector((state) => state.user.currentUser?.isAdmin);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPosts = Array.isArray(posts) && posts.filter((post) => {
        const header = post.header.toLowerCase();
        const query = searchQuery.toLowerCase();

        return (
            header.includes(query)
        );
    })

  return (
    <div className='postMainContainer'>
        <div className="SearchTopSmall_Padding SMALLSCREEN">
            <div className="postSearch_Bar">
                <div className="postSearchBar">
                    <input type='text' value={searchQuery} onChange={handleSearchInputChange} placeholder='Search post...' />
                    <div className="searchBar_Icon">
                        <Search />
                    </div>
                </div>
                <div className="postSearchSort_Icon">
                    <Sort sx={{fontSize: 27}} />
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
            {searchQuery && 
                <div className="PostsSearch_result">
                    <p><span>{filteredPosts.length}</span> Search results</p>
                </div>
            }
        </div>
        <div className="ditsoWrapper postMainWrapper">
            <div className="ditsoLeft">
                <div className="ditsoPost postMain_Ditso">
                    <div className="SearchTop_Padding LARGESCREEN">
                        <div className="ditsoPost_top">
                            <div className="ditsoPostHeader postMainHeader">
                                <h1>POSTS</h1>
                            </div>
                            <div className="ditsoPost_search LARGESCREEN">
                                <div className="ditsoSearch">
                                    <input type='text' value={searchQuery} onChange={handleSearchInputChange} placeholder='Search post...' />
                                    <div className="Search_Icon">
                                        <Search />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {searchQuery && 
                            <div className="PostsSearch_result largeFont_results">
                                <p><span>{filteredPosts.length}</span> Search results</p>
                            </div>
                        }
                    </div>
                {user ?
                    filteredPosts
                        .slice() 
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                        .map((post) => (
                        <PostComp key={post._id} post={post} />
                    ))
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