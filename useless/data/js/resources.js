//resource code this is where we load all images, sounds, levels, etc

//game resources
game.resources = [
  /**
   * Graphics.
   */
  // our level tileset
  {name: "title",  type:"image", src: "data/image/map/title.png"},
    {name: "tmw_desert_spacing",  type:"image", src: "data/image/map/tmw_desert_spacing.png"},
 
  /* 
   * Maps. 
   */
  {name: "titleproto", type: "tmx", src: "data/map/titleproto.tmx"},
    
   /* 
  * Background music. 
  */
  {name: "theme", type: "audio", src: "data/bgm/"}
   
];