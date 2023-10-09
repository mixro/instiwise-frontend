import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Search, Sort } from '@mui/icons-material';
import ProjectComp from '../projectComp/ProjectComp';

const SearchedUserProjects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserId = currentUser._id;
  const searchedUserProjects = useSelector((state) => state.searchedUserProjects.projects);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProjects = Array.isArray(searchedUserProjects) && searchedUserProjects.filter((project) => {
    const title = project.title.toLowerCase();

    const query = searchQuery.toLowerCase();
    return (
        title.includes(query) 
    );
  });

  return (
    <div className="profileProjects Profile_paddingTop">
        <div className="userProfile-details">
            {searchedUserProjects.length > 0
                ?
                <div className="userProfileDiv">
                    <div className="projectProfile_DivDiv">
                        <div className="projectLeft_Top">
                            <h1>PROJECTS</h1>
                            <div className="projectsSearch">
                                <div className="ditsoSearch projectSearchItem">
                                    <input 
                                        type='text'
                                        placeholder='Search projects...' 
                                        value={searchQuery}
                                        onChange={handleSearchInputChange} 
                                    />
                                    <div className="Search_Icon">
                                        <Search />
                                    </div>
                                </div>
                                <div className="projectsSort_Icon">
                                    <Sort />
                                </div>
                            </div>
                        </div>
                        {searchQuery && <div className="projectsSearch_results">
                            <p><span>{filteredProjects.length}</span> Search results</p>
                        </div>}
                    </div>

                    <div className="projectsContainer_Div projectList_div">
                        {filteredProjects.length > 0 
                            ? 
                                filteredProjects.map((project) => (
                                  <ProjectComp key={project._id} project={project} currentUserId={currentUserId} isSearchedUserProfile={true} />
                                ))
                            :
                                <div className="noProjects_Found">
                                    <p>No results found !!</p>
                                </div>
                        }
                    </div>
                </div>
                :
                <div className="noProjects_Found">
                    <p>This user doesnt't have projects !!</p>
                </div>
            }
        </div>
    </div>
  )
}

export default SearchedUserProjects