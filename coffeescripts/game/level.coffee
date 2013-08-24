Block = require "./entities/block.coffee"

class Level
  GRID_SIZE: 32
  constructor: (@app, @game) ->
    @scroll = new LDFW.Vector2()
    @gravity = new LDFW.Vector2(0, 1800)
    @platforms = [
      {
        position: new LDFW.Vector2(10, 400)
        width: 300
        height: 16
      },
      {
        position: new LDFW.Vector2(10, 100)
        width: 300
        height: 16
      }
    ]

    block = new Block(@app, @game)
    block.setGridPosition 5, 10
    @blocks = [ block ]

  update: (delta) ->
    # @scroll.setX @scroll.getX() + delta * 20
    return

  getBoundariesForPlayer: (player) ->
    playerWidth = 32
    playerHeight = 64
    player =
      top: player.getPosition().getY() - playerHeight
      bottom: player.getPosition().getY()
      left: player.getPosition().getX()
      right: player.getPosition().getX() + playerWidth

    boundaries =
      x:
        min: 0, max: player.left + @app.getWidth()
      y:
        min: -@app.getHeight(), max: @app.getHeight() * 2

    # Platform collision check
    for platform in @platforms
      platform =
        top: platform.position.y
        bottom: platform.position.y + platform.height
        left: platform.position.x
        right: platform.position.x + platform.width

      # Horizontal collision check
      unless player.bottom <= platform.top or
        player.top >= platform.bottom
          if player.right <= platform.left
            boundaries.x.max = Math.min(platform.left, boundaries.x.max)
          else if player.left >= platform.right
            boundaries.x.min = Math.max(platform.right, boundaries.x.min)

      # Vertical collision check
      unless player.right < platform.left or
        player.left > platform.right or
        player.bottom > platform.top
          boundaries.y.max = Math.min(platform.top, boundaries.y.max)

    # Blocks collision check
    for block in @blocks
      map = block.getMap()
      position = block.getGridPosition()
        .clone()
        .multiply(@GRID_SIZE)

      for row, y in map
        for segment, x in row
          continue if segment is 0

          segment =
            left: position.getX() + x * @GRID_SIZE
            right: position.getX() + (x + 1) * @GRID_SIZE
            top: position.getY() + y * @GRID_SIZE
            bottom: position.getY() + (y + 1) * @GRID_SIZE

          # Horizontal collision check
          unless player.bottom <= segment.top or player.top >= segment.bottom
            if player.right <= segment.left
              boundaries.x.max = Math.min(segment.left, boundaries.x.max)
            else if player.left >= segment.right
              boundaries.x.min = Math.max(segment.right, boundaries.x.min)

          # Vertical collision check
          unless player.left > segment.right or
            player.right < segment.left or
            player.bottom > segment.top
              boundaries.y.max = Math.min(segment.top, boundaries.y.max)

    return boundaries

  getScroll: -> @scroll
  getPlatforms: -> @platforms
  getBlocks: -> @blocks
  getGravity: -> @gravity

module.exports = Level
