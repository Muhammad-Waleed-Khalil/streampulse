import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
    uploadthingId: process.env.UPLOADTHING_APP_ID,
  },
});
