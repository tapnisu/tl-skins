import "@picocss/pico/css/pico.min.css";
import { FormEventHandler, useState } from "react";
import { BrowserRouter, useSearchParams } from "react-router-dom";

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

export function TlSkinLoader() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [username, setUsername] = useState(searchParams.get("username") ?? "");
  const [tlData, setTlData] = useState<TlData>({});
  const [currentUsername, setCurrentUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTlData: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setLoading(true);

    setCurrentUsername(username);
    setSearchParams({ username });

    fetch(`https://tl-skins-api.deno.dev/tlSkin/${username}`)
      .then((result) => result.json())
      .then((result) => {
        setTlData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <main className="container">
      <article>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={fetchTlData}
        >
          <input
            name="username"
            defaultValue={username}
            type="text"
            placeholder="Введите имя пользователя"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button
            type="submit"
            value="Загрузить"
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

export default function App() {
  return (
    <BrowserRouter>
      <TlSkinLoader />
    </BrowserRouter>
  );
}
