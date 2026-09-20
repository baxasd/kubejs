// Register Satisfactory-style industrial components
StartupEvents.registry('item', event => {
  event.create('iron_screw').displayName('Iron Screw')
  event.create('reinforced_iron_plate').displayName('Reinforced Iron Plate')
  event.create('modular_frame').displayName('Modular Frame')
  event.create('rotor').displayName('Rotor')
  event.create('stator').displayName('Stator')
  event.create('motor').displayName('Motor')
})

// Register infinite resource node blocks
StartupEvents.registry('block', event => {
  const nodes = [
    { id: 'infinite_iron_node', name: 'Infinite Iron Deposit' },
    { id: 'infinite_copper_node', name: 'Infinite Copper Deposit' },
    { id: 'infinite_coal_node', name: 'Infinite Coal Deposit' },
    { id: 'infinite_gold_node', name: 'Infinite Gold Deposit' }
  ]

  nodes.forEach(node => {
    event.create(node.id)
      .displayName(node.name)
      .hardness(-1.0) // Unbreakable like Bedrock
      .resistance(3600000.0)
      .requiresTool(true)
      .tagBlock('minecraft:mineable/pickaxe')
  })
})