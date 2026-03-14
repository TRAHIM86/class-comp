import './App.css';
import type { ChildProps } from './types';

function App({ children }: ChildProps) {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-[clamp(768px,80%,1280px)] h-screen flex flex-col justify-center items-center border-2 border-orange-500">
        {children}
      </div>
    </div>
  );
}

export default App;
