import { useState } from 'react';
import './newPost.css';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addPost } from '../../redux/apiCalls';
import firebaseApp from '../../firebase';


const NewPost = () => {
    const [inputs, setInputs] =  useState({});
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const [perc, setPerc] = useState(0);
    const { isFetching, error } = useSelector((state) => state.posts);
    const userId = useSelector((state) => state.user?.currentUser._id)

    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev,  [e.target.name]: e.target.value };
        });
    };
    
    const handleClick = (e) => {
        e.preventDefault();
        if(file !== null) {
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
        
            uploadTask.on('state_changed', 
                (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setPerc(progress);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                    break;
                    case 'running':
                        console.log('Upload is running');
                    break;
                    default:
                        console.log("Upload is in progress");
                }
                }, 
                (error) => {
                }, 
                () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const post = {...inputs, img: downloadURL, userId};
                    addPost(post, dispatch);
                });
                }
            );
        } else {
            const post = {...inputs, userId};
            addPost(post, dispatch);
        }
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
                            <input id='file' type='file' onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }}  placeholder='post header' />
                            <label htmlFor='file'>
                                <div className="inputFile">
                                    <span>SELECT IMAGE {perc > 1 && Math.floor(perc) + "%"}</span>
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