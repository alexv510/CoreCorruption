game.EnemyUp = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
     var skin = Math.floor((Math.random()*6)+1);
      switch(skin){
              case 1: settings.image = "wheelie_up"; break;
              case 2: settings.image = "cop2";break;
              case 3: settings.image = "wheelie_right"; break;
              case 4: settings.image = "cop4";break;
              case 5: settings.image = "cop5";break;
              case 6: settings.image = "cop6";break;
              default: settings.image = "cop6";break;
      }
     this.touchSound = false;
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;
    this.type = "EnemyEntity";
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.spritewidth = settings.width = 32;
    settings.spriteheight = settings.height = 32;
     
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

	
 this.renderable.addAnimation("run_up", [0,1,2] );
      this.renderable.addAnimation("run_down", [9,10,11] );
    // walking & jumping speed
    this.body.setVelocity(2, 3);
     
  },
 
  // manage the enemy movement
  update: function(dt) {
 
    if (this.alive) {
      if (this.walkLeft && this.pos.y <= this.startY) {
      this.walkLeft = false;
           this.touchSound = false; // here is where I change it to false
          this.body.setVelocity( Math.floor((Math.random()*5)+1), Math.floor((Math.random()*5)+1));
    } else if (!this.walkLeft && this.pos.y >= this.endY) {
      this.walkLeft = true;
         this.touchSound = false; // here is where I change it to false
        this.body.setVelocity( Math.floor((Math.random()*5)+1), Math.floor((Math.random()*5)+1));
    }
    // make it walk
   // this.renderable.flipX(this.walkLeft);
     if(this.walkLeft){
            this.body.vel.y +=-this.body.accel.y * me.timer.tick;
            if(!this.renderable.isCurrentAnimation("run_down")){
        this.renderable.setCurrentAnimation("run_down");
            }
        }else if(!this.walkLeft){
                    this.body.vel.y +=this.body.accel.y * me.timer.tick;
            if(!this.renderable.isCurrentAnimation("run_up")){
              this.renderable.setCurrentAnimation("run_up");
            }
        
     
    } else {
      this.body.vel.x = 0;
    }
     
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
  if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
      // res.y >0 means touched by something on the bottom
      // which mean at top position for this one

      if (this.alive && ((response.overlapV.y >= 0)  || (response.overlapV.x >= -5)) && response.b.body.collisionType === me.collision.types.PLAYER_OBJECT ) {

       // this.renderable.flicker(750);
          //here i removed flickering and added audio stuff
         var choose = Math.floor((Math.random()*3)+1);
         if(this.touchSound == false){
          switch(choose){
                case 1: me.audio.play("criminalscum", .5);
                        this.touchSound = true;
                        break;
                case 2: me.audio.play("stoprest", .5); this.touchSound = true;break;
                
                case 3: me.audio.play("freezescumbag", .5);this.touchSound = true; break;
                  
                default: me.audio.play("stoprest");this.touchSound = true; break;
          }
         }
          
      }
         if ((response.overlapV.x >= -5)&& response.b.body.collisionType !== me.collision.types.PLAYER_OBJECT){
                //this.moveV = false;
            this.walkLeft = this.walkLeft ? false: true;
             this.body.setVelocity( Math.floor((Math.random()*5)+1), Math.floor((Math.random()*5)+1));
         }
       
      return false;
    }
       if ((response.overlapV.x >= -5)&& response.b.body.collisionType !== me.collision.types.PLAYER_OBJECT){
                this.walkLeft = this.walkLeft ? false: true;
           this.body.setVelocity( Math.floor((Math.random()*5)+1), Math.floor((Math.random()*5)+1));
         }
      //this.touchSound = false;
    // Make all other objects solid
    return true;
}
});