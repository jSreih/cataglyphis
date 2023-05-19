import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [tasks, setTasks] = useState({});
  const [taskInput, setTaskInput] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleAddTask = (dayOfWeek, time) => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: taskInput.trim(),
        time: time,
      };

      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        if (updatedTasks[dayOfWeek]) {
          updatedTasks[dayOfWeek].push(newTask);
        } else {
          updatedTasks[dayOfWeek] = [newTask];
        }
        return updatedTasks;
      });

      setTaskInput('');
      setSelectedTime('');
    }
  };

  const handleRemoveTask = (dayOfWeek, taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[dayOfWeek] = updatedTasks[dayOfWeek].filter((task) => task.id !== taskId);
      return updatedTasks;
    });
  };

  return (
    <div className="calendar">
      <h1 className="calendar-heading">Calendar</h1>
      <div className="task-input">
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Enter a task"
        />
        <div className="time-selection">
          <span className="time-selection-label">Select Time:</span>
          {Array.from({ length: 24 }, (_, i) => (
            <button
              key={i}
              className={`time-selection-button ${selectedTime === i ? 'selected' : ''}`}
              onClick={() => handleTimeSelection(i)}
            >
              {i}:00
            </button>
          ))}
        </div>
        <button
          className="add-task-button"
          onClick={() => handleAddTask(daysOfWeek[new Date().getDay()], selectedTime)}
          disabled={!taskInput.trim() || selectedTime === ''}
        >
          Add Task
        </button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-day">
            <h2 className="day-heading">{day}</h2>
            <ul className="task-list">
              {tasks[day] &&
                tasks[day].map((task) => (
                  <li key={task.id} className="task-item">
                    <span className="task-time">{task.time}:00</span>
                    <span className="task-text">{task.text}</span>
                    <button
                      className="remove-task-button"
                      onClick={() => handleRemoveTask(day, task.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
