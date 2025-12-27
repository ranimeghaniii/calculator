import Calculator from './components/Calculator';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-white">React Calculator</h1>
      <Calculator />
    </div>
  );
}

export default App;
