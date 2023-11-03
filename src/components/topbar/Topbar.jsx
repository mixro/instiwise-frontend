import * as React from 'react';
import { useEffect, useState } from 'react';
import { Search, DensityMedium, Login, HowToReg, Person2, Logout } from "@mui/icons-material";
import './topbar.css'
import { Box, Divider, Drawer, ListItem, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { UserLogout } from '../../redux/apiCalls';
import { belowLiks, centerLinks, loginLiks, topbarLinks } from '../../dummyData';

const ITEM_HEIGHT = 48;

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [state, setState] = useState({ top: false, left: false, bottom: false, right: false,});
  const freeRooms = useSelector((state) => state.freeRooms.freeRooms);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const ongoingLessons = useSelector((state) => state.ongoingLessons.ongoingLessons);
  const upcomingLessons = useSelector((state) => state.upcomingLessons.upcomingLessons);
  const user = useSelector((state) => state.user.currentUser);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    UserLogout(dispatch);
  }

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
        {topbarLinks.map((link) => (
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
              {/* <div className="searchBar"> 
                  <input type="text" placeholder="Search timetables, lessons, rooms..." />
                  <div className="searchIcon">
                  <Search />  
                  </div> 
              </div> */}
              <Link className="link-top" to="/ongoinglessons">
                  <div className="navbarItem">
                    <p>Ongoing lesson <span>{ongoingLessons.length}</span></p>
                  </div>
              </Link>

              <Link className="link-top" to="/upcominglessons">
                  <div className="navbarItem navbarItem_Margin">
                    <p>Upcoming lessons <span>{upcomingLessons.length}</span></p>
                  </div>
              </Link> 

              <Link className="link-top" to="/freerooms">
                  <div className="navbarItem navbarItem_Margin">
                    <p>Free rooms <span>{freeRooms.length}</span></p>
                  </div>
              </Link>           
            </div>

            <Link to='/' style={{textDecoration: "none"}}>
              <div className="logo-small-screen">
                  <p>INSTiWISE</p>
              </div>
            </Link>

            <div className="navbarRight">
                <div className="topbar_icons">
                  <p>{currentTime}<span> | {currentDay}</span></p>
                </div>

                <div className="profile">
                    <img src={user?.img || "/assets/1.png"} onClick={handleClick} alt="PR" className="profileImg" />
                </div > 
                <Menu
                  id="long-menu"
                  MenuListProps={{
                  'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                  style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '17ch',
                  },
                  }}
                > 
                  <Link to="/profile" className='link-main'>
                      <MenuItem  onClick={handleClose}>
                          <div className="menuIconItem">
                            <Person2 sx={{fontSize: 22,}} /> Profile
                          </div>
                      </MenuItem>
                  </Link>      
                              
                  <Link to="/register" className='link-main'>
                      <MenuItem  onClick={handleClose}>
                          <div className="menuIconItem">
                            <HowToReg sx={{fontSize: 22,}} /> Register
                          </div>
                      </MenuItem>
                  </Link>

                  <Link to="/login" className='link-main'>
                      <MenuItem  onClick={handleClose}>
                          <div className="menuIconItem">
                            <Login sx={{fontSize: 22,}} /> Login
                          </div>
                      </MenuItem>
                  </Link>                  


                  {user && 
                    <MenuItem  onClick={handleLogout}>
                        <div className="menuIconItem">
                          <Logout sx={{fontSize: 22,}} /> Logout
                        </div>
                    </MenuItem>
                  }
                </Menu>
            </div>
        </div>
    </div>
  )
}

export default Navbar
