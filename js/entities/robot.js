/* --------------------------
an enemy Entity
------------------------ */
game.RobotEntity = me.Entity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
  //  var skin = Math.floor((Math.random()*6)+1);
 this.hp = 500;
      settings.image = "robot";
       this.prevMove = 0;
    //settings.image = "wheelie_right";
	settings.name = "enemy";
      this.now = new Date().getTime();
      this.lastShot = new Date().getTime();
    this.touchSound = false; // is used to make sure sound is not repeated 
    // save the area size defined in Tiled
    var width = settings.width;
    var height = settings.height;
      this.moveV = false;
      this.verticalDir = -1;
	this.moveDir = 1;
    // adjust the size setting information to match the sprite size
    // so that the entity object is created with the right size
    settings.spritewidth = settings.width = 32;
    settings.spritewidth = settings.height = 32;
     
    // call the parent constructor
    this._super(me.Entity, 'init', [x, y , settings]);
     
    // set start/end position based on the initial area size
    x = this.pos.x;
    this.startX = x - 96;
    this.endX   = x + width - settings.spritewidth + 96;
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
    this.body.setVelocity( Math.floor((Math.random()*4)+1), Math.floor((Math.random()*4)+1));
	this.body.gravity = 0.0;
    this.body.setCollisionType = me.collision.types.ENEMY_OBJECT;
  },
 
  // manage the enemy movement
  update: function(dt) {
    this.now = new Date().getTime();
    if (this.alive) {
        if(this.hp <= 0) me.game.world.removeChild(this);
      if (this.walkLeft && this.pos.x <= this.startX) {
      this.walkLeft = false;
          this.touchSound = false; // here is where I change it to false
          this.body.setVelocity( Math.floor((Math.random()*7)+1), Math.floor((Math.random()*6)+1));
    } else if (!this.walkLeft && this.pos.x >= this.endX) {
      this.walkLeft = true;
        this.touchSound = false; // here too
        this.body.setVelocity( Math.floor((Math.random()*6)+1), Math.floor((Math.random()*6)+1));
    }
        var buffer = this.walkLeft ? -32:32;
        if((Math.round(this.now/1000)%1 === 0) && ((this.now - this.lastShot) >= 500)){
                this.lastShot = this.now;
                var bullet = me.pool.pull("EnemyBullet", this.pos.x+buffer, this.pos.y, {
				image: 'bullet',
				spritewidth: 24,
				spriteheight: 24,
				width: 24,
				height: 24
			}, [this.prevMove, downOn, leftOn, rightOn]);
			me.game.world.addChild(bullet, this.z);
        }
       
        
        if(this.pos.x - game.data.playerX <= 96 &&
             ( this.pos.y - game.data.playerY <= 32 ||
                this.pos.y - game.data.playerY >=32)){
                this.moveDir = 1;
        }else{
              this.moveDir = 3;
        }
    // make it walk
   // this.renderable.flipX(this.walkLeft);
   // this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
        if(this.walkLeft){
            this.prevMove = 3;
            this.body.vel.x +=-this.body.accel.x * me.timer.tick;
            if(!this.renderable.isCurrentAnimation("run_left")){
        this.renderable.setCurrentAnimation("run_left");
            }
        }else if(!this.walkLeft){
           this.prevMove = 1;
                    this.body.vel.x +=this.body.accel.x * me.timer.tick;
            if(!this.renderable.isCurrentAnimation("run_right")){
              this.renderable.setCurrentAnimation("run_right");
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
  }
  },
   
  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
    if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
      // res.y >0 means touched by something on the bottom
      // which mean at top position for this one
  if(response.b.body.collisionType === me.collision.types.PROJECTILE_OBJECT) {
      this.hp -= 10;
        this.renderable.flicker(750);
  }
      if (this.alive && ((response.overlapV.y >= 0)  || (response.overlapV.x >= -5)) && response.b.body.collisionType === me.collision.types.PLAYER_OBJECT ) {
  //sif(response.b.body.collisionType === me.collision.types.PROJECTILE_OBJECT) this.hp -= 10;
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
             this.body.setVelocity( Math.floor((Math.random()*6)+1), Math.floor((Math.random()*6)+1));
         }
       
      return false;
    }
       if ((response.overlapV.x >= -5)&& response.b.body.collisionType !== me.collision.types.PLAYER_OBJECT){
                this.walkLeft = this.walkLeft ? false: true;
           this.body.setVelocity( Math.floor((Math.random()*6)+1), Math.floor((Math.random()*6)+1));
         }
      //this.touchSound = false;
    // Make all other objects solid
    return true;
  }
});