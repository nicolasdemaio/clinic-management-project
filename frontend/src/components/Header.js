import StorageIcon from '@mui/icons-material/Storage';
import './Header.css';

export const Header = ({ title, description = '', icon = <StorageIcon /> }) => {
  return (
    <div className="screen-header">
      <div className="screen-header-icon-container">{icon}</div>
      <div className="screen-header-descriptions">
        <p className="screen-header-title">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Header;
