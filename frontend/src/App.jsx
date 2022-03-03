import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import StartView from './views/StartView'
import UnauthorizedView from './views/UnauthorizedView'
import { Routes, Route} from "react-router-dom";
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" >
          {/* Public routes */}
          <Route path="/" element={<StartView />} />
          <Route path="/unauthorized" element={<UnauthorizedView />} />
          <Route path="login" element={<LoginView />} />

          {/* Private routes */}
          <Route element={<RequireAuth allowedRoles={["RECEPTIONIST","ADMIN","DOCTOR"]}/>}>
            <Route path="home" element={<HomeView />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App
