import { createContext, useContext, useEffect, useState } from 'react';
import { loadTask, saveTasks } from '../utils/storage';
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, settasks] = useState([]);
    useEffect(() => {
    loadTask().then(settasks);
    
  }, []);
  useEffect(()=>{
    saveTasks(tasks)
    console.log(tasks)
  } ,[tasks])
  return (
    <TaskContext.Provider value={{ tasks, settasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
