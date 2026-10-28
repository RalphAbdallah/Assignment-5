import './StatusBox.css';

export default function StatusBox({ tone, children }) {
  return (
    <div
      className={tone ? `status ${tone}` : 'status'}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      {children}
    </div>
  );
}
