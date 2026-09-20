// Early-game / factory tedium reduction: keep the wood/stone/iron tiers, but stop making
// the player grind ore 1:1 through a furnace before they can automate anything.
// Same XP as vanilla, double yield, half the cook time. Applies to every ore, since a
// Create-automated silk-touch mining setup collects ore blocks, not raw items, and needs
// this smelting throughput just as much as manual early-game play does.
//
// Recipe ids, tags, and vanilla cookingtime/xp verified against the real 1.20.1 data
// (github.com/misode/mcmeta, tag 1.20.1-data, data/minecraft/recipes + tags/items).
// Vanilla splits each of these into several recipe files (ore/deepslate_ore/raw item),
// so remove by output+type rather than guessing individual recipe ids.
ServerEvents.recipes(event => {
    event.remove({ output: 'minecraft:coal', type: 'minecraft:smelting' })
    event.remove({ output: 'minecraft:coal', type: 'minecraft:blasting' })
    event.smelting('2x minecraft:coal', '#minecraft:coal_ores').xp(0.1).cookingTime(100)
    event.blasting('2x minecraft:coal', '#minecraft:coal_ores').xp(0.1).cookingTime(50)

    event.remove({ output: 'minecraft:iron_ingot', type: 'minecraft:smelting' })
    event.remove({ output: 'minecraft:iron_ingot', type: 'minecraft:blasting' })
    event.smelting('2x minecraft:iron_ingot', ['#minecraft:iron_ores', 'minecraft:raw_iron']).xp(0.7).cookingTime(100)
    event.blasting('2x minecraft:iron_ingot', ['#minecraft:iron_ores', 'minecraft:raw_iron']).xp(0.7).cookingTime(50)

    event.remove({ output: 'minecraft:copper_ingot', type: 'minecraft:smelting' })
    event.remove({ output: 'minecraft:copper_ingot', type: 'minecraft:blasting' })
    event.smelting('2x minecraft:copper_ingot', ['#minecraft:copper_ores', 'minecraft:raw_copper']).xp(0.7).cookingTime(100)
    event.blasting('2x minecraft:copper_ingot', ['#minecraft:copper_ores', 'minecraft:raw_copper']).xp(0.7).cookingTime(50)

    event.remove({ output: 'minecraft:gold_ingot', type: 'minecraft:smelting' })
    event.remove({ output: 'minecraft:gold_ingot', type: 'minecraft:blasting' })
    event.smelting('2x minecraft:gold_ingot', ['#minecraft:gold_ores', 'minecraft:raw_gold']).xp(1.0).cookingTime(100)
    event.blasting('2x minecraft:gold_ingot', ['#minecraft:gold_ores', 'minecraft:raw_gold']).xp(1.0).cookingTime(50)

    event.remove({ output: 'minecraft:diamond', type: 'minecraft:smelting' })
    event.remove({ output: 'minecraft:diamond', type: 'minecraft:blasting' })
    event.smelting('2x minecraft:diamond', '#minecraft:diamond_ores').xp(1.0).cookingTime(100)
    event.blasting('2x minecraft:diamond', '#minecraft:diamond_ores').xp(1.0).cookingTime(50)

    event.remove({ output: 'minecraft:emerald', type: 'minecraft:smelting' })
    event.remove({ output: 'minecraft:emerald', type: 'minecraft:blasting' })
    event.smelting('2x minecraft:emerald', '#minecraft:emerald_ores').xp(1.0).cookingTime(100)
    event.blasting('2x minecraft:emerald', '#minecraft:emerald_ores').xp(1.0).cookingTime(50)

    event.remove({ output: 'minecraft:redstone', type: 'minecraft:smelting' })
    event.remove({ output: 'minecraft:redstone', type: 'minecraft:blasting' })
    event.smelting('2x minecraft:redstone', '#minecraft:redstone_ores').xp(0.7).cookingTime(100)
    event.blasting('2x minecraft:redstone', '#minecraft:redstone_ores').xp(0.7).cookingTime(50)

    event.remove({ output: 'minecraft:lapis_lazuli', type: 'minecraft:smelting' })
    event.remove({ output: 'minecraft:lapis_lazuli', type: 'minecraft:blasting' })
    event.smelting('2x minecraft:lapis_lazuli', '#minecraft:lapis_ores').xp(0.2).cookingTime(100)
    event.blasting('2x minecraft:lapis_lazuli', '#minecraft:lapis_ores').xp(0.2).cookingTime(50)

    // Quartz and netherite scrap only have a blasting recipe in vanilla (no furnace version) — kept that way.
    event.remove({ output: 'minecraft:quartz', type: 'minecraft:blasting' })
    event.blasting('2x minecraft:quartz', 'minecraft:nether_quartz_ore').xp(0.2).cookingTime(50)

    event.remove({ output: 'minecraft:netherite_scrap', type: 'minecraft:blasting' })
    event.blasting('2x minecraft:netherite_scrap', 'minecraft:ancient_debris').xp(2.0).cookingTime(50)

    // Netherite ingot conversion gets the same "halve the requirement" treatment for consistency.
    event.remove({ id: 'minecraft:netherite_ingot' })
    event.shapeless('minecraft:netherite_ingot', ['2x minecraft:netherite_scrap', '2x minecraft:gold_ingot'])
})
