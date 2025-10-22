import './layout.css';
import * as React from 'react'
import Topbar from '../topbar/Topbar';
import Sidebar from '../sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { Home, Person, RssFeed, Handyman, People} from "@mui/icons-material";
import Footer from '../footer/Footer';

const Layout = ({children}) => {
    const [value, setValue] = React.useState("/");

    const handleChange = (newValue) => {
        setValue(newValue);
    };

  return (
    <div className='layoutContainer'>
        <div className='layoutSidebar'>
            <Sidebar />
        </div>

        <main>
            <div className='topbar'>
                <Topbar />
            </div>
            <div className='main-body'>
                {children}
            </div>

            <div className='nav-bottom-button'>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction component={Link} to="/" value="" label="Home" icon={<Home />} />                    
                        <BottomNavigationAction component={Link} to="/people" label="People" value="People" icon={<People />} />
                        <BottomNavigationAction component={Link} to="/posts" value="events" label="News" icon={<RssFeed/>} />
                        <BottomNavigationAction component={Link} to="/projects" label="Projects" value="projects" icon={<Handyman />} />
                        <BottomNavigationAction component={Link} to="/profile" value="profile" label="Profile" icon={<Person />} />
                    </BottomNavigation>
                </Paper>
            </div>

            <div className='footer'>
                <Footer />
            </div>
        </main>
    </div>
  )
}

export default Layout