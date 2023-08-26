import './editPost.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { updatePost } from '../../redux/apiCalls';

const EditPost = () => {
    const location = useLocation();
    const postId = location.pathname.split("/")[2];
    const [inputs, setInputs] =  useState({});
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.posts);
    const post = useSelector((state) => state.posts.posts.find((post) => post._id === postId));

    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev,  [e.target.name]: e.target.value };
      });
    };

    const handleUpdate = (e) => {
      e.preventDefault();
        const id = postId;
        const post = {...inputs };
        updatePost(id, dispatch, post);
    }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Post</h1>
        <Link to="/newpost" className="link-main">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
            <div className="roomImagee">
              <img src={post.img || "/assets/room-1.jpg"} alt="post" />
            </div>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src="/assets/ditso.png" alt="" className="productInfoImg" />
                  <span className="productName">{post.header}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Created:</span>
                      <span className="productInfoValue">{moment(post.createdAt).fromNow()}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Likes:</span>
                      <span className="productInfoValue">{post.likes.length}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Dislikes:</span>
                      <span className="productInfoValue">{post.dislikes.length}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Views:</span>
                      <span className="productInfoValue">{post.views.length}</span>
                  </div>
                  <div className="productInfoItemm">
                      <p>"{post.desc}"</p>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <div className="EditPostHeader">
            <h1>Edit Post</h1>
          </div>
          <div className="editPost_item">
            <p>Header</p>
            <textarea name='header' onChange={handleChange} defaultValue={post.header}></textarea>
          </div>
          <div className="editPost_item h">
            <p>Caption</p>
            <textarea name='desc' onChange={handleChange} defaultValue={post.desc}></textarea>
          </div>
          <div className="EditButton_Container">
            <div className="EditPost_Button">
              <button onClick={handleUpdate}>{isFetching ? "UPDATING..." : "UPDATE"}</button>
            </div>
          </div>
          <div className="newPost_error">
              {error && <p style={{color: "red"}}>Something went wrong!</p>}
          </div>
      </div>
    </div>
  )
}

export default EditPost