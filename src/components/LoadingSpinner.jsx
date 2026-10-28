import StatusBox from './StatusBox.jsx';
import './LoadingSpinner.css';

export default function LoadingSpinner({ message }) {
  return (
    <StatusBox tone="loading">
      <span className="loader" aria-hidden="true"></span>
      <p className="statusText">{message}</p>
    </StatusBox>
  );
}
