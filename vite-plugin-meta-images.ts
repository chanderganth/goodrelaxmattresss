import type Plugin from "vite";
import fs from "fs";
import path from "path";

export function metaImagesPlugin(): Plugin {
  return {
    name: "vite-plugin-meta-images",
    transformIndexHtml(html) {
      const baseUrl = process.env.DEPLOYMENT_URL || "http://localhost:5173";
      const publicDir = path.resolve(process.cwd(), "public");
      const opengraphPngPath = path.join(publicDir, "opengraph.png");
      const opengraphJpgPath = path.join(publicDir, "opengraph.jpg");
      const opengraphJpegPath = path.join(publicDir, "opengraph.jpeg");

      let imageExt: "png" | "jpg" | "jpeg" | null = null;
      if (fs.existsSync(opengraphPngPath)) imageExt = "png";
      else if (fs.existsSync(opengraphJpgPath)) imageExt = "jpg";
      else if (fs.existsSync(opengraphJpegPath)) imageExt = "jpeg";

      if (!imageExt) return html;

      const imageUrl = `${baseUrl}/opengraph.${imageExt}`;
      return html
        .replace(/og:image[^"]*"/g, `og:image" content="${imageUrl}`)
        .replace(/twitter:image[^"]*"/g, `twitter:image" content="${imageUrl}`);
    },
  };
}
