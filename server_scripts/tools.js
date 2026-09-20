// Cut the material cost where the grind actually is: pickaxe/axe (3 material in vanilla)
// go to 2 material. Sword/shovel/hoe are left at vanilla cost (1-2 material already,
// not a meaningful grind point). Same 5 tiers as vanilla, same tag/item per tier.
//
// Patterns are deliberately NOT mirror images of each other: Minecraft auto-matches a
// shaped recipe's horizontal mirror, so two recipes that are just left/right flips of the
// same shape would collide. Pickaxe uses a 3-row/2-col shape, axe a 2-row/2-col shape —
// different dimensions can't collide regardless of mirroring.
//
// Recipe ids and vanilla patterns verified against data/minecraft/recipes/*_pickaxe.json
// and *_axe.json in github.com/misode/mcmeta, tag 1.20.1-data.
ServerEvents.recipes(event => {
    const tiers = [
        { tool: 'wooden', material: '#minecraft:planks' },
        { tool: 'stone', material: '#minecraft:stone_tool_materials' },
        { tool: 'iron', material: 'minecraft:iron_ingot' },
        { tool: 'golden', material: 'minecraft:gold_ingot' },
        { tool: 'diamond', material: 'minecraft:diamond' }
    ]

    tiers.forEach(({ tool, material }) => {
        event.remove({ id: `minecraft:${tool}_pickaxe` })
        event.shaped(`minecraft:${tool}_pickaxe`, [
            'XX',
            ' #',
            ' #'
        ], { X: material, '#': 'minecraft:stick' })

        event.remove({ id: `minecraft:${tool}_axe` })
        event.shaped(`minecraft:${tool}_axe`, [
            'X#',
            'X#'
        ], { X: material, '#': 'minecraft:stick' })
    })
})
