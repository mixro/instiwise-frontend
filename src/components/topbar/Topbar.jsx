import * as React from 'react';
import { useEffect, useState } from 'react';
import { Home, MeetingRoom, Search, ChairAlt, DensityMedium, Book, Groups2Sharp, PlayLesson, ArrowCircleUpSharp, Person, Login, HowToReg, Today, AdminPanelSettings} from "@mui/icons-material";
import './topbar.css'
import { Box, Divider, Drawer, ListItem, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


const Navbar = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [state, setState] = useState({ top: false, left: false, bottom: false, right: false,});
  const freeRooms = useSelector((state) => state.freeRooms.freeRooms);
  const ongoingLessons = useSelector((state) => state.ongoingLessons.ongoingLessons);

  useEffect(() => {
    const getCurrentInfo = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      const day = now.toLocaleDateString(undefined, { weekday: 'short' }); // Use 'short' option for abbreviated day name
    
      setCurrentTime(time);
      setCurrentDay(day);
    };   

    const interval = setInterval(getCurrentInfo, 1000);
    getCurrentInfo();

    return () => clearInterval(interval);
  }, []);
  

  const links = [
    {
      id:1,
      icon:<Home />,
      text:"Home",
      location:"/",
    },
    
    {
      id:2,
      icon:<Book />,
      text:"Lessons",
      location:"/lessons",
    },

    {
      id:3,
      icon:<MeetingRoom />,
      text:"Rooms",
      location:"/rooms",
    },

    {
      id:4,
      icon:<Groups2Sharp />,
      text:"Courses",
      location:"/courses",
    },
  ];

  const centerLinks = [
    {
      id:1,
      icon:<ChairAlt />,
      text:"Free Rooms",
      location:"/freerooms",
    },

    {
      id:2,
      icon:<MeetingRoom />,
      text:"Rooms in use",
      location:"/roomsinuse",
    },

    {
      id:3,
      icon:<PlayLesson />,
      text:"Ongoing Lessons",
      location:"/ongoinglessons",
    },

    {
      id:4,
      icon:<ArrowCircleUpSharp />,
      text:"Upcoming Lessons",
      location:"/upcominglessons",
    },

    {
      id:5,
      icon:<Today />,
      text:"Today's Lessons",
      location:"/todayslessons",
    }
  ]

  const belowLiks = [
    {
      id:1,
      icon:<Person />,
      text:"Profile",
      location:"/profile",
    }
  ]

  const loginLiks = [
    {
      id:1,
      icon:<HowToReg />,
      text:"Register",
      location:"/register",
    },

    {
      id:2,
      icon:<Login />,
      text:"Login",
      location:"/login",
    },

    {
      id:3,
      icon:<AdminPanelSettings />,
      text:"Ditso",
      location:"/ditso",
    }
  ]

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="sidebar_logo">
        <div className="sidebar_logo_desc">
          <p>INSTiWISE</p>
        </div>
      </div>

      <Divider />

      <List>
        {links.map((link) => (
          <ListItem key={link.id}  disablePadding>
            <Link to={`${link.location}`} className='link-gray'>
              <ListItemButton >
                <ListItemIcon>
                  {link.icon}
                </ListItemIcon>
                <ListItemText sx={{fontSize: 14,}}>{link.text}</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {centerLinks.map((link) => (
          <ListItem key={link.id} disablePadding>
            <Link to={`${link.location}`} className='link-gray'>
              <ListItemButton >
                <ListItemIcon>
                  {link.icon}
                </ListItemIcon>
                <ListItemText sx={{fontSize: 14,}}>{link.text}</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {belowLiks.map((link) => (
          <ListItem key={link.id} disablePadding>
            <Link to={`${link.location}`} className='link-gray'>
              <ListItemButton >
                <ListItemIcon>
                  {link.icon}
                </ListItemIcon>
                <ListItemText sx={{fontSize: 14,}}>{link.text}</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {loginLiks.map((link) => (
          <ListItem key={link.id} disablePadding>
            <Link to={`${link.location}`} className='link-gray'>
              <ListItemButton >
                <ListItemIcon>
                  {link.icon}
                </ListItemIcon>
                <ListItemText sx={{fontSize: 14,}}>{link.text}</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="navbarComponent">
        <div className="wrapper">
            <div className="navbarLeft">
              <div className="nav-button-small-screen">
                {['left'].map((anchor) => (
                  <React.Fragment key={anchor}>
                      <DensityMedium sx={{fontSize: 27,}} onClick={toggleDrawer(anchor, true)} />   
                      <Drawer
                          anchor={anchor}
                          open={state[anchor]}
                          onClose={toggleDrawer(anchor, false)}
                      >
                        {list(anchor)}
                      </Drawer>
                  </React.Fragment>
                ))}   
              </div> 
              <div className="searchBar"> 
                  <input type="text" placeholder="Search timetables, lessons, rooms..." />
                  <div className="searchIcon">
                  <Search />  
                  </div> 
              </div>
              <Link className="link-top" to="/ongoinglessons">
                  <div className="navbarItem">
                    <p>ongoing lesson <span>{ongoingLessons.length}</span></p>
                  </div>
              </Link>

              <Link className="link-top" to="/freerooms">
                  <div className="navbarItem">
                    <p>free rooms <span>{freeRooms.length}</span></p>
                  </div>
              </Link>           
            </div>

            <Link to='/' style={{textDecoration: "none"}}>
              <div className="logo-small-screen">
                  {/* <img src="/assets/small-logo.png" /> */}
                  <p>INSTiWISE</p>
              </div>
            </Link>

            <div className="navbarRight">
                <div className="topbar_icons">
                  <p>{currentTime}<span> | {currentDay}</span></p>
                </div>

                <Link to='/profile'className='profile_link'>
                    <div className="profile">
                        <img src="/assets/1.png" alt="PR" className="profileImg" />
                    </div >
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
