# kubejs

KubeJS scripts for a personal Minecraft server, deployed by pushing to `main` (see [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which just `git pull`s on the VPS).

## Environment

- Minecraft 1.20.1, Forge 14.4.20.
- Mods in scope: vanilla + Create + Create: Additions only. No other major mods — don't design around mods that aren't installed.

## Design direction

Satisfactory-style gameplay: heavy focus on factory building and automation via Create, minimal custom items/blocks/mechanics.

- Early game: keep the vanilla wood → stone → iron tier structure intact. Cut *tedium* (grind for ore, one-at-a-time smelting), don't skip tiers.
- Mid/late game: Create's own material progression (andesite → brass → …) is meant to become a Satisfactory-milestone-style ladder later. Not designed yet — don't assume specific Create recipe IDs or tiers until that work actually happens.

## Hard rule: never invent KubeJS/Minecraft API details

Method names, recipe IDs, and ingredient/tag syntax must be verified against a real source before writing them — not recalled from memory. This project already broke twice from guessed syntax (wrapping smelting output in an array, and guessing a single `iron_ingot_from_smelting` recipe id that doesn't exist in 1.20.1).

Verify against:
- KubeJS wiki: https://kubejs.com/wiki (recipe event methods, `Ingredient` syntax, output/count shorthand like `'2x minecraft:item'`)
- Latvian dev wiki (older/legacy KubeJS docs, sometimes has detail the new wiki lacks): https://wiki.latvian.dev
- Actual vanilla recipe data — don't assume a recipe id or that one "logical" recipe is a single file. Check https://github.com/misode/mcmeta, tag `1.20.1-data`, path `data/minecraft/recipes/`. Vanilla frequently splits what looks like one recipe into several JSON files per input variant (e.g. iron ingot smelting is 3 separate files: from ore, from deepslate ore, from raw iron — each with its own id).

When removing a vanilla recipe, prefer filtering `event.remove({ output: ..., type: ... })` (or other documented filter keys: `id`, `input`, `mod`) over guessing an exact recipe id, unless that id has been confirmed against real data.

## Verification

After any recipe script change: reload KubeJS on the server (`/kubejs reload server` or `/reload`) and check the log for script errors before considering the change done. Where possible, verify the actual in-game behavior too (craft/smelt the item and check the result).
