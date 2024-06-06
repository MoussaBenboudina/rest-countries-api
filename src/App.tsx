import Countries from "./components/Countries";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import SingleCountry from "./components/SingleCountry";

// import { useEffect, useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="dark:text-gray-200 ">
        <Header />
        <Routes>
          <Route index element={<Countries />}></Route>
          <Route path="/:name" element={<SingleCountry country={""} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
