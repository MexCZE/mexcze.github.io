import React, { useState, useEffect } from 'react';
import './timeCalculator.css';
import AnalogClock from './AnalogClock';

const TimeCalculator = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('5:30');
  const [timeToSelected, setTimeToSelected] = useState('');

  const timeOptions = ['5:30', '6:30', '7:30'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateTimeToSelected = () => {
    const selectedTimeParts = selectedTime.split(':');
    const selectedHour = parseInt(selectedTimeParts[0]);
    const selectedMinute = parseInt(selectedTimeParts[1]);

    const selectedDate = new Date();
    selectedDate.setHours(selectedHour);
    selectedDate.setMinutes(selectedMinute);
    selectedDate.setSeconds(0);

    if (selectedDate <= currentTime) {
      selectedDate.setDate(selectedDate.getDate() + 1);
    }

    const timeDifference = selectedDate - currentTime;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTimeToSelected(`${hours} hodin, ${minutes} minut a ${seconds} sekund`);
  };

  useEffect(() => {
    calculateTimeToSelected();
  }, [currentTime, selectedTime]);

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleCustomTimeAdd = (e) => {
    const newTime = prompt('Zadejte nový čas ve formátu HH:MM');
    if (newTime && /^\d{1,2}:\d{2}$/.test(newTime)) {
      timeOptions.push(newTime);
      setSelectedTime(newTime);
    } else {
      alert('Neplatný formát času! Zadejte čas ve formátu HH:MM.');
    }
  };

  return (
    <div className="time-container">
      <AnalogClock />
      <div className="time-calculator">
        <h1>Aktuální čas: <br /> {currentTime.toLocaleTimeString()}</h1>
        <select value={selectedTime} onChange={handleTimeChange}>
          {timeOptions.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
        <button onClick={handleCustomTimeAdd}>Přidat další čas</button>
        <h2>Budík zvoní za: <br /> {timeToSelected}</h2>
      </div>
    </div>
  );
};

export default TimeCalculator;
