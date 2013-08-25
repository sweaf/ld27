Level    = require "./level.coffee"
Player   = require "./player.coffee"
Keyboard = require "./utilities/keyboard.coffee"
Mouse    = require "./utilities/mouse.coffee"
Powerups = require "./powerups.coffee"

class Game
  powerupDuration: 10000
  constructor: (@app) ->
    @defaultScrollSpeed = 200
    @scrollSpeed = @defaultScrollSpeed

    @increaseScrollSpeedAfter  = 100
    @scrollSpeedIncreaseFactor = 100

    @scroll   = new LDFW.Vector2(0, 0) # actually, this is the score...

    @keyboard = new Keyboard()
    @mouse    = new Mouse @app

    @level = new Level @app, this
    @player = new Player @app, this

    @activePowerup = Powerups.BROKEN_BLOCKS
    @powerupStart  = +new Date()

    firstPlatform = @level.getPlatforms()[0]
    @player.setPosition(
      firstPlatform.getPosition().x * @level.GRID_SIZE + firstPlatform.getWidth() * @level.GRID_SIZE / 2,
      firstPlatform.getPosition().y * @level.GRID_SIZE - 100
    )

  update: (delta) ->
    @scroll.setX Math.round(@scroll.getX() + @scrollSpeed * delta)

    if @getScore() > @increaseScrollSpeedAfter
      @defaultScrollSpeed += 50
      @setDefaultScrollSpeed()

      @increaseScrollSpeedAfter += @scrollSpeedIncreaseFactor
      @scrollSpeedIncreaseFactor += 50

    @level.update delta
    @player.update delta

    if +new Date() - @powerupStart >= @powerupDuration
      @activePowerup = @getRandomPowerup()
      @powerupStart = +new Date()

  getRandomPowerup: ->
    powerups = Object.keys(Powerups)
    powerupKey = powerups[Math.floor(Math.random() * powerups.length)]
    return Powerups[powerupKey]

  setScrollSpeed: (@scrollSpeed) -> return
  setDefaultScrollSpeed: -> @scrollSpeed = @defaultScrollSpeed

  getPowerupTimeleft: -> @powerupDuration - (+new Date() - @powerupStart)
  getActivePowerup: -> @activePowerup

  getScore: -> Math.round(@scroll.getX() / 50)
  getScroll: -> @scroll
  getScrollSpeed: -> @scrollSpeed
  getDefaultScrollSpeed: -> @defaultScrollSpeed
  getLevel: -> @level
  getPlayer: -> @player
  getKeyboard: -> @keyboard
  getMouse: -> @mouse

module.exports = Game
