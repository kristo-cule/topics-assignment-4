const xss = require('xss');
const NameService = require('./name.service');
// https://www.npmjs.com/package/xss

module.exports = (io) => {
  io.on('connection', (socket) => {
    // populate autocomplete from db
    socket.on('autocomplete', async (input) => {
      const autoNames = await NameService.getNames(input);
      const xssNames = [];
      autoNames.forEach((MyName) => {
        xssNames.push({ name: xss(MyName.name) });
      });

      socket.emit('autocomplete', xssNames);
    });
    // submit final string
    socket.on('final', async (input) => {
      const temp = await NameService.createName(xss(input));
      socket.emit('final', temp.name);
    });
  });
};
