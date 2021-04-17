const { MessageEmbed } = require('discord.js');
const Command = require('./Command');

module.exports = class Prison extends Command {

    static match(message) {
        return message.content.startsWith("!ban")
    }

    static action(message) {
        switch (message.content) {
            case '!ban scoreboard':
                this.showScoreboard(message)
                break;
        
            default:
                break;
        }
    }

    /**
     * Show a scoreboard who represent the members that disconnected the most members from the discord recently
     * 
     * @param {Discord.Message} message 
     */
    static async showScoreboard(message) {
        const fetchDisconnectedMemberLogs = await message.guild.fetchAuditLogs({type: 'MEMBER_DISCONNECT'});
        const scoreboard = this.getDisconnectedScoreboard(fetchDisconnectedMemberLogs.entries);
        const reply = this.getScoreboardReply(scoreboard);

        message.reply(reply);
    }

    /**
     * Transform the disconnected member logs entries in a scoreboard array
     * 
     * The scoreboard represent the members that disconnect the most people from the discord
     * 
     * @param {Array} entries 
     * @returns {Array} the scoreboard with the following format : [[username: number of disconnection]]
     */
    static getDisconnectedScoreboard(entries) {
        let scoreboard = new Object();

        entries.forEach(guildAuditLogsEntry => {
            if (scoreboard[guildAuditLogsEntry.executor.username] != undefined) {
                scoreboard[guildAuditLogsEntry.executor.username] = scoreboard[guildAuditLogsEntry.executor.username] + guildAuditLogsEntry.extra.count;
            } else {
                scoreboard[guildAuditLogsEntry.executor.username] = guildAuditLogsEntry.extra.count;
            }
        })

        return Object.entries(scoreboard).sort((a, b) => b[1] - a[1]);
    }

    /**
     * Get a discord reply from a scoreboard array
     * 
     * @param {Array} scoreboard 
     * @returns {String} Reply
     */
    static getScoreboardReply(scoreboard) {
        const totalDisconnectedMembers = this.getTotalDisconnectedMembersFromScoreboard(scoreboard)
        let embed = new MessageEmbed()
            .setTitle(`Top des plus gros sagouins sur les ${totalDisconnectedMembers} derniers bans effectués\n`);

        scoreboard.forEach((rank, key) => {
            let bans = rank[1] > 1 ? "bans" : "ban";
            embed.addField(`#${(key + 1)} ${rank[0]}`, `avec ${rank[1]} ${bans}`);
        })

        return embed;
    }

    /**
     * @param {Array} scoreboard 
     * @returns {Int} Total
     */
    static getTotalDisconnectedMembersFromScoreboard(scoreboard) {
        return scoreboard.reduce((accumulator, array) => {
            accumulator += array[1];
            return accumulator;
        }, 0)
    }
}