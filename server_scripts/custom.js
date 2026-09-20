// Early-game tedium reduction: keep the wood/stone/iron tiers, but stop making
// the player grind ore 1:1 through a furnace before they can automate anything.
// Same XP as vanilla, double ingot yield, half the cook time.
ServerEvents.recipes(event => {
    // Vanilla 1.20.1 splits these into per-input recipes (ore/deepslate_ore/raw item),
    // so remove by output+type rather than guessing individual recipe ids.
    event.remove({ output: 'minecraft:iron_ingot', type: 'minecraft:smelting' })
    event.remove({ output: 'minecraft:iron_ingot', type: 'minecraft:blasting' })
    event.remove({ output: 'minecraft:copper_ingot', type: 'minecraft:smelting' })
    event.remove({ output: 'minecraft:copper_ingot', type: 'minecraft:blasting' })

    event.smelting('2x minecraft:iron_ingot', ['#minecraft:iron_ores', 'minecraft:raw_iron']).xp(0.7).cookingTime(100)
    event.blasting('2x minecraft:iron_ingot', ['#minecraft:iron_ores', 'minecraft:raw_iron']).xp(0.7).cookingTime(50)

    event.smelting('2x minecraft:copper_ingot', ['#minecraft:copper_ores', 'minecraft:raw_copper']).xp(0.7).cookingTime(100)
    event.blasting('2x minecraft:copper_ingot', ['#minecraft:copper_ores', 'minecraft:raw_copper']).xp(0.7).cookingTime(50)
})
