;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ExampleActor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ExampleActor = (function(_super) {
  __extends(ExampleActor, _super);

  function ExampleActor() {
    ExampleActor.__super__.constructor.apply(this, arguments);
    this.spritesAtlas = this.game.getSpritesAtlas();
    this.sprite = this.spritesAtlas.createSprite("example.png");
  }

  ExampleActor.prototype.update = function(delta) {
    return this.sprite.setPosition(this.sprite.getX() + 10 * delta, this.sprite.getY() + 10 * delta);
  };

  ExampleActor.prototype.draw = function(context) {
    return this.sprite.draw(context);
  };

  return ExampleActor;

})(LDFW.Actor);

module.exports = ExampleActor;


},{}],2:[function(require,module,exports){
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


},{"./ld27.coffee":3}],3:[function(require,module,exports){
var GameScreen, LD27,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GameScreen = require("./screens/gamescreen.coffee");

LD27 = (function(_super) {
  __extends(LD27, _super);

  function LD27() {
    var _this = this;
    LD27.__super__.constructor.apply(this, arguments);
    this.preloader = new LDFW.Preloader(["assets/sprites.json", "assets/sprites.png"]);
    this.preloader.on("done", function() {
      var spritesImage, spritesJSON;
      spritesJSON = _this.preloader.get("assets/sprites.json");
      spritesImage = _this.preloader.get("assets/sprites.png");
      _this.spritesAtlas = new LDFW.TextureAtlas(spritesJSON.frames, spritesImage);
      _this.screen = new GameScreen(_this);
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

  return LD27;

})(LDFW.Game);

module.exports = LD27;


},{"./screens/gamescreen.coffee":4}],4:[function(require,module,exports){
var ExampleStage, GameScreen,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ExampleStage = require("../stages/examplestage.coffee");

GameScreen = (function(_super) {
  __extends(GameScreen, _super);

  function GameScreen(game) {
    this.game = game;
    this.spriteAtlas = this.game.getSpritesAtlas();
    this.exampleStage = new ExampleStage(this.game);
    GameScreen.__super__.constructor.apply(this, arguments);
  }

  GameScreen.prototype.update = function(delta) {
    return this.exampleStage.update(delta);
  };

  GameScreen.prototype.draw = function(context) {
    this.exampleStage.draw(context);
  };

  return GameScreen;

})(LDFW.Screen);

module.exports = GameScreen;


},{"../stages/examplestage.coffee":5}],5:[function(require,module,exports){
var ExampleActor, ExampleStage,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ExampleActor = require("../actors/exampleactor.coffee");

ExampleStage = (function(_super) {
  __extends(ExampleStage, _super);

  function ExampleStage() {
    ExampleStage.__super__.constructor.apply(this, arguments);
    this.actor = new ExampleActor(this.game);
  }

  ExampleStage.prototype.update = function(delta) {
    return this.actor.update(delta);
  };

  ExampleStage.prototype.draw = function(context) {
    return this.actor.draw(context);
  };

  return ExampleStage;

})(LDFW.Stage);

module.exports = ExampleStage;


},{"../actors/exampleactor.coffee":1}]},{},[2])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc2FzY2hhZ2VobGljaC9kZXZlbG9wbWVudC9qcy9sZDI3L2NvZmZlZXNjcmlwdHMvZ2FtZS9hY3RvcnMvZXhhbXBsZWFjdG9yLmNvZmZlZSIsIi9Vc2Vycy9zYXNjaGFnZWhsaWNoL2RldmVsb3BtZW50L2pzL2xkMjcvY29mZmVlc2NyaXB0cy9nYW1lL2FwcGxpY2F0aW9uLmNvZmZlZSIsIi9Vc2Vycy9zYXNjaGFnZWhsaWNoL2RldmVsb3BtZW50L2pzL2xkMjcvY29mZmVlc2NyaXB0cy9nYW1lL2xkMjcuY29mZmVlIiwiL1VzZXJzL3Nhc2NoYWdlaGxpY2gvZGV2ZWxvcG1lbnQvanMvbGQyNy9jb2ZmZWVzY3JpcHRzL2dhbWUvc2NyZWVucy9nYW1lc2NyZWVuLmNvZmZlZSIsIi9Vc2Vycy9zYXNjaGFnZWhsaWNoL2RldmVsb3BtZW50L2pzL2xkMjcvY29mZmVlc2NyaXB0cy9nYW1lL3N0YWdlcy9leGFtcGxlc3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLFFBQUE7R0FBQTtrU0FBQTs7QUFBTSxDQUFOO0NBQ0U7O0NBQWEsQ0FBQSxDQUFBLG1CQUFBO0NBQ1gsR0FBQSxLQUFBLHNDQUFBO0NBQUEsRUFFZ0IsQ0FBaEIsUUFBQSxHQUFnQjtDQUZoQixFQUdVLENBQVYsRUFBQSxNQUF1QixDQUFiO0NBSlosRUFBYTs7Q0FBYixFQU1RLEVBQUEsQ0FBUixHQUFTO0NBQ04sQ0FDa0IsQ0FBQSxDQURsQixDQUFELENBQU8sS0FBUDtDQVBGLEVBTVE7O0NBTlIsRUFZTSxDQUFOLEdBQU0sRUFBQztDQUNKLEdBQUEsRUFBTSxDQUFQLElBQUE7Q0FiRixFQVlNOztDQVpOOztDQUR5QixHQUFJOztBQWdCL0IsQ0FoQkEsRUFnQmlCLEdBQVgsQ0FBTixLQWhCQTs7OztBQ0FBLElBQUE7O0FBQUEsQ0FBQSxFQUFPLENBQVAsR0FBTyxRQUFBOztBQUVQLENBRkEsRUFFMEIsR0FBcEIsR0FBcUIsT0FBM0I7Q0FDRSxFQUdRLENBRkEsRUFETSxFQUdOLENBSEEsWUFBQSxHQUFBLEdBQUE7Q0FJUyxDQUFxQixDQUFPLENBQVAsRUFBdEIsRUFBTixFQUFBLENBQUE7Q0FKVixFQUdRO0NBSmlCOztBQVEzQixDQVZBLEVBVUUsTUFBQTtDQUNBLEtBQUEsT0FBQTtDQUFBLENBQUEsQ0FBVSxJQUFWLFVBQVU7Q0FFTSxFQUFMLENBQVgsR0FBVyxFQUFYO0NBSEE7Ozs7QUNWRixJQUFBLFlBQUE7R0FBQTtrU0FBQTs7QUFBQSxDQUFBLEVBQWUsSUFBQSxHQUFmLG1CQUFlOztBQUVULENBRk47Q0FHRTs7Q0FBYSxDQUFBLENBQUEsV0FBQTtDQUNYLE9BQUEsSUFBQTtDQUFBLEdBQUEsS0FBQSw4QkFBQTtDQUFBLENBSUUsQ0FGZSxDQUFqQixLQUFBLFdBQWdDLENBQUE7Q0FGaEMsQ0FNQSxDQUFzQixDQUF0QixFQUFBLEdBQVU7Q0FDUixTQUFBLGVBQUE7Q0FBQSxFQUFjLEVBQUMsQ0FBZixHQUF3QixFQUF4QixVQUFjO0NBQWQsRUFDZSxFQUFDLENBQWhCLEdBQXlCLEdBQXpCLFFBQWU7Q0FEZixDQUcwRCxDQUF0QyxDQUFBLENBQW5CLENBQUQsS0FBaUQsQ0FBakQ7Q0FIQSxFQUlvQixDQUFBLENBQW5CLENBQUQsSUFBb0I7Q0FDbkIsRUFBRCxFQUFDLFFBQUQ7Q0FORixJQUFzQjtDQU50QixHQWFBLEtBQVU7Q0FkWixFQUFhOztDQWdCYjs7O0NBaEJBOztDQUFBLEVBbUJpQixNQUFBLE1BQWpCO0NBQW9CLEdBQVEsT0FBRCxDQUFQO0NBbkJwQixFQW1CaUI7O0NBbkJqQjs7Q0FEaUIsR0FBSTs7QUFzQnZCLENBeEJBLEVBd0JpQixDQXhCakIsRUF3Qk0sQ0FBTjs7OztBQ3hCQSxJQUFBLG9CQUFBO0dBQUE7a1NBQUE7O0FBQUEsQ0FBQSxFQUFlLElBQUEsS0FBZixtQkFBZTs7QUFFVCxDQUZOO0NBR0U7O0NBQWEsQ0FBQSxDQUFBLENBQUEsZ0JBQUU7Q0FDYixFQURhLENBQUQ7Q0FDWixFQUFlLENBQWYsT0FBQSxJQUFlO0NBQWYsRUFDb0IsQ0FBcEIsUUFBQTtDQURBLEdBRUEsS0FBQSxvQ0FBQTtDQUhGLEVBQWE7O0NBQWIsRUFLUSxFQUFBLENBQVIsR0FBUztDQUNOLEdBQUEsQ0FBRCxDQUFBLEtBQUEsQ0FBYTtDQU5mLEVBS1E7O0NBTFIsRUFRTSxDQUFOLEdBQU0sRUFBQztDQUNMLEdBQUEsR0FBQSxLQUFhO0NBVGYsRUFRTTs7Q0FSTjs7Q0FEdUIsR0FBSTs7QUFhN0IsQ0FmQSxFQWVpQixHQUFYLENBQU4sR0FmQTs7OztBQ0FBLElBQUEsc0JBQUE7R0FBQTtrU0FBQTs7QUFBQSxDQUFBLEVBQWUsSUFBQSxLQUFmLG1CQUFlOztBQUVULENBRk47Q0FHRTs7Q0FBYSxDQUFBLENBQUEsbUJBQUE7Q0FDWCxHQUFBLEtBQUEsc0NBQUE7Q0FBQSxFQUVhLENBQWIsQ0FBQSxPQUFhO0NBSGYsRUFBYTs7Q0FBYixFQUtRLEVBQUEsQ0FBUixHQUFTO0NBQ04sR0FBQSxDQUFLLENBQU4sS0FBQTtDQU5GLEVBS1E7O0NBTFIsRUFRTSxDQUFOLEdBQU0sRUFBQztDQUNKLEdBQUEsQ0FBSyxFQUFOLElBQUE7Q0FURixFQVFNOztDQVJOOztDQUR5QixHQUFJOztBQVkvQixDQWRBLEVBY2lCLEdBQVgsQ0FBTixLQWRBIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRXhhbXBsZUFjdG9yIGV4dGVuZHMgTERGVy5BY3RvclxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBzdXBlclxuXG4gICAgQHNwcml0ZXNBdGxhcyA9IEBnYW1lLmdldFNwcml0ZXNBdGxhcygpXG4gICAgQHNwcml0ZSA9IEBzcHJpdGVzQXRsYXMuY3JlYXRlU3ByaXRlIFwiZXhhbXBsZS5wbmdcIlxuXG4gIHVwZGF0ZTogKGRlbHRhKSAtPlxuICAgIEBzcHJpdGUuc2V0UG9zaXRpb24oXG4gICAgICBAc3ByaXRlLmdldFgoKSArIDEwICogZGVsdGEsXG4gICAgICBAc3ByaXRlLmdldFkoKSArIDEwICogZGVsdGFcbiAgICApXG5cbiAgZHJhdzogKGNvbnRleHQpIC0+XG4gICAgQHNwcml0ZS5kcmF3IGNvbnRleHRcblxubW9kdWxlLmV4cG9ydHMgPSBFeGFtcGxlQWN0b3JcbiIsIkxEMjcgPSByZXF1aXJlIFwiLi9sZDI3LmNvZmZlZVwiXG5cbndpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKC0+XG4gIHJldHVybiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gICAgICAgICAgKGNhbGxiYWNrKSAtPlxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQgY2FsbGJhY2ssIDEwMDAgLyA2MFxuICApKClcblxuJCAtPlxuICB3cmFwcGVyID0gJChcIi5jYW52YXMtd3JhcHBlclwiKVxuXG4gIGdhbWUgPSBuZXcgTEQyNyh3cmFwcGVyKVxuIiwiR2FtZVNjcmVlbiAgID0gcmVxdWlyZSBcIi4vc2NyZWVucy9nYW1lc2NyZWVuLmNvZmZlZVwiXG5cbmNsYXNzIExEMjcgZXh0ZW5kcyBMREZXLkdhbWVcbiAgY29uc3RydWN0b3I6IC0+XG4gICAgc3VwZXJcblxuICAgIEBwcmVsb2FkZXIgPSBuZXcgTERGVy5QcmVsb2FkZXIgW1xuICAgICAgXCJhc3NldHMvc3ByaXRlcy5qc29uXCIsXG4gICAgICBcImFzc2V0cy9zcHJpdGVzLnBuZ1wiXG4gICAgXVxuICAgIEBwcmVsb2FkZXIub24gXCJkb25lXCIsID0+XG4gICAgICBzcHJpdGVzSlNPTiA9IEBwcmVsb2FkZXIuZ2V0IFwiYXNzZXRzL3Nwcml0ZXMuanNvblwiXG4gICAgICBzcHJpdGVzSW1hZ2UgPSBAcHJlbG9hZGVyLmdldCBcImFzc2V0cy9zcHJpdGVzLnBuZ1wiXG5cbiAgICAgIEBzcHJpdGVzQXRsYXMgPSBuZXcgTERGVy5UZXh0dXJlQXRsYXMgc3ByaXRlc0pTT04uZnJhbWVzLCBzcHJpdGVzSW1hZ2VcbiAgICAgIEBzY3JlZW4gICAgICAgPSBuZXcgR2FtZVNjcmVlbiB0aGlzXG4gICAgICBAcnVuKClcbiAgICBAcHJlbG9hZGVyLmxvYWQoKVxuXG4gICMjI1xuICAgKiBHZXR0ZXJzIC8gc2V0dGVyc1xuICAjIyNcbiAgZ2V0U3ByaXRlc0F0bGFzOiAtPiByZXR1cm4gQHNwcml0ZXNBdGxhc1xuXG5tb2R1bGUuZXhwb3J0cyA9IExEMjdcbiIsIkV4YW1wbGVTdGFnZSA9IHJlcXVpcmUgXCIuLi9zdGFnZXMvZXhhbXBsZXN0YWdlLmNvZmZlZVwiXG5cbmNsYXNzIEdhbWVTY3JlZW4gZXh0ZW5kcyBMREZXLlNjcmVlblxuICBjb25zdHJ1Y3RvcjogKEBnYW1lKSAtPlxuICAgIEBzcHJpdGVBdGxhcyA9IEBnYW1lLmdldFNwcml0ZXNBdGxhcygpXG4gICAgQGV4YW1wbGVTdGFnZSA9IG5ldyBFeGFtcGxlU3RhZ2UgQGdhbWVcbiAgICBzdXBlclxuXG4gIHVwZGF0ZTogKGRlbHRhKSAtPlxuICAgIEBleGFtcGxlU3RhZ2UudXBkYXRlIGRlbHRhXG5cbiAgZHJhdzogKGNvbnRleHQpIC0+XG4gICAgQGV4YW1wbGVTdGFnZS5kcmF3IGNvbnRleHRcbiAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lU2NyZWVuXG4iLCJFeGFtcGxlQWN0b3IgPSByZXF1aXJlIFwiLi4vYWN0b3JzL2V4YW1wbGVhY3Rvci5jb2ZmZWVcIlxuXG5jbGFzcyBFeGFtcGxlU3RhZ2UgZXh0ZW5kcyBMREZXLlN0YWdlXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIHN1cGVyXG5cbiAgICBAYWN0b3IgPSBuZXcgRXhhbXBsZUFjdG9yIEBnYW1lXG5cbiAgdXBkYXRlOiAoZGVsdGEpIC0+XG4gICAgQGFjdG9yLnVwZGF0ZSBkZWx0YVxuXG4gIGRyYXc6IChjb250ZXh0KSAtPlxuICAgIEBhY3Rvci5kcmF3IGNvbnRleHRcblxubW9kdWxlLmV4cG9ydHMgPSBFeGFtcGxlU3RhZ2VcbiJdfQ==
;