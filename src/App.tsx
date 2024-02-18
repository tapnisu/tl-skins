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
  const [currentUsername, setCurrentUsername] = useState("");
  const [loading, setLoading] = useState(false);

  function fetchTlData() {
    setLoading(true);

    setCurrentUsername(username);

    fetch(`https://tl-skins-api.deno.dev/tlSkin/${username}`)
      .then((result) => result.json())
      .then((result) => {
        setTlData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  return (
    <main className="container">
      <article>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <input
            name="username"
            type="text"
            placeholder="Введите имя пользователя"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="button"
            value="Загрузить"
            onClick={fetchTlData}
            aria-label="Загрузка..."
            aria-busy={loading}
          >
            Загрузить
          </button>
        </form>
        {tlData.SKIN ? (
          <pre style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={tlData.SKIN?.url}
              alt={`${currentUsername}'s skin`}
              style={{
                width: "100%",
                maxWidth: "768px",
                imageRendering: "pixelated",
              }}
            />
          </pre>
        ) : null}
      </article>
    </main>
  );
}

export default App;
