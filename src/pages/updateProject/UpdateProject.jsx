import { useState } from 'react';
import './updateProject.css';
import {Add, Delete} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProject } from '../../redux/apiCalls';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebaseApp from '../../firebase';

const UpdateProject = () => {
  const location = useLocation();
  const paramsId = location.pathname.split("/")[2];
  const projects = [
    ...useSelector((state) => state.projects.projects),
    ...useSelector((state) => state.userProjects.projects),
  ];
  const project = projects.find((project) => project._id === paramsId);
  const id = paramsId;
  const dispatch = useDispatch();
  const [inputs, setInputs] =  useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const { isFetching, error } = useSelector((state) => state.projects);
  const [perc, setPerc] = useState(0);
  const [projectPicture, setProjectPicture] = useState(null);
  const [goalValue, setGoalValue] = useState('');
  const [goalsArray, setGoalsArray] = useState(project.goals || []);
  const [scopeValue, setScopeValue] = useState('');
  const [scopeArray, setScopeArray] = useState(project.scope || []);
  const [budgetValue, setBudgetValue] = useState('');
  const [budgetArray, setBudgetArray] = useState(project.budget || []);
  const [challengeValue, setChallengeValue] = useState('');
  const [challengesArray, setChallengesArray] = useState(project.challenges || []);
  const [planValue, setPlanValue] = useState('');
  const [planArray, setPlanArray] = useState(project.plan || []);
  const [resourceValue, setResourceValue] = useState('');
  const [resourcesArray, setResourcesArray] = useState(project.resources || []);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev,  [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (projectPicture !== null ) {
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
              const project = { ...inputs, img: downloadURL, goals: goalsArray, scope: scopeArray, budget: budgetArray, challenges: challengesArray, plan: planArray, resources: resourcesArray }
              updateProject(id, dispatch, project);
          });
          }
      );
    } else {
      setButtonClicked(true);
      const project = { ...inputs, goals: goalsArray, scope: scopeArray, budget: budgetArray, challenges: challengesArray, plan: planArray, resources: resourcesArray }
      updateProject(id, dispatch, project);
    }
  } 

  const handleInputChange = (e, setValue) => {
    setValue(e.target.value);
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


  return (
    <div className="newProject_Container">
      <div className="newProject_Wrapper">
        <div className="newProject_Header">
          <h2>UPDATE PROJECT</h2>
        </div>

        <div className="newProject_Body">
          <div className="newProject_Left">
            <div className="newProject_Item">
              <p>Title <span>(R)</span></p>
              <input 
                type="text" 
                name='title'
                placeholder={project.title}
                onChange={handleChange}
              />
            </div>
            <div className="newProject_Item newProject_Image">
              <p>Image <span>(R)</span></p>
              <input id='project-picture' type='file' accept='.jpeg, .jpg, .png' onChange={(e) => setProjectPicture(e.target.files[0])} style={{ display: "none" }}  placeholder='image' />
              <label htmlFor='project-picture'>
                <div className="newProject_UploadButton">
                   <span>UPLOAD IMAGE {perc > 1 && Math.floor(perc) + "%"}</span>
                </div>
              </label>
            </div>
            <div className="newProject_Item">
              <p>Description <span>(R)</span></p>
              <textarea 
                defaultValue={project.description}
                onChange={handleChange}
                name="description"
              ></textarea>
            </div>
            <div className="newProject_Item">
              <p>Category <span>(R)</span></p>
              <input 
                type="text" 
                name="category"
                placeholder={project.category}
                onChange={handleChange}
              />
            </div>
            <div className="newProject_Item">
              <p>Problem solved</p>
              <input 
                type="text" 
                name="problem"
                placeholder={project.problem} 
                onChange={handleChange}
              />
            </div>
            <div className="newProject_Item">
              <p>Owner</p>
              <input 
                type="text" 
                name='owner'
                placeholder={project.owner} 
                onChange={handleChange}
              />
            </div>
            <div className="newProject_Item">
              <p>Duration</p>
              <input 
                type="text" 
                name="duration"
                placeholder={project.duration}
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
            <div className="newProject_Item newProject_Create">
              <button onClick={handleUpdate}>{isFetching && buttonClicked ? "UPDATING..." : "UPDATE PROJECT"}</button>
              {buttonClicked && error && <p style={{color: "red"}}>error occurred !! Try again</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProject