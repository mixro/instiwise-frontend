import { Home, MeetingRoom, ChairAlt, Book, Groups2Sharp, PlayLesson, ArrowCircleUpSharp, Person, Login, HowToReg, Today, AdminPanelSettings, RssFeed, Handyman, People} from "@mui/icons-material";

export const AnnouncementData = [
    {
        id: 1,
        header: "Upcoming Event",
        desc: "📅 Don't miss our upcoming event on Friday at 6 PM in the main auditorium. It's going to be an evening filled with fun, games, and insightful discussions. See you there!"
    },
    {
        id: 2,
        header: "Volunteer Opportunity",
        desc: "🤝 Looking for ways to give back to the community? Join our volunteer team for the local charity drive this weekend. Let's make a positive impact together!"
    },
    {
        id: 3,
        header: "Club Meeting",
        desc: "📢 Calling all club members! Our next club meeting is scheduled for Wednesday at 4 PM in Room 202. We have exciting plans to discuss, so mark your calendars and be there!"
    },
]


export const Ideas = [
    {
        id: 1,
        header: "Renewable Energy Microgrid",
        description: "Design and build a microgrid that integrates solar panels, wind turbines, and energy storage to provide a sustainable and resilient energy source for communities."
    },
    {
        id: 2,
        header: "Smart City Traffic Management",
        description: "Develop an intelligent traffic management system using IoT sensors and AI algorithms to reduce congestion, improve traffic flow, and enhance urban mobility."
    },
    {
        id: 3,
        header: "Drone-Based Environmental Monitoring",
        description: "Create a fleet of drones equipped with sensors for monitoring air quality, detecting forest fires, and assessing environmental conditions in remote areas."
    },
    {
        id: 4,
        header: "Biomedical Wearable Devices",
        description: "Design wearable health monitoring devices that can track vital signs, detect anomalies, and transmit data to healthcare providers for real-time health management."
    },
    {
        id: 5,
        header: "Autonomous Agricultural Robots",
        description: "Build autonomous robots capable of planting, harvesting, and monitoring crops, increasing efficiency and sustainability in agriculture."
    }   
]

export const SocietalProblems = [
    {
        id: 1,
        issue: "Clean Water Access",
        description: "Develop cost-effective and sustainable methods for providing clean and safe drinking water to underserved communities."
    },
    {
        id: 2,
        issue: "Renewable Energy for Rural Areas",
        description: "Create affordable renewable energy solutions tailored to the unique needs of rural and off-grid communities."
    },
    {
        id: 3,
        issue: "Waste Management and Recycling",
        description: "Design systems and technologies to efficiently manage waste, reduce landfill usage, and promote recycling in urban areas."
    },
    {
        id: 4,
        issue: "Affordable Housing Solutions",
        description: "Invent innovative construction techniques and materials to make housing more affordable and accessible for low-income populations."
    },
    {
        id: 5,
        issue: "Education Accessibility",
        description: "Develop online learning platforms and resources to bridge the education gap and provide quality education to remote and disadvantaged students."
    },
    {
        id: 6,
        issue: "Medical Device Accessibility",
        description: "Create low-cost, easily accessible medical devices and technologies to improve healthcare access in developing regions."
    },
    {
        id: 7,
        issue: "Food Security",
        description: "Innovate in agriculture and food production to ensure a stable food supply, reduce food waste, and improve nutrition worldwide."
    },
    {
        id: 8,
        issue: "Disaster Resilience",
        description: "Develop disaster-resistant infrastructure and early warning systems to mitigate the impact of natural disasters and protect vulnerable populations."
    },
    {
        id: 9,
        issue: "Environmental Conservation",
        description: "Design solutions for conserving and restoring ecosystems, reducing pollution, and combating climate change."
    },
    {
        id: 10,
        issue: "Access to Healthcare",
        description: "Create telemedicine technologies and healthcare infrastructure to improve healthcare access in remote and underserved areas."
    }
]


export const UsersData = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        connections: 128,
    },
    {
        id: 2,
        firstName: "Alice",
        lastName: "Smith",
        connections: 98,
    },
    {
        id: 3,
        firstName: "Bob",
        lastName: "Johnson",
        connections: 75,
    },
    {
        id: 4,
        firstName: "Emily",
        lastName: "Brown",
        connections: 62,
    },
    {
        id: 5,
        firstName: "Michael",
        lastName: "Wilson",
        connections: 145,
    },
    {
        id: 6,
        firstName: "Sarah",
        lastName: "Davis",
        connections: 112,
    },
    {
        id: 7,
        firstName: "Daniel",
        lastName: "Lee",
        connections: 87,
    },
    {
        id: 8,
        firstName: "Olivia",
        lastName: "Martinez",
        connections: 53,
    },
    {
        id: 9,
        firstName: "William",
        lastName: "Moore",
        connections: 71,
    },
    {
        id: 10,
        firstName: "Sophia",
        lastName: "Anderson",
        connections: 120,
    },
];




    /*----------------- topabr item --------------*/
export const topbarLinks = [
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

    {
        id:5,
        icon:<RssFeed />,
        text:"News",
        location:"/posts",
    },

    {
        id:6,
        icon:<Handyman />,
        text:"Projects",
        location:"/projects",
    },

    {
        id:7,
        icon:<People />,
        text:"People",
        location:"/people",
    },
];


export const centerLinks = [
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

export const belowLiks = [
    {
      id:1,
      icon:<Person />,
      text:"Profile",
      location:"/profile",
    }
]

export const loginLiks = [
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