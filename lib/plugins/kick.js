module.exports = inject;

function inject(bot) {
  bot.client.on(0xff, function(packet) {
    bot.emit('kicked', packet.reason);
  });
  bot.quit = function(reason) {
    bot.client.write(0xff, { reason: reason });
  };
}
