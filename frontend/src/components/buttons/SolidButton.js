import './SolidButton.css';

export const SolidButton = (props) => {
  return (
    <div class="solid-button-container">
      <button onClick={props.onClick}>{props.children}</button>
    </div>
  );
};

export default SolidButton;
