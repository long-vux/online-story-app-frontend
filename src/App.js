// import React from "react";
// import { OnepieceOverview } from "./components/OnepieceOverview"; // Import component

// function App() {
//   return (
//     <div className="App">
//       <OnepieceOverview /> {/* Sử dụng component */}
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateStoryForm from './pages/CreateStoryForm';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin/create-story" component={CreateStoryForm} />
        {/* Các route khác */}
      </Switch>
    </Router>
  );
};

export default App;