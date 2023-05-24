import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [tasks, setTasks] = useState({});
  const [taskInput, setTaskInput] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timesOfDay = Array.from({ length: 24 }, (_, i) => {
    const hour = i === 0 ? 12 : i > 12 ? i - 12 : i;
    const period = i < 12 ? 'AM' : 'PM';
    return `${hour}:00 ${period}`;
  });

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleTimeSelection = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDaySelection = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== '' && selectedTime !== '' && selectedDay !== '') {
      const newTask = {
        id: Date.now(),
        text: taskInput.trim(),
        time: selectedTime,
      };

      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        if (updatedTasks[selectedDay]) {
          updatedTasks[selectedDay].push(newTask);
        } else {
          updatedTasks[selectedDay] = [newTask];
        }
        return updatedTasks;
      });

      setTaskInput('');
      setSelectedTime('');
      setSelectedDay('');
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
          <div className="dropdown">
            <select className="dropdown-select" value={selectedTime} onChange={handleTimeSelection}>
              <option value="">-- Select Time --</option>
              {timesOfDay.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <div className="dropdown-indicator"></div>
          </div>
        </div>
        <div className="day-selection">
          <span className="day-selection-label">Select Day:</span>
          <div className="dropdown">
            <select className="dropdown-select" value={selectedDay} onChange={handleDaySelection}>
              <option value="">-- Select Day --</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="dropdown-indicator"></div>
          </div>
        </div>
        <button
          className="add-task-button"
          onClick={handleAddTask}
          disabled={!taskInput.trim() || selectedTime === '' || selectedDay === ''}
        >
          Add Task
        </button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-day">
            <h2 className="day-heading">{day}</h2>
            <ul className="task-list">
              {tasks[day] && tasks[day].length > 0 ? (
                tasks[day].map((task) => (
                  <li key={task.id} className="task-item">
                    <span className="task-time">{task.time}</span>
                    <span className="task-text">{task.text}</span>
                    <button
                      className="remove-task-button"
                      onClick={() => handleRemoveTask(day, task.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <li className="no-task-item">No tasks</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
