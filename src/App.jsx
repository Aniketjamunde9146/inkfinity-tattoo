/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import Home from "./pages/Home";

import "./App.css";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="App">
      {/* <Navbar onBookClick={openForm} /> */}
      <Home onBookClick={openForm} />
      {/* <OurGallery />
      <Contact onBookClick={openForm} />
      <Form isOpen={isFormOpen} onClose={closeForm} />
      <Footer /> */}
    </div>
  );
}

export default App;