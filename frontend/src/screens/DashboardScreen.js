import StorageIcon from "@mui/icons-material/Storage";

const DashboardScreen = () => {
  return (
    <div className="screen-container">
      <div className="screen-header">
        <div className="screen-header-icon-container">
          <StorageIcon fontSize="large" style={{ color: "#3E43AB" }} />
        </div>
        <div className="screen-header-descriptions">
          <p className="screen-header-title">Dashboard</p>
          <p className="screen-header-subtitle">
            Gestión de turnos, pacientes y más
          </p>
        </div>
      </div>

      <div className="screen-content-container">
        <div className="screen-content">
          <h1>Dashboard</h1>
          <h2>Contenido</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
