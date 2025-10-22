import { EngineeringTechnologies, SocietalProblems } from '../../dummyData';
import './problems.css';

const Problems = () => {
  return (
    <div className="problemsContainer">
        <div className="problemsWrapper">
            <div className="problemsDiv_Item">
                <div className="problemsHeader">
                    <h1>SOCIETAL PROBLEMS</h1>
                </div>
                <div className="problemsItems_Container">
                    {SocietalProblems.map((problem) => (
                        <div className="problemsItem">
                            <h2><span>{problem.id}.</span>{problem.issue}</h2>
                            <p>{problem.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="problemsDiv_Item">
                <div className="problemsHeader">
                    <h1>TRENDING TECHNOLOGIES</h1>
                </div>
                <div className="problemsItems_Container">
                    {EngineeringTechnologies.map((technology) => (
                        <div className="problemsItem">
                            <h2><span>{technology.id}.</span>{technology.technology}</h2>
                            <p>{technology.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Problems