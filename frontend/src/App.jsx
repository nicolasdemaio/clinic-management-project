import NavbarView from './views/dashboard/NavbarView';
import LoginView from './views/login/LoginView';
import HomeView from './views/home/HomeView';
import UnauthorizedView from './pages/UnauthorizedView';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import AppointmentsScreen from './views/dashboard/appointments/AppointmentsScreen';
import DoctorsScreen from './views/dashboard/doctors/DoctorsScreen';
import PatientsScreen from './views/dashboard/patients/PatientsScreen';
import DashboardScreen from './views/dashboard/home/DashboardScreen';
import SinglePatientView from './views/dashboard/patients/SinglePatientView';
import PatientCreationView from './views/dashboard/patients/PatientCreationView';

function App() {
  return (
    <>
      <Routes>
        <Route path='/'>
          {/* Public routes */}
          <Route path='/' element={<HomeView />} />
          <Route path='unauthorized' element={<UnauthorizedView />} />
          <Route path='login' element={<LoginView />} />

          {/* Private routes */}
          <Route
            element={
              <RequireAuth allowedRoles={['RECEPTIONIST', 'ADMIN', 'DOCTOR']} />
            }
          >
            <Route path='dashboard' element={<NavbarView />}>
              <Route path='home' element={<DashboardScreen />} />
              <Route path='appointments' element={<AppointmentsScreen />} />
              <Route path='patients' element={<PatientsScreen />} />
              <Route path='patients/create' element={<PatientCreationView />} />
              <Route
                path='patients/:patientId'
                element={<SinglePatientView />}
              />
              <Route path='doctors' element={<DoctorsScreen />} />
              <Route path='accounts' element={<DoctorsScreen />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
