import './App.css';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        // <Router>
        //     <div className="App">
        //         <div className="menu-container">
        //             <Menu />
        //         </div>
        //         <div className="dashboard-container">
        //             {/* <Dashboard /> */}
        //             <Routes>
        //                 <Route path="/" element={<Dashboard />} />
        //                 <Route path="/volts" element={<VroomVolts />} />
        //                 <Route path="/register" element={<RegisterScreen />} />
        //                 <Route path="/login" element={<LoginScreen />} />
        //             </Routes>
        //         </div>
        //         <div className="activity-container">
        //             <ActivityPanel />
        //         </div>
        //     </div>
        // </Router>
        <Router>
            <Routes>
                <Route>
                    <Route path='/' element={<MainScreen path={'/'} />} />
                    <Route
                        path='/volts'
                        element={<MainScreen path={'/volts'} />}
                    />
                    <Route
                        path='/users'
                        element={<MainScreen path={'/users'} />}
                    />
                    <Route path='/register' element={<RegisterScreen />} />
                    <Route path='/login' element={<LoginScreen />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
