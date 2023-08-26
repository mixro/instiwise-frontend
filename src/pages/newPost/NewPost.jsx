import { useState } from 'react';
import './newPost.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../redux/apiCalls';
const NewPost = () => {
    const [inputs, setInputs] =  useState({});
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.posts);
    const userId = useSelector((state) => state.user?.currentUser._id)

    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev,  [e.target.name]: e.target.value };
        });
    };
    
    const handleClick = (e) => {
        e.preventDefault();
        addPost({ ...inputs, userId }, dispatch);
    }

  return (
    <div className="newPost">
        <div className="NewPost_Wrapper">
            <div className="newPost_header">
                <h1>NEW POST</h1>
            </div>

            <div className="newPost_Body">
                <div className="postBodyTop">
                    <div className="newPost_item postBody_Item">
                        <p>Post Header</p>
                        <div className="newPost_Input_text">
                            <input type='text' name='header' onChange={handleChange} placeholder='post header' />
                        </div>
                    </div>
                    <div className="newPost_item postBody_Item">
                        <p>Post Image</p>
                        <div className="newPost_Input">
                            <input id='file' type='file' style={{ display: "none" }}  placeholder='post header' />
                            <label htmlFor='file'>
                                    <div className="inputFile">
                                        <span>SELECT IMAGE</span>
                                    </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="newPost_item">
                    <p>Post Caption</p>
                    <div className="newPost_Input">
                        <textarea name="desc" defaultValue={"Add post caption..."} onChange={handleChange}></textarea>
                    </div>
                </div>
            </div>
            <div className="newPost_Button">
                <button onClick={handleClick}>{isFetching ? "POSTING..." : "POST"}</button>
            </div>
            <div className="newPost_error">
                {error && <p style={{color: "red"}}>Something went wrong!</p>}
            </div>
        </div>
    </div>
  )
}

export default NewPost