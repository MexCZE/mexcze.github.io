import React, { useEffect } from 'react';
import './analogClock.css';

const AnalogClock = () => {
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours() % 12;

      const secondDegrees = (seconds / 60) * 360;
      const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
      const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;

      const secondHand = document.querySelector('.second');
      const minuteHand = document.querySelector('.minute');
      const hourHand = document.querySelector('.hour');

      secondHand.style.transform = `rotate(${secondDegrees}deg)`;
      minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
      hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    };

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wrapper">
      <div className="clock">
        <label style={{ '--i': 1 }}><span>1</span></label>
        <label style={{ '--i': 2 }}><span>2</span></label>
        <label style={{ '--i': 3 }}><span>3</span></label>
        <label style={{ '--i': 4 }}><span>4</span></label>
        <label style={{ '--i': 5 }}><span>5</span></label>
        <label style={{ '--i': 6 }}><span>6</span></label>
        <label style={{ '--i': 7 }}><span>7</span></label>
        <label style={{ '--i': 8 }}><span>8</span></label>
        <label style={{ '--i': 9 }}><span>9</span></label>
        <label style={{ '--i': 10 }}><span>10</span></label>
        <label style={{ '--i': 11 }}><span>11</span></label>
        <label style={{ '--i': 12 }}><span>12</span></label>

        <div className="hands">
          <span className="hand hour"></span>
          <span className="hand minute"></span>
          <span className="hand second"></span>
        </div>
      </div>
    </div>
  );
};

export default AnalogClock;