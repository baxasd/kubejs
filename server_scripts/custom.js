// Make vanilla ores infinite when broken
BlockEvents.broken(event => {
  const { block, level, player } = event

  const dropMap = {
    'minecraft:iron_ore': 'minecraft:raw_iron',
    'minecraft:deepslate_iron_ore': 'minecraft:raw_iron',
    'minecraft:copper_ore': 'minecraft:raw_copper',
    'minecraft:deepslate_copper_ore': 'minecraft:raw_copper',
    'minecraft:coal_ore': 'minecraft:coal',
    'minecraft:deepslate_coal_ore': 'minecraft:coal',
    'minecraft:gold_ore': 'minecraft:raw_gold',
    'minecraft:deepslate_gold_ore': 'minecraft:raw_gold'
  }

  const dropItem = dropMap[block.id]

  if (dropItem) {
    // 1. Cancel default block destruction
    event.cancel()

    // 2. Spawn the item drop at the block's position
    let itemEntity = level.createEntity('item')
    itemEntity.x = block.pos.x + 0.5
    itemEntity.y = block.pos.y + 1.0
    itemEntity.z = block.pos.z + 0.5
    itemEntity.item = dropItem
    itemEntity.spawn()

    // 3. Play hit sound
    level.playSound(null, block.pos, 'minecraft:block.stone.hit', 'blocks', 0.5, 1.0)
  }
})

// Recipes
ServerEvents.recipes(event => {
    // Armor Cost Reduction
    const armorTiers = [
        { tool: 'iron', material: 'minecraft:iron_ingot' },
        { tool: 'golden', material: 'minecraft:gold_ingot' },
        { tool: 'diamond', material: 'minecraft:diamond' }
    ]

    armorTiers.forEach(tier => {
        event.remove({ id: 'minecraft:' + tier.tool + '_helmet' })
        event.shaped('minecraft:' + tier.tool + '_helmet', ['XX', 'XX'], { X: tier.material })

        event.remove({ id: 'minecraft:' + tier.tool + '_chestplate' })
        event.shaped('minecraft:' + tier.tool + '_chestplate', ['XX', 'XX', 'XX'], { X: tier.material })

        event.remove({ id: 'minecraft:' + tier.tool + '_leggings' })
        event.shaped('minecraft:' + tier.tool + '_leggings', ['XX', 'XX', 'X '], { X: tier.material })

        event.remove({ id: 'minecraft:' + tier.tool + '_boots' })
        event.shaped('minecraft:' + tier.tool + '_boots', ['X', 'X', 'X'], { X: tier.material })
    })

    // Smelting / Blasting Adjustments
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

    event.remove({ output: 'minecraft:quartz', type: 'minecraft:blasting' })
    event.blasting('2x minecraft:quartz', 'minecraft:nether_quartz_ore').xp(0.2).cookingTime(50)

    event.remove({ output: 'minecraft:netherite_scrap', type: 'minecraft:blasting' })
    event.blasting('2x minecraft:netherite_scrap', 'minecraft:ancient_debris').xp(2.0).cookingTime(50)

    event.remove({ id: 'minecraft:netherite_ingot' })
    event.shapeless('minecraft:netherite_ingot', ['2x minecraft:netherite_scrap', '2x minecraft:gold_ingot'])

    // Tool Cost Reduction
    const toolTiers = [
        { tool: 'wooden', material: '#minecraft:planks' },
        { tool: 'stone', material: '#minecraft:stone_tool_materials' },
        { tool: 'iron', material: 'minecraft:iron_ingot' },
        { tool: 'golden', material: 'minecraft:gold_ingot' },
        { tool: 'diamond', material: 'minecraft:diamond' }
    ]

    toolTiers.forEach(tier => {
        event.remove({ id: 'minecraft:' + tier.tool + '_pickaxe' })
        event.shaped('minecraft:' + tier.tool + '_pickaxe', ['XX', ' S', ' S'], { X: tier.material, S: 'minecraft:stick' })

        event.remove({ id: 'minecraft:' + tier.tool + '_axe' })
        event.shaped('minecraft:' + tier.tool + '_axe', ['XS', 'XS'], { X: tier.material, S: 'minecraft:stick' })
    })
})