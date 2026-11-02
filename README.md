# OFF-BY-ONE studio site

The landing page at https://off-by-one.digital/. Plain static files with no build step, served directly by nginx, so it stays up when the projects behind it are down.

- `public/index.html` is served at `/`, and `public/site/` at `/site/`.
- `/social-credit` and `/concert-tracker` are separate repos behind the same nginx.
- The SERVERS and CITIZENS counters read `/api/stats` from the Social Credit web service and show a dash if it's down.

Pushing to `main` deploys: the workflow runs `git pull` on the VPS, no restart needed. The nginx config is in `deploy/nginx.conf`.

Run it locally with `python -m http.server 8000 --directory public`.
