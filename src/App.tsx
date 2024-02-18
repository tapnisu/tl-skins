import "@picocss/pico/css/pico.violet.min.css";
import { useState } from "react";

export interface TlData {
  SKIN?: Skin;
  CAPE?: Cape;
}

export interface Skin {
  url: string;
  metadata: Metadata;
}

export interface Metadata {
  model: string;
}

export interface Cape {
  url: string;
  animatedCape?: boolean;
  capeHeight?: number;
  fps?: number;
}

function App() {
  const [username, setUsername] = useState("");
  const [tlData, setTlData] = useState<TlData>({});

  function fetchTlData() {
    fetch(`https://tl-skins-api.deno.dev/tlSkin/${username}`)
      .then((result) => result.json())
      .then((result) => setTlData(result));
  }

  return (
    <main className="container">
      <article>
        <input
          name="username"
          type="text"
          placeholder="Введите username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="button" value="Загрузить" onClick={fetchTlData} />
        <pre style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={tlData.SKIN?.url}
            alt="Скин не найден"
            style={{
              width: "100%",
              maxWidth: "768px",
              imageRendering: "pixelated",
            }}
          />
        </pre>
      </article>
    </main>
  );
}

export default App;
