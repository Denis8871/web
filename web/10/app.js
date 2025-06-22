// Класова компонента
class HobbyClassComponent extends React.Component {
  render() {
    return (
      <div>
        <h2>(Класова компонента)</h2>
        <p>Текст</p>
      </div>
    );
  }
}

// Функціональна компонента
function HobbyFunctionComponent() {
  return (
    <div>
      <h2>(Функціональна компонента)</h2>
      <p>Текст</p>
    </div>
  );
}

// Головна компонента для рендеру обох
function App() {
  return (
    <div>
      <HobbyClassComponent />
      <hr />
      <HobbyFunctionComponent />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
