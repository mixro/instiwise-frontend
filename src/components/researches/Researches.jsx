import { CompletedResearches, OngoingResearches } from '../../dummyData';
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
                    {OngoingResearches.map((research) => (
                        <div className="problemsItem">
                            <h2><span>{research.id}.</span>{research.research}</h2>
                            <p>{research.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="problemsDiv_Item">
                <div className="problemsHeader">
                    <h1>COMPLETED RESEARCHES</h1>
                </div>
                <div className="problemsItems_Container">
                    {CompletedResearches.map((research) => (
                        <div className="problemsItem">
                            <h2><span>{research.id}.</span>{research.research}</h2>
                            <p>{research.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Researches