class PlayerActor extends LDFW.Actor
  constructor: (@app, game) ->
    super @game

    @game  = game
    @level = @game.getLevel()

    @spritesAtlas = @app.getSpritesAtlas()

    @idleSprite = @spritesAtlas.createSprite "player/idle.png"
    @player = @game.getPlayer()
    @player.setSize @idleSprite.getWidth(), @idleSprite.getHeight()

    @runAnimSprite = @spritesAtlas.createAnimSprite "player/run.png", 2, 0.05
    @offgroundAnimSprite = @spritesAtlas.createAnimSprite "player/offground.png", 3, 0.1

    @caretSprite = @spritesAtlas.createSprite "ui/caret.png"

  update: (delta) ->
    @runAnimSprite.update delta
    @offgroundAnimSprite.update delta

  draw: (context) ->
    playerPosition = @player.getPosition()
    scroll = @level.getScroll()

    rx = playerPosition.x - scroll.getX()
    ry = playerPosition.y - @idleSprite.getHeight() - scroll.getY()

    rx += @game.globalRenderOffset.x
    ry += @game.globalRenderOffset.y

    mirrored = @player.getDirection() == -1

    if @player.isOnGround()
      onGroundObject = @player.getOnGroundObject()
      if offset = onGroundObject.getFloatOffset?()
        ry += offset.y

    unless @player.isOnGround()
      @offgroundAnimSprite.draw context, rx, ry, mirrored
    else if @player.getVelocity().getX() isnt 0
      @runAnimSprite.draw context, rx, ry, mirrored
    else
      @idleSprite.draw context, rx, ry, mirrored

    if ry + @idleSprite.getHeight() < 40
      @caretSprite.draw context, rx + @idleSprite.getWidth() / 2 - @caretSprite.getWidth() / 2, 40


module.exports = PlayerActor
