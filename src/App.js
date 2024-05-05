// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import JobList from './components/JobList';


const App = () => {
  return (
    <Provider store={store}>
      <div>
        <JobList />
      </div>
    </Provider>
  );
};

export default App;
