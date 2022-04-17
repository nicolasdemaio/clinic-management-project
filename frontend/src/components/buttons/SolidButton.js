import './SolidButton.css';

export const SolidButton = (props) => {
  return (
      <button className="solid-button-container" onClick={props.onClick}>{props.children}</button>
  );
};

export default SolidButton;
