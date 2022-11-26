import "./App.css";
import Menu from "./components/Menu/Menu";
import MyBarChart from "./components/BarChart/BarChart";

function App() {
  return (
    <div className="App">
      <div className="menu-container">
        <Menu />
        <div className="bar-chart">
          <MyBarChart />
        </div>
      </div>
      {/* <div className="bar-chart"></div> */}
    </div>
  );
}

export default App;
