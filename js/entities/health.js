/**
 * Coin Entity
 */
game.HealthPack = me.CollectableEntity.extend( {    
    init: function (x, y, settings) {
        // call the parent constructor
        this._super(me.CollectableEntity, 'init', [x, y , settings]);
    },

    /**
     * colision handler
     */
    onCollision : function (response, other) {
		game.data.hp += 15;
        //avoid further collision and delete it
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        me.game.world.removeChild(this);

        return false;
    }
});