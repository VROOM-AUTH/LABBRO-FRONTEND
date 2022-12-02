import "./App.css";
import Menu from "./components/Menu/Menu";
import Dashboard from "./components/Dashboard/Dashboard";
import MyBarChart from "./components/BarChartCom/BarChartCom";
import ActivityPanel from "./components/ActivityPanel/ActivityPanel";

function App() {
    return (
        <div className="App">
            <div className="menu-container">
                <Menu />
            </div>
            <div className="dashboard-container">
                <Dashboard />
            </div>
            <div className="activity-container">
                <ActivityPanel />
            </div>
        </div>
    );
}

export default App;
