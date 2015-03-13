game.EnemyUp = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
    settings.image = "wheelie_up";
     
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;
    this.type = "EnemyEntity";
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.spritewidth = settings.width = 64;
    settings.spriteheight = settings.height = 64;
     
    // call the parent constructor
    this._super(me.Entity, 'init', [x, y , settings]);
     
	 this.body.gravity = 0;
	 
    // set start/end position based on the initial area size
    y = this.pos.y;
    this.startY = y;
    this.endY   = y + height - settings.spriteheight;
    this.pos.y  = y + height - settings.spriteheight;
 
    // manually update the entity bounds as we manually change the position
    this.updateBounds();
 
 this.renderable.flipX(this.walkLeft);
    // to remember which side we were walking
    this.walkLeft = false;

	
 
    // walking & jumping speed
    this.body.setVelocity(2, 3);
     
  },
 
  // manage the enemy movement
  update: function(dt) {
 
    if (this.alive) {
      if (this.walkLeft && this.pos.y <= this.startY) {
      this.walkLeft = false;
    } else if (!this.walkLeft && this.pos.y >= this.endY) {
      this.walkLeft = true;
    }
    // make it walk
   // this.renderable.flipX(this.walkLeft);
    this.body.vel.y += (this.walkLeft) ? -this.body.accel.y * me.timer.tick : this.body.accel.y * me.timer.tick;
     
    } else {
      this.body.vel.y = 0;
    }
           
    // update the body movement
    this.body.update(dt);
     
    // handle collisions against other shapes
    me.collision.check(this);
       
    // return true if we moved or if the renderable was updated
    return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
  },
   
  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
  switch (response.b.body.collisionType) {
    case me.collision.types.WORLD_SHAPE:
      // Simulate a platform object
      if (other.type === "platform") {
        if (this.body.falling &&
          !me.input.isKeyPressed('down') &&
          // Shortest overlap would move the player upward
          (response.overlapV.y > 0) &&
          // The velocity is reasonably fast enough to have penetrated to the overlap depth
          (~~this.body.vel.y >= ~~response.overlapV.y)
        ) {
          // Disable collision on the x axis
          response.overlapV.x = 0;
          // Repond to the platform (it is solid)
          return true;
        }
        // Do not respond to the platform (pass through)
        return false;
      }
      break;
 
    case me.collision.types.ENEMY_OBJECT:
      if ((response.overlapV.y>0) && !this.body.jumping) {
        // bounce (force jump)
        this.body.falling = false;
        this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        // set the jumping flag
        this.body.jumping = true;
      }
      else {
        // let's flicker in case we touched an enemy
        this.renderable.flicker(750);
      }
      return false;
      break;
 
    default:
      // Do not respond to other objects (e.g. coins)
      return false;
  }
 
  // Make the object solid
  return true;
}
});