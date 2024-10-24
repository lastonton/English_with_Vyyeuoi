
import './App.css';
import React,{ Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
      
    )
  }
}

export default App;