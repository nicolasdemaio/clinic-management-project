import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={<HomeView />} />
        <Route path="/home" element={<HomeView />} />
      </Routes>
    </>
  );
}

export default App
