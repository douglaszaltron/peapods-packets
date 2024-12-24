import reactDom from 'react-dom/client';
import Main from './main';
const rootEl = document.getElementById('root');

if (rootEl) {
  const root = reactDom.createRoot(rootEl);
  root.render(<Main />);
}
