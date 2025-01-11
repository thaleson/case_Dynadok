import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import AddTask from './pages/AddTask';
import './App.css';


function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Tasks />} />
                    <Route path="/task/:id" element={<TaskDetail />} />
                    <Route path="/tasks/:id" element={<TaskDetail />} />
                    <Route path="/add" element={<AddTask />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
