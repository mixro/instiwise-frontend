import { useState } from 'react';
import './delete.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../redux/apiCalls';

const Delete = () => {
    const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
    const user = useSelector((state) => state.user.currentUser);
    const userId = user?._id;
    const { isFetching, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        const id = userId;
        deleteUser(id, dispatch);
        setDeleteButtonClicked(true);
    }
    
  return (
    <div className="deleteContainer">
        <div className="deleteWrapper">
            <div className="deleteBody">
                <p><b>CAUTION:</b> If you delete account, Your data will not be retrevied!</p>
                <div className="deleteButton">
                    <button onClick={handleDelete} >{isFetching && deleteButtonClicked ? "Deleting..." : "DELETE ACCOUNT"}</button>
                </div>
                {deleteButtonClicked && error && <p style={{color: "red"}}>error occurred while deleting, try again!!</p>}
                {deleteButtonClicked && !error && <p style={{color: "green"}}>Account deleted succesfully!!</p>}
            </div>
        </div>
    </div>
  )
}

export default Delete