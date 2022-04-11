import './OutlinedButton.css';

export const OutlinedButton = (props) => {
  return (
    <div className="outlined-button-container">
      <button onClick={props.onClick}>{props.children}</button>
    </div>
  );
};

export default OutlinedButton;
