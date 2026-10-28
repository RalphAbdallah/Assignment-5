import StatusBox from './StatusBox.jsx';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <StatusBox tone="error">
      <p className="statusText">{message}</p>
      {onRetry && (
        <button type="button" className="button" onClick={onRetry}>
          Retry
        </button>
      )}
    </StatusBox>
  );
}
