var mineflayer = require('../');
var vec3 = mineflayer.vec3;
var bot = mineflayer.createBot({
  username: "chatterbox",
  viewDistance: "tiny",
});
bot.on('health', function() {
  bot.chat("I have " + bot.health + " health and " + bot.food + " food");
});
bot.on('login', function() {
  console.log("I logged in.");
  console.log("settings", bot.settings);
});
bot.on('playerJoined', function(player) {
  bot.chat("hello, " + player.username + "! welcome to the server.");
});
bot.on('playerLeft', function(player) {
  console.log("bye " + player.username);
});
bot.on('rain', function() {
  if (bot.isRaining) {
    bot.chat("it started raining");
  } else {
    bot.chat("it stopped raining.");
  }
});
bot.on('kicked', function(reason) {
  console.log("I got kicked for", reason, "lol");
});
bot.on('spawn', function() {
  bot.chat("I have spawned");
  console.log("game", bot.game);
});
bot.on('death', function() {
  bot.chat("I died x.x");
});
bot.on('chat', function(username, message) {
  var block, pos;
  if (message === 'pos') {
    bot.chat("I am at " + bot.entity.position + ", you are at " + bot.game.players[username].entity.position);
  } else if (message === 'spawn') {
    bot.chat("spawn is at " + bot.game.spawnPoint);
  } else if (message === 'quit') {
    bot.quit(username + "told me to");
  } else if (message === 'set') {
    bot.setSettings({viewDistance: 'normal'});
  } else if (message === 'block') {
    block = bot.blockAt(bot.game.players[username].entity.position.offset(0, -1, 0));
    bot.chat("block under you is " + block.displayName + " in the " + block.biome.name + " biome");
  } else if (message === 'blocksdown') {
    pos = bot.game.players[username].entity.position.clone();
    setInterval(function() {
      var block = bot.blockAt(pos);
      console.log("pos " + pos + ": " + block.displayName + ", " + block.biome.name);
      pos.translate(0, -1, 0);
    }, 500);
  } else {
    bot.chat("That's nice.");
  }
});
bot.on('nonSpokenChat', function(message) {
  console.log("non spoken chat", message);
});
bot.on('spawnReset', function(message) {
  console.log("oh noez!! my bed is broken.");
});
var map = {};
bot.on('entitySwingArm', function(entity) {
  map[entity.id] = map[entity.id] || 0;
  map[entity.id] += 1;
  bot.chat(entity.username + ", you've swung your arm " + map[entity.id] + "times.");
});
bot.on('entityHurt', function(entity) {
  if (entity.type === 'mob') {
    bot.chat("Haha! The " + entity.mobType + " got hurt!");
  } else if (entity.type === 'player') {
    bot.chat("aww, poor " + entity.username + " got hurt. maybe you shouldn't have a ping of " + bot.game.players[entity.username].ping);
  }
});
bot.on('entityWake', function(entity) {
  bot.chat("top of the morning, " + entity.username);
});
bot.on('entitySleep', function(entity) {
  bot.chat("good night, " + entity.username);
});
bot.on('entityEat', function(entity) {
  bot.chat(entity.username + ": OM NOM NOM NOMONOM. that's what you sound like.");
});
bot.on('entityCrouch', function(entity) {
  bot.chat(entity.username + ": you so sneaky.");
});
bot.on('entityUncrouch', function(entity) {
  bot.chat(entity.username + ": welcome back from the land of hunchbacks.");
});
bot.on('entityEquipmentChange', function(entity) {
  console.log("entityEquipmentChange", entity)
});
bot.on('entitySpawn', function(entity) {
  if (entity.type === 'mob' && false) {
    bot.chat("look out - a " + entity.mobType + " spawned at " + entity.position);
  } else if (entity.type === 'player') {
    bot.chat("look who decided to show up: " + entity.username);
  } else if (entity.type === 'object') {
    //bot.chat("there's a " + entity.objectType + " at " + entity.position);
  }
});
bot.on('playerCollect', function(collector, collected) {
  if (collector.type === 'player' && collected.type === 'object') {
    bot.chat("I'm so jealous. " + collector.username + " collected " + collected.objectType);
  }
});
bot.on('entityDetach', function(entity, vehicle) {
  if (entity.type === 'player' && vehicle.type === 'object') {
    bot.chat("lame - " + entity.username + " stopped riding the " + vehicle.objectType);
  }
});
bot.on('entityAttach', function(entity, vehicle) {
  if (entity.type === 'player' && vehicle.type === 'object') {
    bot.chat("sweet - " + entity.username  + " is riding that " + vehicle.objectType);
  }
});
bot.on('entityEffect', function(entity, effect) {
  console.log("entityEffect", entity, effect);
});
bot.on('entityEffectEnd', function(entity, effect) {
  console.log("entityEffectEnd", entity, effect);
});
