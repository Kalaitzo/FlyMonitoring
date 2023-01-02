// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[testName].tsx";
import * as $1 from "./routes/about.tsx";
import * as $2 from "./routes/api/devices/door.ts";
import * as $3 from "./routes/api/devices/fluid-level.ts";
import * as $4 from "./routes/api/devices/rack-temperature.ts";
import * as $5 from "./routes/api/devices/smoke.ts";
import * as $6 from "./routes/api/devices/tag.ts";
import * as $7 from "./routes/api/devices/temperature.ts";
import * as $8 from "./routes/countdown.tsx";
import * as $9 from "./routes/devices.tsx";
import * as $10 from "./routes/github/[username].tsx";
import * as $11 from "./routes/greet/[name].tsx";
import * as $12 from "./routes/index.tsx";
import * as $13 from "./routes/search.tsx";
import * as $14 from "./routes/test-header.tsx";
import * as $$0 from "./islands/Countdown.tsx";
import * as $$1 from "./islands/Counter.tsx";
import * as $$2 from "./islands/SignIn.tsx";

const manifest = {
  routes: {
    "./routes/[testName].tsx": $0,
    "./routes/about.tsx": $1,
    "./routes/api/devices/door.ts": $2,
    "./routes/api/devices/fluid-level.ts": $3,
    "./routes/api/devices/rack-temperature.ts": $4,
    "./routes/api/devices/smoke.ts": $5,
    "./routes/api/devices/tag.ts": $6,
    "./routes/api/devices/temperature.ts": $7,
    "./routes/countdown.tsx": $8,
    "./routes/devices.tsx": $9,
    "./routes/github/[username].tsx": $10,
    "./routes/greet/[name].tsx": $11,
    "./routes/index.tsx": $12,
    "./routes/search.tsx": $13,
    "./routes/test-header.tsx": $14,
  },
  islands: {
    "./islands/Countdown.tsx": $$0,
    "./islands/Counter.tsx": $$1,
    "./islands/SignIn.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
