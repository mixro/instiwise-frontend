
# InstiWise Platform – Frontend Documentation  

![React](https://img.shields.io/badge/React-v18-blue)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Storage-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![CSS](https://img.shields.io/badge/CSS3-Styling-blue)  

The **InstiWise Platform** is a comprehensive solution for institutes, designed to connect students, improve academic management, enable project sharing, and provide real-time updates through news and announcements. This repository contains the **frontend application**, developed using React and Redux, and integrated with Firebase for authentication and data handling.  

---

## Table of Contents  

- [Overview](#overview)  
- [Architecture](#architecture)  
- [Technologies](#technologies)  
- [Setup Instructions](#setup-instructions)  
- [Directory Structure](#directory-structure)  
- [Core Features](#core-features)  
- [Testing](#testing)  
- [Deployment](#deployment)  
- [Future Improvements](#future-improvements)  
- [Support](#support)  

---

## Overview  

InstiWise empowers students and administrators with tools to:  

- Manage and view **academic resources** (lessons, rooms, classes).  
- Share and explore **student projects**.  
- Stay informed with **real-time news & announcements** from student organizations and administration.  
- Connect with peers for collaboration and community building.  

The platform enhances **communication, accessibility, and efficiency** within institutes.  

---

## Architecture  

### Components  

- **React (Frontend)** – Builds user interface and interactive views.  
- **Redux Toolkit** – Manages application state (auth, lessons, rooms, projects).  
- **Firebase** – Handles authentication, file storage, and project sharing.  
- **REST API Integration** – Communicates with the backend for lessons, rooms, and academic data.  

### Directory Structure  

```plaintext
instiwise-frontend/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Application pages (Dashboard, Lessons, Projects, News)
│   ├── redux/               # Redux store and slices
│   ├── app.css              # Global styles
│   ├── App.js               # Main App entry
│   ├── dummyData.js         # Mock data for testing
│   ├── firebase.js          # Firebase config
│   ├── index.css            # Root CSS
│   ├── index.js             # App bootstrap
│   ├── requestMethod.js     # Axios instance for API requests
├── package.json             # Dependencies
├── README.md                # Documentation
```  

---

## Technologies  

- **React** (v18) – Component-based frontend framework  
- **Redux Toolkit** – Global state management  
- **Firebase** – Authentication & storage  
- **Axios** – API requests  
- **Moment.js** – Date/time formatting  
- **CSS3** – Styling  

---

## Setup Instructions  

### Prerequisites  
- **Node.js** v18+  
- **npm** or **yarn**  
- Firebase project credentials  

### Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/mixro/instiwise-frontend
   cd instiwise-frontend
   ```  

2. Install dependencies:  
   ```bash
   npm install
   ```  

3. Configure Firebase:  
   - Create a project on Firebase Console.  
   - Enable Authentication & Firestore/Storage.  
   - Add your config details in `src/firebase.js`.  

4. Run the app:  
   ```bash
   npm start
   ```  
   The app runs at `http://localhost:3000`.  

---

## Core Features  

- **Student Networking** – Profiles, connections, and collaboration tools.  
- **Project Sharing** – Upload, explore, and collaborate on projects.  
- **News & Announcements** – Real-time updates from administration & student orgs.  
- **Academic Resources** – Lessons, schedules, and room availability.  

---

## Testing  

- **Dummy Data** in `dummyData.js` is provided for UI testing.  
- For manual testing, run:  
  ```bash
  npm test
  ```  

---

## Deployment  

### Local  
```bash
npm run build
serve -s build
```  

### Production  
Deploy to:  
- **Firebase Hosting**  
- **Vercel**  
- **Netlify**  

---

## Future Improvements  

- Advanced analytics dashboards.  
- Mobile application support.  
- AI-powered project recommendations.  
- Offline access to class schedules.  

---

## Support  

For issues or inquiries:  
- Contact the development team via [josephchongola43@gmail.com].  
- Raise issues on the GitHub repository.  
