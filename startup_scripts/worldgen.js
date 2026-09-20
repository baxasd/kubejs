WorldgenEvents.add(event => {
  const { anchors } = event

  const nodeSpawns = [
    { block: 'kubejs:infinite_iron_node', chance: 0.15 },
    { block: 'kubejs:infinite_copper_node', chance: 0.15 },
    { block: 'kubejs:infinite_coal_node', chance: 0.20 },
    { block: 'kubejs:infinite_gold_node', chance: 0.08 }
  ]

  nodeSpawns.forEach(node => {
    event.addOre(ore => {
      ore.biomes = '#minecraft:is_overworld'
      ore.targets = [
        Target.replacement('minecraft:grass_block', node.block),
        Target.replacement('minecraft:stone', node.block)
      ]
      ore.size = 1
      ore.count = 1
      ore.chance = node.chance
      ore.squaredHeight(anchors.absolute(60), anchors.absolute(120))
    })
  })
})