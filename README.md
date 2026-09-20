# kubejs

KubeJS scripts for a personal Minecraft server: Minecraft 1.20.1, Forge, vanilla + Create + Create: Additions. Satisfactory-style factory/automation gameplay, minimal custom items/blocks.

## Deploy

Pushing to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which just `git pull`s the repo on the VPS.

## Structure

- `server_scripts/` — recipe changes, `BlockEvents`, `ServerEvents`. All gameplay logic currently lives in `custom.js`.

## Contributing

See [CLAUDE.md](CLAUDE.md) for KubeJS/Rhino engine gotchas, API verification rules, and design direction before making changes.
