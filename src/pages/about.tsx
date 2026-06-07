import { container1280 } from '../styles/styles';

export const About = () => {
  return (
    <div data-testid="container" className={container1280}>
      <div className="border-1 border-yellow-300">
        <p>INFORMATION ABOUT INFORMATION ABOUT</p>
        <div>Pavel Trahimchyk</div>
        <a
          href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/functional-routing.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Link to task
        </a>
      </div>
    </div>
  );
};
