import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Html5Video from "./components/Html5Video";
import HlsJsPlayer from "./components/HlsJsPlayer";

function App() {
  return (
    <div className="App">
      <HlsJsPlayer />
    </div>
  );
}

export default App;
