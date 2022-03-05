import DashboardView from './views/DashboardView';
import LoginView from './views/LoginView';
import StartView from './views/StartView'
import UnauthorizedView from './views/UnauthorizedView'
import { Routes, Route} from "react-router-dom";
import RequireAuth from './components/RequireAuth'
import AppointmentsScreen from './screens/AppointmentsScreen';
import DoctorsScreen from './screens/DoctorsScreen';
import PatientsScreen from './screens/PatientsScreen';
import DashboardScreen from './screens/DashboardScreen';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" >
          {/* Public routes */}
          <Route path="/" element={<StartView />} />
          <Route path="unauthorized" element={<UnauthorizedView />} />
          <Route path="login" element={<LoginView />} />

          {/* Private routes */}
          <Route element={<RequireAuth allowedRoles={["RECEPTIONIST","ADMIN","DOCTOR"]}/>}>
            <Route path="dashboard" element={<DashboardView />}>
              <Route path="home" element={<DashboardScreen />}/>
              <Route path='appointments' element={<AppointmentsScreen />}/>
              <Route path='patients' element={<PatientsScreen />}/>
              <Route path='doctors' element={<DoctorsScreen />}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App
