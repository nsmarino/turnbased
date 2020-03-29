/// <reference path="../p5.global-mode.d.ts" />

// MODELS - list of properties which are fed into state, 
// where they receive methods

const hawk = {
  name: 'Hawk',
  health: 150,
  currentHealth: 150,
  level: 10,
  color: 'black',
  avatar: () => {
    fill('black')
    rect(100,300,150,300)
  },
  moveset: [
      {
          title: 'Electric Shock',
          damage: 20,
          order: 1,
      },
      {
          title: 'Fire Blast',
          damage: 10,
          order: 2,
      
      }
  ]
}
const enemy = {
  name: 'Enemy',
  health: 100,
  currentHealth: 100,
  level: 8,
  color: 'black',
  avatar: () => {
    fill('black')
    rect(600, 100, 75, 150)
  },
  moveset: [
      {
          title: 'Strike',
          damage: 10,
          order: 1,
      },
      {
          title: 'Shock',
          damage: 5,
          order: 2,
      
      }
  ]
}

// CONTROLLERS - Add various methods to models in state
function Character({name, health, currentHealth, level, color, avatar, moveset}) {
  let character = {
    name,
    health,
    currentHealth,
    level,
    color,
    avatar,
    moveset,
  }
  return Object.assign(
    character,
    hasShow(character)
  )
}

function Enemy({name, health, currentHealth, level, color, avatar, moveset}) {
  let enemy = {
    name,
    health,
    currentHealth,
    level,
    color,
    avatar,
    moveset,
  }
  return Object.assign(
    enemy,
    hasShow(enemy),
    hasEnemyAttack(enemy)
  )
}

// METHOD CREATORS
const hasShow = state => ({
  show() {
    state.avatar()
  }
})
const hasEnemyAttack = obj => ({
  attack() {
    timer++;     
    if (timer > 150) {
      timer = 0
      state.player.currentHealth -= 10
      for (const button of buttons) {
        button.show()
      }
      state.turn = !state.turn
    } 
  }    
})


// EVENT HANDLERS
const handleMove = move => {
  state.enemy.currentHealth -= move.damage
  for (const button of buttons) {
    button.hide()
  }
  // status.hide()
  // label.hide()
  state.turn = !state.turn
}


// STATE
const state = {
  player: new Character(hawk),
  enemy: new Enemy(enemy),
  turn: true,
  mode: 'combat',
}
let timer = 0
let container, label, status
let enemyContainer, enemyLabel, enemyStatus
let buttons = []


// VIEW - render conditionally
function setup() {
  createCanvas(800, 600);

  // player status bar
  container = createDiv().addClass('test')
  container.style('display', 'flex')
  container.style('flex-direction', 'column')
  container.style('width', '100px')
  container.position(500, 450, 'fixed');

  label = createDiv(`${state.player.name}`)
  label.parent(container)
  status = createDiv(`HP: ${state.player.currentHealth} / ${state.player.health}`)
  status.parent(container)
 
  for (const move of state.player.moveset) {
    const btn = createButton(move.title)
    btn.parent(container)
    buttons.push(btn)
    btn.mousePressed(() => handleMove(move))
  }

  // enemy status bar
  enemyContainer = createDiv()
  enemyContainer.style('display', 'flex')
  enemyContainer.style('flex-direction', 'column')
  enemyContainer.style('width', '100px')
  enemyContainer.position(100, 100, 'fixed');

  enemyLabel = createDiv(`${state.enemy.name}`)
  enemyLabel.parent(enemyContainer)
  enemyStatus = createDiv(`HP: ${state.enemy.currentHealth} / ${state.enemy.health}`)
  enemyStatus.parent(enemyContainer)
}

function draw() {
  if (state.mode === 'combat') {
    background('#eee');

    if(!state.turn) state.enemy.attack()

    status.html(`HP: ${state.player.currentHealth} / ${state.player.health}`)
    enemyStatus.html(`HP: ${state.enemy.currentHealth} / ${state.enemy.health}`)
  
    state.player.show()
    state.enemy.show()
    if (state.enemy.currentHealth <= 0) {
      state.mode = 'world'
    }
  } else {
    background('green')
    text('you win', width/2, height/2)
    status.hide()
    label.hide()
    enemyStatus.hide()
    enemyLabel.hide()
    console.log('loop?')
    noLoop()
  }
}

// function mousePressed() {
//   for (const button of buttons) {
//     turn ? button.hide() : button.show()
//   }
//   turn ? status.hide() : status.show()
//   turn = !turn
// }

