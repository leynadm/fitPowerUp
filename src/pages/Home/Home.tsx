import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Progress from "../Progress/Progress";
import Friends from "../Friends/Friends";
import Workout from "../Workout/Workout";
function Home() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Workout />}  index/>
        <Route path="friends" element={<Friends />} />
        <Route path="progress" element={<Progress />} />
      </Routes>
    </div>
  );
}

export default Home;
