// Early-game tedium reduction: keep the wood/stone/iron tiers, but stop making
// the player grind ore 1:1 through a furnace before they can automate anything.
// Same XP as vanilla, double ingot yield, half the cook time.
ServerEvents.recipes(event => {
    event.remove({ id: 'minecraft:iron_ingot_from_smelting' })
    event.remove({ id: 'minecraft:iron_ingot_from_blasting' })
    event.remove({ id: 'minecraft:copper_ingot_from_smelting' })
    event.remove({ id: 'minecraft:copper_ingot_from_blasting' })

    event.smelting([Item.of('minecraft:iron_ingot', 2)], '#minecraft:iron_ores').xp(0.7).cookingTime(100)
    event.blasting([Item.of('minecraft:iron_ingot', 2)], '#minecraft:iron_ores').xp(0.7).cookingTime(50)

    event.smelting([Item.of('minecraft:copper_ingot', 2)], '#minecraft:copper_ores').xp(0.7).cookingTime(100)
    event.blasting([Item.of('minecraft:copper_ingot', 2)], '#minecraft:copper_ores').xp(0.7).cookingTime(50)
})
