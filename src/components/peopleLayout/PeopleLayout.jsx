import { Link } from 'react-router-dom';
import './peopleLayout.css';
import { Category, People, TrendingUp } from '@mui/icons-material';

const PeopleLayout = ({ children }) => {

  return (
    <div className="peopleLayout">
        <div className="peopleLayout_Wrapper">
            <div className="SMALLSCREEN">
                <div className="peopleLayout_Topbar">
                    <Link to="/people" className='link-main'>
                        <div className="peopleLayout_TopbarItem">
                            <People />
                            <p>All people</p>
                        </div>
                    </Link>
                    <Link to="./people-categories" className='link-main'>
                        <div className="peopleLayout_TopbarItem">
                            <Category />
                            <p>Categories</p>
                        </div>
                    </Link>
                    <Link to="./people-categories" className='link-main'>
                        <div className="peopleLayout_TopbarItem">
                            <TrendingUp />
                            <p>Connections</p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="peopleLayout_Body">
                {children}
            </div>
        </div>
    </div>
  )
}

export default PeopleLayout