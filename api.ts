import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v13.2.5/mod.ts";
const app = new Application();

const router = new Router();
router.get("/tlSkin/:username", async (ctx) => {
  const res = await fetch(
    `https://auth.tlauncher.org/skin/profile/texture/login/${ctx.params.username}`,
    {
      mode: "no-cors",
    }
  );

  ctx.response.body = await res.json();
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({
  port: Deno.env.has("PORT") ? Number(Deno.env.get("PORT")) : 8000,
});
