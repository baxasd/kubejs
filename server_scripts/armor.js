// Proportional cost cut for metal armor tiers (iron/gold/diamond). Leather is left
// untouched - it's not ore-based and isn't a grind point (cows are plentiful).
// New shapes are simple filled blocks (not vanilla's exact silhouette) chosen so every
// piece has a different total item count, which means none of them can collide with
// each other regardless of Minecraft's automatic shaped-recipe mirroring.
//
// Recipe ids and vanilla costs verified against data/minecraft/recipes/*_helmet.json etc.
// in github.com/misode/mcmeta, tag 1.20.1-data: vanilla helmet=5, chestplate=8, leggings=7,
// boots=4. New costs: helmet=4, chestplate=6, leggings=5, boots=3.
ServerEvents.recipes(event => {
    const tiers = [
        { tool: 'iron', material: 'minecraft:iron_ingot' },
        { tool: 'golden', material: 'minecraft:gold_ingot' },
        { tool: 'diamond', material: 'minecraft:diamond' }
    ]

    tiers.forEach(({ tool, material }) => {
        event.remove({ id: `minecraft:${tool}_helmet` })
        event.shaped(`minecraft:${tool}_helmet`, ['XX', 'XX'], { X: material })

        event.remove({ id: `minecraft:${tool}_chestplate` })
        event.shaped(`minecraft:${tool}_chestplate`, ['XX', 'XX', 'XX'], { X: material })

        event.remove({ id: `minecraft:${tool}_leggings` })
        event.shaped(`minecraft:${tool}_leggings`, ['XX', 'XX', 'X '], { X: material })

        event.remove({ id: `minecraft:${tool}_boots` })
        event.shaped(`minecraft:${tool}_boots`, ['X', 'X', 'X'], { X: material })
    })
})
