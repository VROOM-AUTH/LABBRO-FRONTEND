import "./App.css";
import Menu from "./components/Menu/Menu";
import Dashboard from "./components/Dashboard/Dashboard";
import ActivityPanel from "./components/ActivityPanel/ActivityPanel";
import VroomVolts from "./components/VroomVolts/VroomVolts";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="menu-container">
                    <Menu />
                </div>
                <div className="dashboard-container">
                    {/* <Dashboard /> */}
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/volts" element={<VroomVolts />} />
                    </Routes>
                </div>
                <div className="activity-container">
                    <ActivityPanel />
                </div>
            </div>
        </Router>
    );
}

export default App;
