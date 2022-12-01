import "./App.css";
import Menu from "./components/Menu/Menu";
import Dashboard from "./components/Dashboard/Dashboard";
import MyBarChart from "./components/BarChartCom/BarChartCom";

function App() {
    return (
        <div className="App">
            <div className="menu-container">
                <Menu />
            </div>
            <div className="dashboard-container">
                <Dashboard />
            </div>
            <div className="activity-container"></div>
        </div>
    );
}

export default App;
