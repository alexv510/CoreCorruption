/* --------------------------
an enemy Entity
------------------------ */
game.EnemyEntity = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
    settings.image = "wheelie_right";
      this.type == "EnemyEntity";
     
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;
      this.moveV = false;
      this.verticalDir = -1;
 
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.spritewidth = settings.width = 32;
    settings.spritewidth = settings.height = 32;
     
    // call the parent constructor
    this._super(me.Entity, 'init', [x, y , settings]);
     
    // set start/end position based on the initial area size
    x = this.pos.x;
    this.startX = x;
    this.endX   = x + width - settings.spritewidth
    this.pos.x  = x + width - settings.spritewidth;
      
      //animation stuff
      this.renderable.addAnimation("run_right", [6,7,8] );
      this.renderable.addAnimation("run_left", [3,4,5] );
      this.renderable.addAnimation("run_up", [0,1,2] );
      this.renderable.addAnimation("run_down", [9,10,11] );
      
 
    // manually update the entity bounds as we manually change the position
    this.updateBounds();
 
    // to remember which side we were walking
    this.walkLeft = false;
 
    // walking & jumping speed
    this.body.setVelocity(1, 1);
	this.body.gravity = 0.0;
     
  },
 
  // manage the enemy movement
  update: function(dt) {
 
    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
      this.walkLeft = false;
    } else if (!this.walkLeft && this.pos.x >= this.endX) {
      this.walkLeft = true;
    }
    // make it walk
   // this.renderable.flipX(this.walkLeft);
   // this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
        if(this.walkLeft&& !this.moveV){
            this.body.vel.x +=-this.body.accel.x * me.timer.tick;
            if(!this.renderable.isCurrentAnimation("run_left")){
        this.renderable.setCurrentAnimation("run_left");
            }
        }else if(!this.moveV){
                    this.body.vel.x +=this.body.accel.x * me.timer.tick;
            if(!this.renderable.isCurrentAnimation("run_right")){
              this.renderable.setCurrentAnimation("run_right");
            }
        }else if(this.moveV && this.verticalDir > 0){
                this.body.vel.y +=this.body.accel.y*me.timer.tick;
                if(!this.renderable.isCurrentAnimation("run_down")){
              this.renderable.setCurrentAnimation("run_down");
            }
        }else{
                this.body.vel.y -=this.body.accel.y*me.timer.tick;
            if(!this.renderable.isCurrentAnimation("run_up")){
              this.renderable.setCurrentAnimation("run_up");
            }
        }
     
    } else {
      this.body.vel.x = 0;
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
    if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
      // res.y >0 means touched by something on the bottom
      // which mean at top position for this one
      if (this.alive && (response.overlapV.y > 0)  || (response.overlapV.x > 0)) {
        this.renderable.flicker(750);
      }
        if((response.overlapV.y > 0) && response.b.type!== 'EnemyEntity'){
             this.moveV = true;
             this.verticalDir = this.verticalDir*-1;
         }else if ((response.overlapV.x > 0)){
                this.moveV = false;
             this.verticalDir = this.verticalDir*-1;
         }
      return false;
    }
      if((response.overlapV.y > 0)){
             this.moveV = true;
             this.verticalDir = this.verticalDir*-1;
         }else if ((response.overlapV.x > 0)){
                this.moveV = false;
             this.verticalDir = this.verticalDir*-1;
         }
    // Make all other objects solid
    return true;
  }
});