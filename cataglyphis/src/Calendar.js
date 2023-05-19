import React, { useState } from 'react';

const Calendar = () => {
  const [tasks, setTasks] = useState({});
  const [taskInput, setTaskInput] = useState('');
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleAddTask = (dayOfWeek, time) => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: taskInput.trim(),
        time: time
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
    }
  };

  const handleRemoveTask = (dayOfWeek, taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[dayOfWeek] = updatedTasks[dayOfWeek].filter(task => task.id !== taskId);
      return updatedTasks;
    });
  };

  return (
    <div>
      <h1>Calendar</h1>
      <input
        type="text"
        value={taskInput}
        onChange={handleInputChange}
        placeholder="Enter a task"
      />
      <ul>
        {daysOfWeek.map(day => (
          <li key={day}>
            <h2>{day}</h2>
            <ul>
              {tasks[day] &&
                tasks[day].map(task => (
                  <li key={task.id}>
                    <span>{task.time}: </span>
                    {task.text}
                    <button onClick={() => handleRemoveTask(day, task.id)}>Remove</button>
                  </li>
                ))}
            </ul>
            <div>
              {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                <button key={hour} onClick={() => handleAddTask(day, hour)}>
                  {hour}:00
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
