import './App.css';
import React, { useState } from 'react'
import List from './component/list/List'
import Form from './component/form/Form'

function App() {
  const [update, setUpdate] = useState(false)

  return (
    <div className="App">
      <Form setUpdate={setUpdate} update={update} />

      <List update={update} />
    </div>
  );
}

export default App;
