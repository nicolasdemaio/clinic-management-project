import './OutlinedButton.css';

export const OutlinedButton = (props) => {
  return (
    <div class="outlined-button-container">
      <button onClick={props.onClick}>{props.children}</button>
    </div>
  );
};

export default OutlinedButton;
