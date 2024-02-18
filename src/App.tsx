import { useEffect, useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [tlData, setTlData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/tlSkin/${"KitSuneHenaRu_"}`)
      .then((result) => result.json())
      .then((result) => setTlData(result));
  }, [username]);

  return (
    <div>
      <img src={tlData.SKIN?.url} alt="" />
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
    </div>
  );
}

export default App;
