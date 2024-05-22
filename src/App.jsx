import React from 'react';
import Header from './components/Header/Header';
import Categories from './screens/categories/Categories';

const App = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className='flex-grow'>
        <Categories />
      </div>
      <footer className="bg-gray-800 text-white text-center py-4">Footer content here</footer>
    </div>
  );
};

export default App;


// return (
//   <>
//     <div>
//       <a href="https://vitejs.dev" target="_blank">
//         <img src={viteLogo} className="logo" alt="Vite logo" />
//       </a>
//       <a href="https://react.dev" target="_blank">
//         <img src={reactLogo} className="logo react" alt="React logo" />
//       </a>
//     </div>
//     <h1>Vite + React</h1>
//     <div className="card">
//       <button onClick={() => setCount((count) => count + 1)}>
//         count is {count}
//       </button>
//       <p>
//         Edit <code>src/App.jsx</code> and save to test HMR
//       </p>
//     </div>
//     <p className="read-the-docs">
//       Click on the Vite and React logos to learn more
//     </p>
//   </>
// )
// }