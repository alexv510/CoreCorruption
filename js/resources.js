//game resources
game.resources = [
  /**
   * Graphics.
   */
  // our level tileset
  {name: "asphault",  type:"image", src: "data/img/map/asphault.png"},
  {name: "grass", type:"image", src: "data/img/map/grass.png"},
  {name: "dirt", type:"image", src: "data/img/map/dirt.png"},
  {name: "car_beat_up", type:"image", src: "data/img/map/car_beat_up.png"},
  {name: "car_beat_up_flip", type:"image", src: "data/img/map/car_beat_up_flip.png"},
  {name: "car2", type:"image", src: "data/img/map/car2.png"},
  {name: "car2_flip", type:"image", src: "data/img/map/car2_flip.png"},
  {name: "car1", type:"image", src: "data/img/map/car1.png"},
  {name: "container_blue", type:"image", src: "data/img/map/container_blue.png"},
  {name: "dumpster1", type:"image", src: "data/img/map/dumpster1.png"},
  {name: "building2", type:"image", src: "data/img/map/building2.png"},
  {name: "hydrant", type:"image", src: "data/img/map/hydrant.png"},
  {name: "crate1", type:"image", src: "data/img/map/crate1.png"},
  {name: "building_brick", type:"image", src: "data/img/map/building_brick.png"},
  {name: "container_red", type:"image", src: "data/img/map/container_red.png"},
  {name: "sidewalk_path_side", type:"image", src: "data/img/map/sidewalk_path_side.png"},
  {name: "sidewalk_path", type:"image", src: "data/img/map/sidewalk_path.png"},
  {name: "sidewalk_end_top", type:"image", src: "data/img/map/sidewalk_end_top.png"},
  {name: "sidewalk_end_bottom", type:"image", src: "data/img/map/sidewalk_end_bottom.png"},
  {name: "sidewalk_end_bottomleft", type:"image", src: "data/img/map/sidewalk_end_bottomleft.png"},
  {name: "sidewalk_end_left", type:"image", src: "data/img/map/sidewalk_end_left.png"},
  {name: "sidewalk_end_bottomright", type:"image", src: "data/img/map/sidewalk_end_bottomright.png"},
  {name: "sidewalk_corner_top_right", type:"image", src: "data/img/map/sidewalk_corner_top_right.png"},
  {name: "sidewalk_corner_top_left", type:"image", src: "data/img/map/sidewalk_corner_top_left.png"},
  {name: "sidewalk_corner_bottom_right", type:"image", src: "data/img/map/sidewalk_corner_bottom_right.png"},
  {name: "sidewalk_corner_bottom_left", type:"image", src: "data/img/map/sidewalk_corner_bottom_left.png"},
    {name: "fence", type:"image", src: "data/img/map/fence.png"},
  {name: "metal_box", type:"image", src: "data/img/map/metal_box.png"},
  {name: "metal_floor", type:"image", src: "data/img/map/metal_floor.png"},
  {name: "wall_edge_bottom_right", type:"image", src: "data/img/map/wall_edge_bottom_right.png"},
  {name: "wall_edge_top_right", type:"image", src: "data/img/map/wall_edge_top_right.png"},
  {name: "wall_edge_bottom_left", type:"image", src: "data/img/map/wall_edge_bottom_left.png"},
  {name: "wall_edge_top_left", type:"image", src: "data/img/map/wall_edge_top_left.png"},
  {name: "wall_corner_top_right", type:"image", src: "data/img/map/wall_corner_top_right.png"},
  {name: "wall_corner_top_left", type:"image", src: "data/img/map/wall_corner_top_left.png"},
  {name: "wall_corner_bottom_left", type:"image", src: "data/img/map/wall_corner_bottom_left.png"},
  {name: "wall_corner_bottom_right", type:"image", src: "data/img/map/wall_corner_bottom_right.png"},
  {name: "wall_right", type:"image", src: "data/img/map/wall_right.png"},
  {name: "wall_left", type:"image", src: "data/img/map/wall_left.png"},
  {name: "wall_bottom", type:"image", src: "data/img/map/wall_bottom.png"},
  {name: "wall_top", type:"image", src: "data/img/map/wall_top.png"},
  {name: "metal_top", type:"image", src: "data/img/map/metal_top.png"},
  {name: "lightpole_left", type:"image", src: "data/img/map/lightpole_left.png"},
  {name: "lightpole_right", type:"image", src: "data/img/map/lightpole_right.png"},
  {name: "tape", type:"image", src: "data/img/map/tape.png"},
  {name: "boxes", type:"image", src: "data/img/map/boxes.png"},
  {name: "barrier", type:"image", src: "data/img/map/barrier.png"},
  {name: "building6", type:"image", src: "data/img/map/building6.png"},
  {name: "building5", type:"image", src: "data/img/map/building5.png"},
  {name: "building4", type:"image", src: "data/img/map/building4.png"},
  {name: "building3", type:"image", src: "data/img/map/building3.png"},
  {name: "building1", type:"image", src: "data/img/map/building1.png"},
  {name: "cone", type:"image", src: "data/img/map/cone.png"},
  {name: "manhole", type:"image", src: "data/img/map/manhole.png"},
  {name: "battery", type:"image", src: "data/img/map/battery.png"},
  {name: "disk", type:"image", src: "data/img/map/disk.png"},
  {name: "medkit", type:"image", src: "data/img/map/medkit.png"},
  {name: "laser gun", type:"image", src: "data/img/map/laser gun.png"},
  {name: "barrel1", type:"image", src: "data/img/map/barrel1.png"},
  {name: "box_big", type:"image", src: "data/img/map/box_big.png"},
  {name: "chair1", type:"image", src: "data/img/map/chair1.png"},
  {name: "chair2", type:"image", src: "data/img/map/chair2.png"},
  {name: "fence_chains", type:"image", src: "data/img/map/fence_chains.png"},
  {name: "rock1", type:"image", src: "data/img/map/rock1.png"},
  {name: "rocks", type:"image", src: "data/img/map/rocks.png"},
  {name: "street_line_horizontal", type:"image", src: "data/img/map/street_line_horizontal.png"},
  {name: "table", type:"image", src: "data/img/map/table.png"},
  {name: "trash_can", type:"image", src: "data/img/map/trash_can.png"},
    
  //screen stuff
  {name: "title-screen", type:"image", src: "data/img/title/title.png"},
  {name: "deathscreen", type:"image", src: "data/img/gui/deathscreen.png"},
 
  //font
  {name: "16x16_font", type: "image", src: "data/img/font/16x16_font.png"},
  {name: "32x32_font", type: "image", src: "data/img/font/32x32_font.png"},
 
  //entities
  {name: "player", type:"image", src: "data/img/sprite/knight.png"},
  {name: "spinning_coin_gold",  type:"image",	src: "data/img/map/disk.png"},
  // our enemty entity
  {name: "wheelie_right", type:"image", src: "data/img/sprite/cop3.png"},
  {name: "wheelie_up", type:"image", src: "data/img/sprite/wheelie_right.png"},
  
  //bullet
  {name: "bullet", type:"image", src: "data/img/map/bullet.png"},
  
  /* 
   * Maps. 
   */
  {name: "lvl1", type: "tmx", src: "data/map/lvl1.tmx"},
  
  //audio
  {name: "theme", type: "audio", src: "data/bgm2/"},
  {name: "LevelSong", type: "audio", src: "data/bgm3/"},
  {name: "criminalscum", type: "audio", src: "data/voice/"},
  {name: "stoprest", type: "audio", src: "data/voice/"},
  {name: "freezescumbag", type: "audio", src: "data/voice/"}
];