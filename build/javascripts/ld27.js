;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BoostActor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BoostActor = (function(_super) {
  __extends(BoostActor, _super);

  function BoostActor(app, game) {
    this.app = app;
    this.game = game;
    BoostActor.__super__.constructor.call(this, this.game);
  }

  return BoostActor;

})(LDFW.Actor);

module.exports = BoostActor;


},{}],2:[function(require,module,exports){
var Config, FuckingPiranhasActor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Config = require("../config/config.json");

FuckingPiranhasActor = (function(_super) {
  __extends(FuckingPiranhasActor, _super);

  function FuckingPiranhasActor(app, game, options) {
    this.app = app;
    this.game = game;
    this.options = options != null ? options : {};
    this.position = this.options.position || new LDFW.Vector2(0, 0);
    this.width = 6;
    this.height = 6;
    this.spritesAtlas = this.app.getSpritesAtlas();
    this.backgroundSprite = this.spritesAtlas.createSprite("obstacles/fucking-piranhas/fucking-piranhas-background.png");
    this.glassSprite = this.spritesAtlas.createSprite("obstacles/fucking-piranhas/fucking-piranhas-glass.png");
  }

  FuckingPiranhasActor.prototype.update = function() {};

  FuckingPiranhasActor.prototype.draw = function(context, x, y) {
    this.backgroundSprite.draw(context, x, y);
    this.glassSprite.draw(context, x, y);
  };

  FuckingPiranhasActor.prototype.getWidth = function() {
    return this.width;
  };

  FuckingPiranhasActor.prototype.getHeight = function() {
    return this.height;
  };

  return FuckingPiranhasActor;

})(LDFW.Actor);

module.exports = FuckingPiranhasActor;


},{"../config/config.json":9}],3:[function(require,module,exports){
var HeadlineActor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HeadlineActor = (function(_super) {
  __extends(HeadlineActor, _super);

  function HeadlineActor(app, game) {
    this.app = app;
    this.game = game;
    HeadlineActor.__super__.constructor.call(this, this.game);
    this.fontOffset = new LDFW.Vector2(16, 8);
    this.spritesAtlas = this.app.getSpritesAtlas();
    this.fontsAtlas = this.app.getFontsAtlas();
    this.background = this.spritesAtlas.createSprite("ui/headline.png");
    this.font = new LDFW.BitmapFont(this.app.getPreloader().get("assets/fonts/pixel-8-white.fnt"), this.fontsAtlas.findRegion("pixel-8-white.png"));
    this.redFont = new LDFW.BitmapFont(this.app.getPreloader().get("assets/fonts/pixel-8-red.fnt"), this.fontsAtlas.findRegion("pixel-8-red.png"));
  }

  HeadlineActor.prototype.drawPowerupCountdown = function(context) {
    var powerupBounds, powerupText, powerupTimeLeft;
    powerupText = "NEXT POWERUP IN ";
    powerupBounds = this.font.getBounds(powerupText);
    this.font.drawText(context, powerupText, this.fontOffset.getX(), this.fontOffset.getY());
    powerupTimeLeft = Math.ceil(this.game.getPowerupTimeleft() / 1000).toString();
    if (powerupTimeLeft.length === 1) {
      powerupTimeLeft = "0" + powerupTimeLeft;
    }
    return this.redFont.drawText(context, "0:" + powerupTimeLeft, this.fontOffset.getX() + powerupBounds.width, this.fontOffset.getY());
  };

  HeadlineActor.prototype.drawScore = function(context) {
    var scoreBounds, scoreText;
    scoreText = "" + (this.game.getScore()) + "m";
    scoreBounds = this.font.getBounds(scoreText);
    return this.font.drawText(context, scoreText, this.app.getWidth() - this.fontOffset.getX() - scoreBounds.getWidth(), this.fontOffset.getY());
  };

  HeadlineActor.prototype.draw = function(context) {
    this.background.draw(context);
    this.drawPowerupCountdown(context);
    return this.drawScore(context);
  };

  return HeadlineActor;

})(LDFW.Actor);

module.exports = HeadlineActor;


},{}],4:[function(require,module,exports){
var Config, LevelActor, Powerups,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Config = require("../config/config.json");

Powerups = require("../powerups.coffee");

LevelActor = (function(_super) {
  __extends(LevelActor, _super);

  function LevelActor(app, game) {
    this.app = app;
    this.game = game;
    LevelActor.__super__.constructor.call(this, this.game);
    this.spritesAtlas = this.app.getSpritesAtlas();
    this.backgroundSprite = this.spritesAtlas.createSprite("background.png");
    this.prepareSprites();
    this.level = this.game.getLevel();
  }

  LevelActor.prototype.prepareSprites = function() {
    var sprite, spriteIndex, style, styles, _base, _i, _j, _k, _l, _len, _m, _ref, _ref1, _ref2, _ref3, _results;
    this.blockSprites = {};
    styles = (function() {
      _results = [];
      for (var _i = 0, _ref = Config.block_styles; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this);
    styles.push("broken");
    for (_j = 0, _len = styles.length; _j < _len; _j++) {
      style = styles[_j];
      if ((_base = this.blockSprites)[style] == null) {
        _base[style] = {};
      }
      for (spriteIndex = _k = 0, _ref1 = Config.sprites_per_block_style; 0 <= _ref1 ? _k < _ref1 : _k > _ref1; spriteIndex = 0 <= _ref1 ? ++_k : --_k) {
        sprite = this.spritesAtlas.createSprite("blocks/" + style + "-" + spriteIndex + ".png");
        this.blockSprites[style][spriteIndex] = sprite;
      }
      this.blockSprites[style]["unbuildable"] = this.spritesAtlas.createSprite("blocks/" + style + "-unbuildable.png");
    }
    this.grassSprites = {};
    for (spriteIndex = _l = 0, _ref2 = Config.sprites_per_block_style; 0 <= _ref2 ? _l < _ref2 : _l > _ref2; spriteIndex = 0 <= _ref2 ? ++_l : --_l) {
      sprite = this.spritesAtlas.createSprite("grass/grass-" + spriteIndex + ".png");
      this.grassSprites[spriteIndex] = sprite;
    }
    this.grassSprites["start"] = this.spritesAtlas.createSprite("grass/grass-start.png");
    this.grassSprites["end"] = this.spritesAtlas.createSprite("grass/grass-end.png");
    this.grassSprites["single"] = this.spritesAtlas.createSprite("grass/grass-single.png");
    this.tileSprites = {};
    for (spriteIndex = _m = 0, _ref3 = Config.sprites_per_block_style; 0 <= _ref3 ? _m < _ref3 : _m > _ref3; spriteIndex = 0 <= _ref3 ? ++_m : --_m) {
      sprite = this.spritesAtlas.createSprite("platform/platform-" + spriteIndex + ".png");
      this.tileSprites[spriteIndex] = sprite;
    }
    this.tileSprites["start"] = this.spritesAtlas.createSprite("platform/platform-start.png");
    return this.tileSprites["end"] = this.spritesAtlas.createSprite("platform/platform-end.png");
  };

  LevelActor.prototype.update = function(delta) {
    var obstacle, obstacles, _i, _len, _results;
    obstacles = this.level.getObstacles();
    _results = [];
    for (_i = 0, _len = obstacles.length; _i < _len; _i++) {
      obstacle = obstacles[_i];
      _results.push(obstacle.update(delta));
    }
    return _results;
  };

  LevelActor.prototype.draw = function(context) {
    context.save();
    this.backgroundSprite.draw(context);
    this.drawPlatforms(context);
    this.drawBlocks(context);
    this.drawBuildBlock(context);
    this.drawObstacles(context);
    return context.restore();
  };

  LevelActor.prototype.drawObstacles = function(context) {
    var obstacle, obstacles, position, scroll, _i, _len, _results;
    obstacles = this.level.getObstacles();
    scroll = this.level.getScroll();
    _results = [];
    for (_i = 0, _len = obstacles.length; _i < _len; _i++) {
      obstacle = obstacles[_i];
      position = obstacle.getPosition().clone().multiply(this.level.GRID_SIZE);
      _results.push(obstacle.draw(context, position.x - scroll.getX(), position.y - scroll.getY()));
    }
    return _results;
  };

  LevelActor.prototype.drawPlatforms = function(context) {
    var grassSprite, grassXOffset, height, platform, platforms, position, scroll, spriteIndex, stylesMap, tileSprite, width, x, y, _i, _j, _k, _len, _ref, _ref1, _results;
    platforms = this.level.getPlatforms();
    scroll = this.level.getScroll();
    _results = [];
    for (_i = 0, _len = platforms.length; _i < _len; _i++) {
      platform = platforms[_i];
      stylesMap = platform.getStylesMap();
      position = platform.getPosition().clone().multiply(this.level.GRID_SIZE);
      width = platform.getWidth() * this.level.GRID_SIZE;
      height = platform.getHeight() * this.level.GRID_SIZE;
      for (y = _j = 0, _ref = platform.getHeight(); 0 <= _ref ? _j < _ref : _j > _ref; y = 0 <= _ref ? ++_j : --_j) {
        for (x = _k = 0, _ref1 = platform.getWidth(); 0 <= _ref1 ? _k < _ref1 : _k > _ref1; x = 0 <= _ref1 ? ++_k : --_k) {
          spriteIndex = stylesMap[y][x];
          tileSprite = this.tileSprites[spriteIndex];
          if (x === 0) {
            tileSprite = this.tileSprites.start;
          }
          if (x === platform.getWidth() - 1) {
            tileSprite = this.tileSprites.end;
          }
          tileSprite.draw(context, position.x + x * this.level.GRID_SIZE - scroll.getX(), position.y + y * this.level.GRID_SIZE - scroll.getY());
        }
      }
      _results.push((function() {
        var _l, _ref2, _results1;
        _results1 = [];
        for (x = _l = 0, _ref2 = platform.width; 0 <= _ref2 ? _l < _ref2 : _l > _ref2; x = 0 <= _ref2 ? ++_l : --_l) {
          grassSprite = this.grassSprites[0];
          grassXOffset = 0;
          if (platform.width === 1) {
            grassSprite = this.grassSprites.single;
            grassXOffset = -2;
          } else if (x === 0) {
            grassSprite = this.grassSprites.start;
            grassXOffset = -2;
          } else if (x === platform.width - 1) {
            grassSprite = this.grassSprites.end;
          }
          _results1.push(grassSprite.draw(context, position.x + x * this.level.GRID_SIZE + grassXOffset - scroll.getX(), position.y - scroll.getY()));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  LevelActor.prototype.drawBuildBlock = function(context) {
    var blocks, scroll;
    if (!this.level.inBuildMode()) {
      return;
    }
    scroll = this.level.getScroll();
    blocks = this.level.getBlocks();
    return this.drawBlock(this.level.getBuildBlock(), context, true);
  };

  LevelActor.prototype.drawBlocks = function(context) {
    var block, blocks, scroll, _i, _len, _results;
    scroll = this.level.getScroll();
    blocks = this.level.getBlocks();
    _results = [];
    for (_i = 0, _len = blocks.length; _i < _len; _i++) {
      block = blocks[_i];
      _results.push(this.drawBlock(block, context));
    }
    return _results;
  };

  LevelActor.prototype.drawBlock = function(block, context, isBuildBlock) {
    var blockStyles, drawGrass, grassSprite, grassXOffset, map, position, row, scroll, segment, sprite, spriteIndex, style, x, y, _i, _j, _len, _len1;
    if (isBuildBlock == null) {
      isBuildBlock = false;
    }
    scroll = this.level.getScroll();
    map = block.getMap();
    style = block.getStyle();
    blockStyles = block.getBlockStyles();
    context.save();
    position = block.getGridPosition().clone().multiply(this.level.GRID_SIZE).substract(scroll);
    for (y = _i = 0, _len = map.length; _i < _len; y = ++_i) {
      row = map[y];
      for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
        segment = row[x];
        if (segment === 0) {
          continue;
        }
        spriteIndex = blockStyles[y][x];
        sprite = this.blockSprites[style][spriteIndex];
        if (!this.level.isBuildBlockBuildable() && isBuildBlock) {
          sprite = this.blockSprites[style].unbuildable;
        }
        if (isBuildBlock) {
          context.globalAlpha = 0.5;
        }
        sprite.draw(context, position.x + x * this.level.GRID_SIZE, position.y + y * this.level.GRID_SIZE);
        drawGrass = true;
        if (y !== 0) {
          if (map[y - 1][x] === 1) {
            drawGrass = false;
          }
        }
        if (drawGrass && style !== "broken") {
          grassSprite = this.grassSprites[spriteIndex];
          grassXOffset = 0;
          if (!row[x - 1] && !row[x + 1]) {
            grassSprite = this.grassSprites.single;
            grassXOffset = -2;
          } else if (!row[x - 1]) {
            grassSprite = this.grassSprites.start;
            grassXOffset = -2;
          } else if (!row[x + 1]) {
            grassSprite = this.grassSprites.end;
          }
          grassSprite.draw(context, position.x + x * this.level.GRID_SIZE + grassXOffset, position.y + y * this.level.GRID_SIZE);
        }
      }
    }
    return context.restore();
  };

  return LevelActor;

})(LDFW.Actor);

module.exports = LevelActor;


},{"../config/config.json":9,"../powerups.coffee":16}],5:[function(require,module,exports){
var MinimapActor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MinimapActor = (function(_super) {
  __extends(MinimapActor, _super);

  function MinimapActor(app, game) {
    this.app = app;
    this.game = game;
    MinimapActor.__super__.constructor.call(this, this.game);
    this.spritesAtlas = this.app.getSpritesAtlas();
    this.background = this.spritesAtlas.createSprite("ui/minimap.png");
    this.background.setPosition(0, this.app.getHeight() - this.background.getHeight());
  }

  MinimapActor.prototype.update = function(delta) {};

  MinimapActor.prototype.draw = function(context) {
    return this.background.draw(context);
  };

  return MinimapActor;

})(LDFW.Actor);

module.exports = MinimapActor;


},{}],6:[function(require,module,exports){
var PLAYER_HEIGHT, PLAYER_WIDTH, PlayerActor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PLAYER_WIDTH = 32;

PLAYER_HEIGHT = 64;

PlayerActor = (function(_super) {
  __extends(PlayerActor, _super);

  function PlayerActor(app, game) {
    this.app = app;
    PlayerActor.__super__.constructor.call(this, this.game);
    this.game = game;
    this.level = this.game.getLevel();
    this.player = this.game.getPlayer();
  }

  PlayerActor.prototype.update = function(delta) {};

  PlayerActor.prototype.draw = function(context) {
    var playerPosition, scroll;
    playerPosition = this.player.getPosition();
    scroll = this.level.getScroll();
    context.save();
    context.fillStyle = "green";
    context.fillRect(playerPosition.x - scroll.getX(), playerPosition.y - PLAYER_HEIGHT - scroll.getY(), PLAYER_WIDTH, PLAYER_HEIGHT);
    return context.restore();
  };

  return PlayerActor;

})(LDFW.Actor);

module.exports = PlayerActor;


},{}],7:[function(require,module,exports){
var LD27;

LD27 = require("./ld27.coffee");

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
    return window.setTimeout(callback, 1000 / 60);
  };
})();

$(function() {
  var game, wrapper;
  wrapper = $(".canvas-wrapper");
  return game = new LD27(wrapper);
});


},{"./ld27.coffee":13}],8:[function(require,module,exports){
module.exports=module.exports=[
  [
    [ 1, 1, 1, 1 ]
  ],
  [
    [ 1, 0, 0 ],
    [ 1, 1, 1 ]
  ],
  [
    [ 0, 0, 1 ],
    [ 1, 1, 1 ]
  ],
  [
    [ 1, 1 ],
    [ 1, 1 ]
  ],
  [
    [ 0, 1, 1 ],
    [ 1, 1, 0 ]
  ],
  [
    [ 0, 1, 0 ],
    [ 1, 1, 1 ]
  ],
  [
    [ 1, 1, 0 ],
    [ 0, 1, 1 ]
  ],
]

},{}],9:[function(require,module,exports){
module.exports=module.exports={
  "block_styles": 3,
  "sprites_per_block_style": 3,

  "ui_minimap_height": 74
}

},{}],10:[function(require,module,exports){
var Block, Config;

Config = require("../config/config.json");

Block = (function() {
  Block.prototype.availableBlocks = require("../config/available_blocks.json");

  function Block(app, game, options) {
    this.app = app;
    this.game = game;
    this.options = options != null ? options : {};
    this.buildMode = this.options.buildMode || false;
    this.map = null;
    this.rotation = Math.round(Math.random() * 3);
    this.gridPosition = new LDFW.Vector2();
    this.randomize();
    this.defaultStyle = Math.floor(Math.random() * Config.block_styles);
    this.style = this.defaultStyle;
    this.randomizeBlockStyles();
  }

  Block.prototype.setStyle = function(style) {
    this.style = style;
  };

  Block.prototype.setDefaultStyle = function() {
    return this.style = this.defaultStyle;
  };

  Block.prototype.randomizeBlockStyles = function() {
    var col, r, row, _i, _j, _len, _len1, _ref, _results;
    this.blockStyles = [];
    _ref = this.map;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      row = _ref[_i];
      r = [];
      for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
        col = row[_j];
        r.push(Math.floor(Math.random() * Config.sprites_per_block_style));
      }
      _results.push(this.blockStyles.push(r));
    }
    return _results;
  };

  Block.prototype.randomize = function() {
    var index;
    index = Math.floor(Math.random() * this.availableBlocks.length);
    return this.map = this.availableBlocks[index];
  };

  Block.prototype.getGridPosition = function() {
    return this.gridPosition;
  };

  Block.prototype.setGridPosition = function() {
    return this.gridPosition.set.apply(this.gridPosition, arguments);
  };

  Block.prototype.rotate = function() {
    this.rotation += 1;
    return this.rotation %= 4;
  };

  Block.prototype.getMap = function() {
    var i, j, map, newData, _i, _j, _k, _ref, _ref1, _ref2;
    map = this.map;
    for (i = _i = 0, _ref = this.rotation; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      newData = [];
      for (i = _j = _ref1 = map.length - 1; _ref1 <= 0 ? _j <= 0 : _j >= 0; i = _ref1 <= 0 ? ++_j : --_j) {
        for (j = _k = 0, _ref2 = map[i].length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; j = 0 <= _ref2 ? ++_k : --_k) {
          if (!newData.hasOwnProperty(j)) {
            newData[j] = [];
          }
          newData[j].push(map[i][j]);
        }
      }
      map = newData;
    }
    return map;
  };

  Block.prototype.getBlockStyles = function() {
    var i, j, newData, styles, _i, _j, _k, _ref, _ref1, _ref2;
    styles = this.blockStyles;
    for (i = _i = 0, _ref = this.rotation; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      newData = [];
      for (i = _j = _ref1 = styles.length - 1; _ref1 <= 0 ? _j <= 0 : _j >= 0; i = _ref1 <= 0 ? ++_j : --_j) {
        for (j = _k = 0, _ref2 = styles[i].length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; j = 0 <= _ref2 ? ++_k : --_k) {
          if (!newData.hasOwnProperty(j)) {
            newData[j] = [];
          }
          newData[j].push(styles[i][j]);
        }
      }
      styles = newData;
    }
    return styles;
  };

  Block.prototype.getRotation = function() {
    return this.rotation;
  };

  Block.prototype.inBuildMode = function() {
    return this.buildMode;
  };

  Block.prototype.setBuildMode = function(buildMode) {
    return this.buildMode = buildMode;
  };

  Block.prototype.getStyle = function() {
    return this.style;
  };

  return Block;

})();

module.exports = Block;


},{"../config/available_blocks.json":8,"../config/config.json":9}],11:[function(require,module,exports){
var Config, Platform;

Config = require("../config/config.json");

Platform = (function() {
  function Platform(app, game, options) {
    var x, y, _i, _j, _ref, _ref1;
    this.app = app;
    this.game = game;
    this.options = options != null ? options : {};
    this.position = this.options.position || new LDFW.Vector2(2, 4);
    this.width = this.options.width || 3;
    this.height = this.options.height || 10;
    this.stylesMap = [];
    for (y = _i = 0, _ref = this.height; 0 <= _ref ? _i < _ref : _i > _ref; y = 0 <= _ref ? ++_i : --_i) {
      this.stylesMap[y] = [];
      for (x = _j = 0, _ref1 = this.width; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        this.stylesMap[y].push(Math.floor(Math.random() * Config.sprites_per_block_style));
      }
    }
  }

  Platform.prototype.getPosition = function() {
    return this.position;
  };

  Platform.prototype.getWidth = function() {
    return this.width;
  };

  Platform.prototype.getHeight = function() {
    return this.height;
  };

  Platform.prototype.getStylesMap = function() {
    return this.stylesMap;
  };

  return Platform;

})();

module.exports = Platform;


},{"../config/config.json":9}],12:[function(require,module,exports){
var Game, Keyboard, Level, Mouse, Player, Powerups;

Level = require("./level.coffee");

Player = require("./player.coffee");

Keyboard = require("./utilities/keyboard.coffee");

Mouse = require("./utilities/mouse.coffee");

Powerups = require("./powerups.coffee");

Game = (function() {
  Game.prototype.powerupDuration = 10000;

  function Game(app) {
    var firstPlatform;
    this.app = app;
    this.defaultScrollSpeed = 200;
    this.scrollSpeed = this.defaultScrollSpeed;
    this.scroll = new LDFW.Vector2(0, 0);
    this.keyboard = new Keyboard();
    this.mouse = new Mouse(this.app);
    this.level = new Level(this.app, this);
    this.player = new Player(this.app, this);
    this.activePowerup = Powerups.BROKEN_BLOCKS;
    this.powerupStart = +new Date();
    firstPlatform = this.level.getPlatforms()[0];
    this.player.setPosition(firstPlatform.getPosition().x * this.level.GRID_SIZE + firstPlatform.getWidth() * this.level.GRID_SIZE / 2, firstPlatform.getPosition().y * this.level.GRID_SIZE - 100);
  }

  Game.prototype.update = function(delta) {
    this.scroll.setX(Math.round(this.scroll.getX() + this.scrollSpeed * delta));
    this.level.update(delta);
    this.player.update(delta);
    if (+new Date() - this.powerupStart >= this.powerupDuration) {
      this.activePowerup = this.getRandomPowerup();
      return this.powerupStart = +new Date();
    }
  };

  Game.prototype.getRandomPowerup = function() {
    var powerupKey, powerups;
    powerups = Object.keys(Powerups);
    powerupKey = powerups[Math.floor(Math.random() * powerups.length)];
    return Powerups[powerupKey];
  };

  Game.prototype.setScrollSpeed = function(scrollSpeed) {
    this.scrollSpeed = scrollSpeed;
  };

  Game.prototype.setDefaultScrollSpeed = function() {
    return this.scrollSpeed = this.defaultScrollSpeed;
  };

  Game.prototype.getPowerupTimeleft = function() {
    return this.powerupDuration - (+new Date() - this.powerupStart);
  };

  Game.prototype.getActivePowerup = function() {
    return this.activePowerup;
  };

  Game.prototype.getScore = function() {
    return Math.round(this.scroll.getX() / 50);
  };

  Game.prototype.getScroll = function() {
    return this.scroll;
  };

  Game.prototype.getScrollSpeed = function() {
    return this.scrollSpeed;
  };

  Game.prototype.getDefaultScrollSpeed = function() {
    return this.defaultScrollSpeed;
  };

  Game.prototype.getLevel = function() {
    return this.level;
  };

  Game.prototype.getPlayer = function() {
    return this.player;
  };

  Game.prototype.getKeyboard = function() {
    return this.keyboard;
  };

  Game.prototype.getMouse = function() {
    return this.mouse;
  };

  return Game;

})();

module.exports = Game;


},{"./level.coffee":14,"./player.coffee":15,"./powerups.coffee":16,"./utilities/keyboard.coffee":20,"./utilities/mouse.coffee":22}],13:[function(require,module,exports){
var GameScreen, Keyboard, LD27, Mouse,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GameScreen = require("./screens/gamescreen.coffee");

Mouse = require("./utilities/mouse.coffee");

Keyboard = require("./utilities/keyboard.coffee");

LD27 = (function(_super) {
  __extends(LD27, _super);

  function LD27() {
    var _this = this;
    LD27.__super__.constructor.apply(this, arguments);
    this.debugDiv = $("<div>").addClass("debug");
    this.debugDiv.appendTo(this.getWrapper());
    this.preloader = new LDFW.Preloader(["assets/sprites.json", "assets/sprites.png", "assets/fonts.json", "assets/fonts.png", "assets/fonts/pixel-8-white.fnt", "assets/fonts/pixel-8-red.fnt", "assets/fonts/pixel-16-white.fnt"]);
    this.preloader.on("done", function() {
      var fontsImage, fontsJSON, spritesImage, spritesJSON;
      spritesJSON = _this.preloader.get("assets/sprites.json");
      spritesImage = _this.preloader.get("assets/sprites.png");
      _this.spritesAtlas = new LDFW.TextureAtlas(spritesJSON.frames, spritesImage);
      fontsJSON = _this.preloader.get("assets/fonts.json");
      fontsImage = _this.preloader.get("assets/fonts.png");
      _this.fontsAtlas = new LDFW.TextureAtlas(fontsJSON.frames, fontsImage);
      _this.gameScreen = new GameScreen(_this);
      _this.screen = _this.gameScreen;
      return _this.run();
    });
    this.preloader.load();
  }

  /*
   * Getters / setters
  */


  LD27.prototype.getSpritesAtlas = function() {
    return this.spritesAtlas;
  };

  LD27.prototype.getFontsAtlas = function() {
    return this.fontsAtlas;
  };

  LD27.prototype.getPreloader = function() {
    return this.preloader;
  };

  LD27.prototype.setDebugText = function(text) {
    return this.debugDiv.text(text);
  };

  return LD27;

})(LDFW.Game);

module.exports = LD27;


},{"./screens/gamescreen.coffee":17,"./utilities/keyboard.coffee":20,"./utilities/mouse.coffee":22}],14:[function(require,module,exports){
var Block, Config, FuckingPiranhasActor, Level, LevelGenerator, Platform, Powerups,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Config = require("./config/config.json");

Block = require("./entities/block.coffee");

Platform = require("./entities/platform.coffee");

LevelGenerator = require("./utilities/levelgenerator.coffee");

Powerups = require("./powerups.coffee");

FuckingPiranhasActor = require("./actors/fuckingpiranhasactor.coffee");

Level = (function() {
  Level.prototype.GRID_SIZE = 32;

  function Level(app, game) {
    var appTileHeight;
    this.app = app;
    this.game = game;
    this.onClick = __bind(this.onClick, this);
    this.onRightClick = __bind(this.onRightClick, this);
    this.onKeyDown = __bind(this.onKeyDown, this);
    this.renderOffset = new LDFW.Vector2(0, Config.ui_minimap_height);
    this.buildMode = true;
    this.buildBlock = new Block(this.app, this.game, {
      buildMode: true
    });
    this.keyboard = this.game.getKeyboard();
    this.keyboard.on("keydown", this.onKeyDown);
    this.mouse = this.game.getMouse();
    this.mouse.on("click", this.onClick);
    this.mouse.on("rightclick", this.onRightClick);
    this.defaultGravity = new LDFW.Vector2(0, 1800);
    this.gravity = this.defaultGravity.clone();
    this.generator = new LevelGenerator(this.app, this.game, this);
    this.platforms = [
      new Platform(this.app, this.game, {
        position: new LDFW.Vector2(10, 10),
        width: 10,
        height: 10
      })
    ];
    this.blocks = [];
    appTileHeight = Math.round(this.app.getHeight() / this.GRID_SIZE);
    this.obstacles = [];
    this.generator.generate(2, 10);
  }

  Level.prototype.onKeyDown = function(event) {
    var _ref;
    if (!this.buildMode) {
      return;
    }
    if ((_ref = event.keyCode) === this.keyboard.Keys.R || _ref === this.keyboard.Keys.SHIFT) {
      return this.buildBlock.rotate();
    }
  };

  Level.prototype.onRightClick = function(position) {
    if (!this.buildMode) {
      return;
    }
    return this.buildBlock.rotate();
  };

  Level.prototype.onClick = function(position) {
    if (!this.buildMode) {
      return;
    }
    if (!this.isBuildBlockBuildable()) {
      return;
    }
    this.buildBlock.setBuildMode(false);
    this.buildMode = false;
    this.blocks.push(this.buildBlock);
    this.buildBlock = null;
    this.buildMode = true;
    return this.buildBlock = new Block(this.app, this.game, {
      buildMode: true
    });
  };

  Level.prototype.update = function(delta) {
    var blockMap, gridPosition, mousePosition, obstacle, _i, _len, _ref, _results;
    if (this.game.getActivePowerup() === Powerups.BROKEN_BLOCKS && this.buildMode) {
      this.buildBlock.setStyle("broken");
    } else {
      this.buildBlock.setDefaultStyle();
    }
    if (this.game.getActivePowerup() === Powerups.LOW_GRAVITY) {
      this.gravity.setY(this.defaultGravity.getY() / 2);
    } else {
      this.gravity.setY(this.defaultGravity.getY());
    }
    if (this.game.getActivePowerup() === Powerups.EARTHQUAKE) {
      LDFW.Sprite.renderOffset = new LDFW.Vector2(-10 + Math.random() * 20, -10 + Math.random() * 20);
    } else {
      LDFW.Sprite.renderOffset = new LDFW.Vector2(0, 0);
    }
    if (this.game.getActivePowerup() === Powerups.BOOST) {
      this.game.setScrollSpeed(this.game.getDefaultScrollSpeed() * 2);
    } else if (this.game.getActivePowerup() === Powerups.SLOW) {
      this.game.setScrollSpeed(this.game.getDefaultScrollSpeed() * 0.75);
    } else {
      this.game.setDefaultScrollSpeed();
    }
    mousePosition = this.mouse.getPosition();
    if (this.buildMode) {
      blockMap = this.buildBlock.getMap();
      gridPosition = mousePosition.clone().add(this.getScroll()).substract(blockMap[0].length * this.GRID_SIZE / 2, blockMap.length * this.GRID_SIZE / 2).divideBy(this.GRID_SIZE).round();
      this.buildBlock.setGridPosition(gridPosition);
    }
    _ref = this.obstacles;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obstacle = _ref[_i];
      if (this.game.getPlayer().collidesWithObstacle(obstacle)) {
        _results.push(console.log("u dead."));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Level.prototype.isBuildBlockBuildable = function() {
    var block, buildable, buildableBlockMap, buildableBlockPosition, buildableSegment, map, offset, position, row, segment, x, y, _i, _j, _k, _len, _len1, _len2, _ref;
    buildable = true;
    buildableBlockMap = this.buildBlock.getMap();
    buildableBlockPosition = this.buildBlock.getGridPosition();
    _ref = this.blocks;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      block = _ref[_i];
      map = block.getMap();
      position = block.getGridPosition();
      for (y = _j = 0, _len1 = map.length; _j < _len1; y = ++_j) {
        row = map[y];
        for (x = _k = 0, _len2 = row.length; _k < _len2; x = ++_k) {
          segment = row[x];
          if (segment === 0) {
            continue;
          }
          offset = new LDFW.Vector2(position.getX() + x - buildableBlockPosition.getX(), position.getY() + y - buildableBlockPosition.getY());
          if ((buildableBlockMap[offset.y] != null) && (buildableBlockMap[offset.y][offset.x] != null)) {
            buildableSegment = buildableBlockMap[offset.y][offset.x];
            if (buildableSegment === 1) {
              buildable = false;
            }
          }
        }
      }
    }
    return buildable;
  };

  Level.prototype.getBoundariesForPlayer = function(player) {
    var block, boundaries, map, platform, playerHeight, playerWidth, position, row, segment, x, y, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1;
    playerWidth = 32;
    playerHeight = 64;
    player = {
      top: player.getPosition().getY() - playerHeight,
      bottom: player.getPosition().getY(),
      left: player.getPosition().getX(),
      right: player.getPosition().getX() + playerWidth
    };
    boundaries = {
      x: {
        min: 0,
        max: player.left + this.app.getWidth()
      },
      y: {
        min: -this.app.getHeight(),
        max: this.app.getHeight() * 2
      }
    };
    _ref = this.platforms;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      platform = _ref[_i];
      position = platform.getPosition().clone().multiply(this.GRID_SIZE);
      platform = {
        top: position.y,
        bottom: position.y + platform.getHeight() * this.GRID_SIZE,
        left: position.x,
        right: position.x + platform.getWidth() * this.GRID_SIZE
      };
      if (!(player.bottom <= platform.top || player.top >= platform.bottom)) {
        if (player.right <= platform.left) {
          boundaries.x.max = Math.min(platform.left, boundaries.x.max);
        } else if (player.left >= platform.right) {
          boundaries.x.min = Math.max(platform.right, boundaries.x.min);
        }
      }
      if (!(player.right < platform.left || player.left > platform.right || player.bottom > platform.top)) {
        boundaries.y.max = Math.min(platform.top, boundaries.y.max);
      }
    }
    _ref1 = this.blocks;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      block = _ref1[_j];
      map = block.getMap();
      position = block.getGridPosition().clone().multiply(this.GRID_SIZE);
      for (y = _k = 0, _len2 = map.length; _k < _len2; y = ++_k) {
        row = map[y];
        for (x = _l = 0, _len3 = row.length; _l < _len3; x = ++_l) {
          segment = row[x];
          if (segment === 0) {
            continue;
          }
          segment = {
            left: position.getX() + x * this.GRID_SIZE,
            right: position.getX() + (x + 1) * this.GRID_SIZE,
            top: position.getY() + y * this.GRID_SIZE,
            bottom: position.getY() + (y + 1) * this.GRID_SIZE
          };
          if (!(player.bottom <= segment.top || player.top >= segment.bottom)) {
            if (player.right <= segment.left) {
              boundaries.x.max = Math.min(segment.left, boundaries.x.max);
            } else if (player.left >= segment.right) {
              boundaries.x.min = Math.max(segment.right, boundaries.x.min);
            }
          }
          if (!(player.left > segment.right || player.right < segment.left || player.bottom > segment.top)) {
            boundaries.y.max = Math.min(segment.top, boundaries.y.max);
          }
        }
      }
    }
    return boundaries;
  };

  Level.prototype.addPlatform = function(platform) {
    return this.platforms.push(platform);
  };

  Level.prototype.addObstacle = function(obstacle) {
    return this.obstacles.push(obstacle);
  };

  Level.prototype.getScroll = function() {
    return this.game.getScroll().clone().add(this.renderOffset);
  };

  Level.prototype.getPlatforms = function() {
    return this.platforms;
  };

  Level.prototype.getBlocks = function() {
    return this.blocks;
  };

  Level.prototype.getObstacles = function() {
    return this.obstacles;
  };

  Level.prototype.getGravity = function() {
    return this.gravity;
  };

  Level.prototype.inBuildMode = function() {
    return this.buildMode;
  };

  Level.prototype.getBuildBlock = function() {
    return this.buildBlock;
  };

  Level.prototype.getScrollSpeed = function() {
    return this.scrollSpeed;
  };

  return Level;

})();

module.exports = Level;


},{"./actors/fuckingpiranhasactor.coffee":2,"./config/config.json":9,"./entities/block.coffee":10,"./entities/platform.coffee":11,"./powerups.coffee":16,"./utilities/levelgenerator.coffee":21}],15:[function(require,module,exports){
var JUMP_FORCE, Player;

JUMP_FORCE = -700;

Player = (function() {
  function Player(app, game) {
    this.app = app;
    this.game = game;
    this.keyboard = this.game.getKeyboard();
    this.velocity = new LDFW.Vector2();
    this.position = new LDFW.Vector2();
    this.level = this.game.getLevel();
    this.onGround = false;
  }

  Player.prototype.update = function(delta) {
    var aspiredPosition, boundaries;
    this.handleKeyboard();
    aspiredPosition = this.getAspiredPosition(delta);
    boundaries = this.level.getBoundariesForPlayer(this);
    this.handleXMovement(aspiredPosition, boundaries);
    this.handleYMovement(aspiredPosition, boundaries);
    return this.position.set(aspiredPosition);
  };

  Player.prototype.getAspiredPosition = function(delta) {
    var gravity, gravityStep, velocityStep;
    gravity = this.level.getGravity().clone();
    gravityStep = gravity.multiply(delta);
    this.velocity.add(gravityStep);
    velocityStep = this.velocity.clone().multiply(delta);
    return this.position.clone().add(velocityStep);
  };

  Player.prototype.handleXMovement = function(aspiredPosition, boundaries) {
    if (aspiredPosition.getX() < this.level.getScroll().x) {
      aspiredPosition.setX(this.level.getScroll().x);
    }
    if (aspiredPosition.getX() <= boundaries.x.min) {
      return aspiredPosition.setX(boundaries.x.min);
    } else if (aspiredPosition.getX() + this.getWidth() >= boundaries.x.max) {
      return aspiredPosition.setX(boundaries.x.max - this.getWidth());
    }
  };

  Player.prototype.handleYMovement = function(aspiredPosition, boundaries) {
    if (aspiredPosition.getY() > boundaries.y.max) {
      aspiredPosition.setY(boundaries.y.max);
    }
    if (aspiredPosition.getY() >= boundaries.y.max) {
      this.jumping = false;
      this.onGround = true;
      return this.velocity.setY(0);
    } else {
      return this.onGround = false;
    }
  };

  Player.prototype.collidesWithObstacle = function(obstacle) {
    var obstaclePosition, player;
    obstaclePosition = obstacle.getPosition().clone().multiply(this.level.GRID_SIZE);
    obstacle = {
      top: obstaclePosition.y,
      right: obstaclePosition.x + obstacle.getWidth() * this.level.GRID_SIZE,
      bottom: obstaclePosition.y + obstacle.getHeight() * this.level.GRID_SIZE,
      left: obstaclePosition.x
    };
    player = {
      top: this.position.getY() + this.getHeight(),
      right: this.position.getX() + this.getWidth(),
      bottom: this.position.getY(),
      left: this.position.getX()
    };
    if (!(player.left > obstacle.right || player.right < obstacle.left || player.bottom < obstacle.top || player.top > obstacle.bottom)) {
      return true;
    }
    return false;
  };

  Player.prototype.handleKeyboard = function() {
    if (this.keyboard.pressed(this.keyboard.Keys.RIGHT) || this.keyboard.pressed(this.keyboard.Keys.D)) {
      this.velocity.setX(this.game.getScrollSpeed() * 2);
    } else if (this.keyboard.pressed(this.keyboard.Keys.LEFT) || this.keyboard.pressed(this.keyboard.Keys.A)) {
      this.velocity.setX(-this.game.getScrollSpeed() * 2);
    } else {
      this.velocity.setX(0);
    }
    if (this.keyboard.upPressed() && this.onGround) {
      return this.velocity.setY(JUMP_FORCE);
    }
  };

  Player.prototype.getWidth = function() {
    return 32;
  };

  Player.prototype.getHeight = function() {
    return 64;
  };

  Player.prototype.getPosition = function() {
    return this.position;
  };

  Player.prototype.setPosition = function() {
    return this.position.set.apply(this.position, arguments);
  };

  return Player;

})();

module.exports = Player;


},{}],16:[function(require,module,exports){
var Powerups;

Powerups = {
  BOOST: {
    id: 0,
    name: "RUN FOREST!"
  },
  SLOW: {
    id: 1,
    name: "HALT STOPP!"
  },
  BROKEN_BLOCKS: {
    id: 2,
    name: "DON'T BREAK IT!"
  },
  EARTHQUAKE: {
    id: 3,
    name: "WAAAAH!"
  },
  LOW_GRAVITY: {
    id: 4,
    name: "HEY NEIL"
  }
};

module.exports = Powerups;


},{}],17:[function(require,module,exports){
var Game, GameScreen, GameStage, UIStage,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GameStage = require("../stages/gamestage.coffee");

UIStage = require("../stages/uistage.coffee");

Game = require("../game.coffee");

GameScreen = (function(_super) {
  __extends(GameScreen, _super);

  function GameScreen(app) {
    this.app = app;
    GameScreen.__super__.constructor.call(this, this.app);
    this.game = new Game(this.app);
    this.uiStage = new UIStage(this.app, this.game);
    this.gameStage = new GameStage(this.app, this.game);
  }

  GameScreen.prototype.update = function(delta) {
    this.game.update(delta);
    this.gameStage.update(delta);
    this.uiStage.update(delta);
  };

  GameScreen.prototype.draw = function(context) {
    this.gameStage.draw(context);
    this.uiStage.draw(context);
  };

  return GameScreen;

})(LDFW.Screen);

module.exports = GameScreen;


},{"../game.coffee":12,"../stages/gamestage.coffee":18,"../stages/uistage.coffee":19}],18:[function(require,module,exports){
var GameStage, LevelActor, PlayerActor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PlayerActor = require("../actors/playeractor.coffee");

LevelActor = require("../actors/levelactor.coffee");

GameStage = (function(_super) {
  __extends(GameStage, _super);

  function GameStage(app, game) {
    this.app = app;
    this.game = game;
    GameStage.__super__.constructor.call(this, this.game);
    this.levelActor = new LevelActor(this.app, this.game);
    this.addActor(this.levelActor);
    this.playerActor = new PlayerActor(this.app, this.game);
    this.addActor(this.playerActor);
  }

  return GameStage;

})(LDFW.Stage);

module.exports = GameStage;


},{"../actors/levelactor.coffee":4,"../actors/playeractor.coffee":6}],19:[function(require,module,exports){
var BoostActor, HeadlineActor, MinimapActor, UIStage,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MinimapActor = require("../actors/minimapactor.coffee");

HeadlineActor = require("../actors/headlineactor.coffee");

BoostActor = require("../actors/boostactor.coffee");

UIStage = (function(_super) {
  __extends(UIStage, _super);

  function UIStage(app, game) {
    this.app = app;
    this.game = game;
    UIStage.__super__.constructor.call(this, this.game);
    this.minimapActor = new MinimapActor(this.app, this.game);
    this.addActor(this.minimapActor);
    this.headlineActor = new HeadlineActor(this.app, this.game);
    this.addActor(this.headlineActor);
    this.boostActor = new BoostActor(this.app, this.game);
    this.addActor(this.boostActor);
  }

  return UIStage;

})(LDFW.Stage);

module.exports = UIStage;


},{"../actors/boostactor.coffee":1,"../actors/headlineactor.coffee":3,"../actors/minimapactor.coffee":5}],20:[function(require,module,exports){
var EventEmitter, Keyboard,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EventEmitter = require("events").EventEmitter;

Keyboard = (function(_super) {
  __extends(Keyboard, _super);

  Keyboard.prototype.Keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    R: 82,
    SHIFT: 16,
    SPACE: 32,
    ESC: 27
  };

  function Keyboard() {
    this.onKeyUp = __bind(this.onKeyUp, this);
    this.onKeyDown = __bind(this.onKeyDown, this);
    var key, keyCode, _ref;
    this.keyStates = [];
    _ref = this.Keys;
    for (key in _ref) {
      keyCode = _ref[key];
      this.keyStates[keyCode] = false;
    }
    $(window).keydown(this.onKeyDown);
    $(window).keyup(this.onKeyUp);
  }

  Keyboard.prototype.onKeyDown = function(e) {
    var keyCode;
    this.emit("keydown", e);
    keyCode = e.keyCode;
    if (this.keyStates[keyCode] != null) {
      return this.keyStates[keyCode] = true;
    }
  };

  Keyboard.prototype.onKeyUp = function(e) {
    var keyCode;
    keyCode = e.keyCode;
    if (this.keyStates[keyCode] != null) {
      return this.keyStates[keyCode] = false;
    }
  };

  Keyboard.prototype.pressed = function(keyCode) {
    return this.keyStates[keyCode] || false;
  };

  Keyboard.prototype.upPressed = function() {
    return this.keyStates[this.Keys.UP] || this.keyStates[this.Keys.W] || this.keyStates[this.Keys.SPACE];
  };

  return Keyboard;

})(EventEmitter);

module.exports = Keyboard;


},{"events":23}],21:[function(require,module,exports){
var FuckingPiranhas, LevelGenerator, Platform;

Platform = require("../entities/platform.coffee");

FuckingPiranhas = require("../actors/fuckingpiranhasactor.coffee");

LevelGenerator = (function() {
  function LevelGenerator(app, game, level) {
    this.app = app;
    this.game = game;
    this.level = level;
    return;
  }

  /*
    1 long platform per 5 screens
    1 short platform per 5 screens
    1 big obstacle per 5 screens (what exactly? a gear? a saw?)
    1 small obstacle per 5 screens
  */


  LevelGenerator.prototype.generate = function(screenOffset, screens) {
    var i, longPlatformMaxWidth, longPlatformMinWidth, piranhas, platform, platformWidth, platformX, platformY, screenAreaWidth, screenOffsetX, screenTilesX, screenTilesY, _i, _ref, _results;
    if (screenOffset == null) {
      screenOffset = 1;
    }
    if (screens == null) {
      screens = 10;
    }
    screenTilesX = Math.round(this.app.getWidth() / this.level.GRID_SIZE);
    screenTilesY = Math.round(this.app.getHeight() / this.level.GRID_SIZE);
    longPlatformMaxWidth = screenTilesX;
    longPlatformMinWidth = Math.round(screenTilesX / 2);
    _results = [];
    for (i = _i = screenOffset, _ref = screenOffset + Math.floor(screens / 5); screenOffset <= _ref ? _i < _ref : _i > _ref; i = screenOffset <= _ref ? ++_i : --_i) {
      screenAreaWidth = screenTilesX * 5;
      screenOffsetX = screenTilesX * i;
      /*
        Generate long platform
      */

      platformWidth = Math.round(longPlatformMinWidth + Math.random() * (longPlatformMaxWidth - longPlatformMinWidth));
      platformX = screenOffsetX + Math.round(Math.random() * (screenAreaWidth - platformWidth));
      platformY = Math.round(screenTilesY / 2 + Math.random() * (screenTilesY / 2));
      platform = new Platform(this.app, this.game, {
        position: new LDFW.Vector2(platformX, platformY),
        width: platformWidth,
        height: screenTilesY - platformY
      });
      this.level.addPlatform(platform);
      /*
        Generate fucking piranhas
        (generate them in front of the platform)
      */

      piranhas = new FuckingPiranhas(this.app, this.game, {
        position: new LDFW.Vector2(platformX - 10, screenTilesY - 6)
      });
      _results.push(this.level.addObstacle(piranhas));
    }
    return _results;
  };

  return LevelGenerator;

})();

module.exports = LevelGenerator;


},{"../actors/fuckingpiranhasactor.coffee":2,"../entities/platform.coffee":11}],22:[function(require,module,exports){
var EventEmitter, Mouse,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EventEmitter = require("events").EventEmitter;

Mouse = (function(_super) {
  __extends(Mouse, _super);

  function Mouse(app) {
    this.app = app;
    this.onMouseDown = __bind(this.onMouseDown, this);
    this.onClick = __bind(this.onClick, this);
    this.onMouseMove = __bind(this.onMouseMove, this);
    this.position = new LDFW.Vector2();
    this.app.getWrapper().mousemove(this.onMouseMove);
    this.app.getWrapper().click(this.onClick);
    this.app.getWrapper().mousedown(this.onMouseDown);
    this.app.getWrapper().contextmenu(function(e) {
      return e.preventDefault();
    });
  }

  Mouse.prototype.onMouseMove = function(e) {
    return this.position.set(e.offsetX, e.offsetY);
  };

  Mouse.prototype.onClick = function(e) {
    return this.emit("click", this.position);
  };

  Mouse.prototype.onMouseDown = function(e) {
    if (e.which === 3) {
      e.preventDefault();
      return this.emit("rightclick", this.position);
    }
  };

  Mouse.prototype.getPosition = function() {
    return this.position;
  };

  return Mouse;

})(EventEmitter);

module.exports = Mouse;


},{"events":23}],23:[function(require,module,exports){
var process=require("__browserify_process");if (!process.EventEmitter) process.EventEmitter = function () {};

var EventEmitter = exports.EventEmitter = process.EventEmitter;
var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    }
;
function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}

// By default EventEmitters will print a warning if more than
// 10 listeners are added to it. This is a useful default which
// helps finding memory leaks.
//
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
var defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!this._events) this._events = {};
  this._events.maxListeners = n;
};


EventEmitter.prototype.emit = function(type) {
  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events || !this._events.error ||
        (isArray(this._events.error) && !this._events.error.length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
};

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {

    // Check for listener leak
    if (!this._events[type].warned) {
      var m;
      if (this._events.maxListeners !== undefined) {
        m = this._events.maxListeners;
      } else {
        m = defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        console.trace();
      }
    }

    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  var self = this;
  self.on(type, function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  });

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var i = indexOf(list, listener);
    if (i < 0) return this;
    list.splice(i, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (this._events[type] === listener) {
    delete this._events[type];
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (typeof emitter._events[type] === 'function')
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

},{"__browserify_process":24}],24:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}]},{},[7])
;