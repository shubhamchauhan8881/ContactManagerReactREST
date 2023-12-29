
import React from 'react'

import NaContact from './components/NaContact';
import CreateContact from './components/CreateContact';
import ShowContact from './components/ShowContact';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NaContact />} />
        <Route path="create/" element={<CreateContact edit={false} />} />
        <Route path="show/:id" element={<ShowContact />} />
        <Route path="edit/" element={<CreateContact  edit={true} />} />
        <Route path="*" element={<NaContact />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
