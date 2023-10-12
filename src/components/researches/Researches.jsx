import { SocietalProblems } from '../../dummyData';
import './researches.css';

const Researches = () => {
  return (
    <div className="researchesContainer">
        <div className="problemsWrapper">
            <div className="problemsDiv_Item">
                <div className="problemsHeader">
                    <h1>ONGOING RESEARCHES</h1>
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
                    <h1>COMPLETED RESEARCHES</h1>
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
        </div>
    </div>
  )
}

export default Researches