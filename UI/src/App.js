import React from "react";
import MesagesUI from './components/MesagesUI';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<MesagesUI/>}/>
          <Route>404 Not Found!!!</Route>
        </Routes>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
