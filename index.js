const Discord = require('discord.js');
const client = new Discord.Client();
const ScoreBoard = require('./commands/ScoreBoard');
const Help = require('./commands/Help');
require('dotenv').config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Octogone avec mamie | !ban help').catch(console.error);
});

client.on('message', async message => {
  ScoreBoard.parse(message);
  Help.parse(message);
});

client.login(process.env.DISCORD_TOKEN);
