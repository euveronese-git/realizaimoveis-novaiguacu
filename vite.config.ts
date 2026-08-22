import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function propertiesJsonPlugin(): Plugin {
  const contentDir = path.resolve(__dirname, 'content/properties');
  const publicFile = path.resolve(__dirname, 'public/data/properties.json');

  function buildPayload(): string {
    const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.json'));
    const properties = files.map((file) =>
      JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'))
    );
    return JSON.stringify(properties);
  }

  function writePublicFile() {
    fs.mkdirSync(path.dirname(publicFile), { recursive: true });
    fs.writeFileSync(publicFile, buildPayload());
  }

  return {
    name: 'properties-json',
    buildStart() {
      writePublicFile();
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== '/data/properties.json') {
          next();
          return;
        }
        try {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store');
          res.end(buildPayload());
        } catch (err) {
          next(err);
        }
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'data/properties.json',
        source: buildPayload(),
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), propertiesJsonPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
