const { MessageEmbed } = require('discord.js');
const Command = require('./Command');

module.exports = class Help extends Command {

    static match(message) {
        return message.content.startsWith("!ban");
    }

    static action(message) {
        switch (message.content) {
            case '!ban help':
                this.showHelp(message);
                break;
            default:
                break;
        }
    }

    /**
     * Show user documentation 
     * 
     * @param {Discord.Message} message 
     */
    static showHelp(message) {
        let embed = new MessageEmbed()
            .setTitle("Ban bot Help")
            .addField("!ban scoreboard", "Tableau des scores des membres ayant effectués le plus de bans")

        message.reply(embed);
    }

}