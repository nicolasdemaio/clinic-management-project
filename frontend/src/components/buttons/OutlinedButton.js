import './OutlinedButton.css';

export const OutlinedButton = (props) => {
  return (
    <button className="outlined-button-container" onClick={props.onClick}>{props.children}</button>
  );
};

export default OutlinedButton;
