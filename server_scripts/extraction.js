BlockEvents.broken(event => {
  const { block, level } = event

  const dropMap = {
    'kubejs:infinite_iron_node': 'minecraft:raw_iron',
    'kubejs:infinite_copper_node': 'minecraft:raw_copper',
    'kubejs:infinite_coal_node': 'minecraft:coal',
    'kubejs:infinite_gold_node': 'minecraft:raw_gold'
  }

  if (dropMap[block.id]) {
    event.cancel() // Stop block destruction
    level.spawnItem(block.pos.above(), dropMap[block.id])
    level.playSound(null, block.pos, 'minecraft:block.stone.hit', 'blocks', 0.5, 1.0)
  }
})