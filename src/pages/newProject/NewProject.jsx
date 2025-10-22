import { useState } from 'react';
import './newProject.css';
import {Add, Delete} from '@mui/icons-material';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from '../../firebase';
import { addProject } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

const NewProject = () => {
  const [inputs, setInputs] =  useState({});
  const [projectPicture, setProjectPicture] = useState(null);
  const { isFetching, error } = useSelector((state) => state.projects);
  const [buttonClicked, setButtonClicked] = useState(false);
  const userId = useSelector((state) => state.user?.currentUser._id);
  const dispatch = useDispatch();
  const [perc, setPerc] = useState(0);
  const [goalValue, setGoalValue] = useState('');
  const [goalsArray, setGoalsArray] = useState([]);
  const [scopeValue, setScopeValue] = useState('');
  const [scopeArray, setScopeArray] = useState([]);
  const [budgetValue, setBudgetValue] = useState('');
  const [budgetArray, setBudgetArray] = useState([]);
  const [challengeValue, setChallengeValue] = useState('');
  const [challengesArray, setChallengesArray] = useState([]);
  const [planValue, setPlanValue] = useState('');
  const [planArray, setPlanArray] = useState([]);
  const [resourceValue, setResourceValue] = useState('');
  const [resourcesArray, setResourcesArray] = useState([]);

  const handleInputChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev,  [e.target.name]: e.target.value };
    });
  };

  const handleAddItem = (value, setValue, array, setArray) => {
    if (value.trim() !== '') {
      setArray([...array, value]);
      setValue('');
    }
  };

  const handleDeleteItem = (itemToDelete, array, setArray) => {
    const updatedArray = array.filter((item) => item !== itemToDelete);
    setArray(updatedArray);
  };    

  const handleClick = (e) => {
      e.preventDefault();
      const fileName = new Date().getTime() + projectPicture.name;
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, projectPicture);
  
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
              setButtonClicked(true);
              const project = { ...inputs, userId: userId, img: downloadURL, goals: goalsArray, scope: scopeArray, budget: budgetArray, challenges: challengesArray, plan: planArray, resources: resourcesArray }
              addProject(project, dispatch);
          });
          }
      );
  }


  return (
    <div className="newProject_Container">
      <div className="newProject_Wrapper">
        <div className="newProject_Header">
          <h2>CREATE NEW PROJECT</h2>
        </div>

        <div className="newProject_Body">
          <div className="newProject_Left">
            <div className="newProject_Item">
              <p>Title <span>(R)</span></p>
              <input 
                type="text" 
                name='title'
                placeholder="project title"
                onChange={handleChange}
              />
            </div>
            <div className="newProject_Item newProject_Image">
              <p>Image <span>(R)</span></p>
              <input id='project-cover' type='file' accept='.jpeg, .jpg, .png' style={{ display: "none" }} onChange={(e) => setProjectPicture(e.target.files[0])} placeholder='image' />
              <label htmlFor='project-cover'>
                <div className="newProject_UploadButton">
                   <span>INSERT IMAGE {perc > 1 && Math.floor(perc) + "%"}</span>
                </div>
              </label>
            </div>
            <div className="newProject_Item">
              <p>Description <span>(R)</span></p>
              <textarea 
                defaultValue="add descripiton"
                onChange={handleChange}
                name="description"
              ></textarea>
            </div>
            <div className="newProject_Item">
              <p>Category <span>(R)</span></p>
              <input 
                type="text" 
                name="category"
                placeholder="project category"
                onChange={handleChange} 
              />
            </div>
            <div className="newProject_Item">
              <p>Problem solved</p>
              <input 
                type="text" 
                name="problem"
                placeholder="project problem" 
                onChange={handleChange}
              />
            </div>
            <div className="newProject_Item">
              <p>Owner</p>
              <input 
                type="text" 
                name='owner'
                placeholder="project owner"
                onChange={handleChange}
              />
            </div>
            <div className="newProject_Item">
              <p>Duration</p>
              <input 
                type="text" 
                name="duration"
                placeholder="project duration"
                onChange={handleChange}
              />
            </div>
            <div className="newProject_Item">
              <p>Status <span>(R)</span></p>
              <select name='status' onChange={handleChange}>
                <option value="in progress">In progress</option>
                <option value="on hold">On hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="newProject_Item">
              <p>Goals <span>(R)</span></p>
              <div className="newProject_Array">
                <input 
                  type="text" 
                  placeholder='Enter goals' 
                  value={goalValue}
                  onChange={(e) => handleInputChange(e, setGoalValue)}
                />
                <div className="newProject-ArrayButton" onClick={() => handleAddItem(goalValue, setGoalValue, goalsArray, setGoalsArray)}>
                  <Add />
                </div>
              </div>
              <div className="newProject_ArrayPoints">
                {goalsArray.map((goal) => (
                  <div className="newProject_point" key={goal}>
                    <p>{goal}</p>
                    <div className="newProject_DeleteIcon">
                      <Delete 
                        sx={{fontSize: 20}} 
                        onClick={() => handleDeleteItem(goal, goalsArray, setGoalsArray)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="newProject_Item">
              <p>Resources <span>(R)</span></p>
              <div className="newProject_Array">
                <input 
                  type="text" 
                  placeholder='Enter resources' 
                  value={resourceValue}
                  onChange={(e) => handleInputChange(e, setResourceValue)}
                />
                <div className="newProject-ArrayButton" onClick={() => handleAddItem(resourceValue, setResourceValue, resourcesArray, setResourcesArray)}>
                  <Add />
                </div>
              </div>
              <div className="newProject_ArrayPoints">
                {resourcesArray.map((resource) => (
                  <div className="newProject_point" key={resource}>
                    <p>{resource}</p>
                    <div className="newProject_DeleteIcon">
                      <Delete 
                        sx={{fontSize: 20}} 
                        onClick={() => handleDeleteItem(resource, resourcesArray, setResourcesArray)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="newProject_Item">
              <p>Budget</p>
              <div className="newProject_Array">
                <input 
                  type="text" 
                  placeholder='Enter budget' 
                  value={budgetValue}
                  onChange={(e) => handleInputChange(e, setBudgetValue)}
                />
                <div className="newProject-ArrayButton" onClick={() => handleAddItem(budgetValue, setBudgetValue, budgetArray, setBudgetArray)}>
                  <Add />
                </div>
              </div>
              <div className="newProject_ArrayPoints">
                {budgetArray.map((budget) => (
                  <div className="newProject_point" key={budget}>
                    <p>{budget}</p>
                    <div className="newProject_DeleteIcon">
                      <Delete 
                        sx={{fontSize: 20}} 
                        onClick={() => handleDeleteItem(budget, budgetArray, setBudgetArray)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="newProject_Item">
              <p>Scope</p>
              <div className="newProject_Array">
                <input 
                  type="text" 
                  placeholder='Enter scope' 
                  value={scopeValue}
                  onChange={(e) => handleInputChange(e, setScopeValue)}
                />
                <div className="newProject-ArrayButton" onClick={() => handleAddItem(scopeValue, setScopeValue, scopeArray, setScopeArray)}>
                  <Add />
                </div>
              </div>
              <div className="newProject_ArrayPoints">
                {scopeArray.map((scope) => (
                  <div className="newProject_point" key={scope}>
                    <p>{scope}</p>
                    <div className="newProject_DeleteIcon">
                      <Delete 
                        sx={{fontSize: 20}} 
                        onClick={() => handleDeleteItem(scope, scopeArray, setScopeArray)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="newProject_Item">
              <p>Plan</p>
              <div className="newProject_Array">
                <input 
                  type="text" 
                  placeholder='Enter plan' 
                  value={planValue}
                  onChange={(e) => handleInputChange(e, setPlanValue)}
                />
                <div className="newProject-ArrayButton" onClick={() => handleAddItem(planValue, setPlanValue, planArray, setPlanArray)}>
                  <Add />
                </div>
              </div>
              <div className="newProject_ArrayPoints">
                {planArray.map((plan) => (
                  <div className="newProject_point">
                    <p>{plan}</p>
                    <div className="newProject_DeleteIcon">
                      <Delete 
                        sx={{fontSize: 20}} 
                        onClick={() => handleDeleteItem(plan, planArray, setPlanArray)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="newProject_Item">
              <p>Challenges</p>
              <div className="newProject_Array">
                <input 
                  type="text" 
                  placeholder='Enter Challenges' 
                  value={challengeValue}
                  onChange={(e) => handleInputChange(e, setChallengeValue)}
                />
                <div className="newProject-ArrayButton" onClick={() => handleAddItem(challengeValue, setChallengeValue, challengesArray, setChallengesArray)}>
                  <Add />
                </div>
              </div>
              <div className="newProject_ArrayPoints">
                {challengesArray.map((challenge) => (
                  <div className="newProject_point">
                    <p>{challenge}</p>
                    <div className="newProject_DeleteIcon">
                      <Delete 
                        sx={{fontSize: 20}} 
                        onClick={() => handleDeleteItem(challenge, challengesArray, setChallengesArray)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={(perc > 0 && perc < 100) ? "newProject_UpdatingButton newProject_Create" : "newProject_Item newProject_Create"}>
              <button onClick={handleClick}>{buttonClicked && isFetching ? 'CREATING...' : 'CREATE PROJECT'}</button>
              {buttonClicked && error && <p style={{color: "red"}}>error occurred !! Try again</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProject