import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [tasks, setTasks] = useState({});
  const [taskInput, setTaskInput] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day);
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
          <div className="time-buttons">
            {Array.from({ length: 24 }, (_, i) => (
              <button
                key={i}
                className={`time-selection-button ${selectedTime === i ? 'selected' : ''}`}
                onClick={() => handleTimeSelection(i)}
              >
                {i < 10 ? `0${i}:00` : `${i}:00`}
              </button>
            ))}
          </div>
        </div>
        <div className="day-selection">
          <span className="day-selection-label">Select Day:</span>
          {daysOfWeek.map((day) => (
            <button
              key={day}
              className={`day-selection-button ${selectedDay === day ? 'selected' : ''}`}
              onClick={() => handleDaySelection(day)}
            >
              {day}
            </button>
          ))}
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
                    <span className="task-time">{task.time < 10 ? `0${task.time}:00` : `${task.time}:00`}</span>
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