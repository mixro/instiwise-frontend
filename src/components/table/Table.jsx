import './table.css';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Table = () => {
    const lessons = useSelector((state) => state.lessons.lessons);
    const [currentDay, setCurrentDay] = useState('');
    const todaysLessons = lessons.filter((lesson) => lesson.day === currentDay);

    useEffect(() => {
        const getDay = () => {
            const now = new Date();
            const day = now.toLocaleDateString(undefined, { weekday: 'long' });

            setCurrentDay(day);
        }

        const interval = setInterval(getDay, 1000);
        getDay();

        return () => clearInterval(interval);
    }, []);
  
    const columns = [
      {
        field: "name",
        headerName: "Lesson",
        width: window.innerWidth >= 768 ? 290 : 200,
        renderCell: (params) => {
          return (
            <div className="productListItem">
              <p>{params.row.name}</p>
            </div>
          );
        },
      },
      {
        field: "roomId",
        headerName: "Room",
        width: 120,
        renderCell: (params) => {
          return (
            <div className="productListItemm">
              <p>{params.row.roomId.roomName}</p>
            </div>
          );
        },
      },
      { field: "start", headerName: "Start", width: window.innerWidth >= 768 ? 80 : 110 },
      { field: "end", headerName: "End", width: window.innerWidth >= 768 ? 80 : 100 },
      {
        field: "courseId",
        headerName: "Course",
        width: 120,
        renderCell: (params) => {
          return (
            <div className="productListItemm">
              <p>{params.row.courseId.name}</p>
            </div>
          );
        },
      },
      { field: "lecturer", headerName: "Lecturer", width: 150 },
      { field: "day", headerName: "Day", width: 100 },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <Link to={"/lesson/" + params.row._id}>
                <button className="productListEdit">View</button>
              </Link>
            </>
          );
        },
      },
    ];

  return (
    <div className="productList">
        <div className="datagrid_large">
          <DataGrid
            rows={todaysLessons}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={8}
            checkboxSelection
          />
        </div>
        <div className="datagrid_small">
          <DataGrid
            rows={todaysLessons}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={8}
            checkboxSelection
          />
        </div>
    </div>
  )
}

export default Table