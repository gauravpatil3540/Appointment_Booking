import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

const MyCalendar = ({getDate}) => { 
  const [date, setDate] = useState(new Date());

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() =>{
    getDate(formatDate(date));
  },[date])

  return (
    <div>  
      <Calendar onChange={setDate}/>
    </div>
  );
};

export default MyCalendar;