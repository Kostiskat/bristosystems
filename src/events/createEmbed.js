const { Discord, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        const ticketembed = new MessageEmbed()
        .setTitle("Support System")
        .setColor("#6afc91")
        .setDescription("Looking to get support from a member of our staff team? This is the appropriate place to do so. Please select a valid category that matches your inquiry. Appeals may take longer than usual to be dealed with, since it requires more attention that other support categories. Please note that in order to appeal, your account must be incorrectly banned, unless 30 or more days have passed since your punishment date, then you can appeal your ban normally. Support representatives may take up to 24-48 hours on business days, and up to a day on weekends. \n \n :question: **General Support**: Get support regarding our services. This includes info on how our corporation functions or questions about the Discord server. \n :notepad_spiral: **Appeal a punishment** Do you think your punishment is unjustified? Open a ticket by selecting this topic and a member of our staff team will be there with you to solve the issue. \n :bell: **Other questions**: Other inquiries such as partnership information, or any other issues you might be facing should be discussed under this category. \n\n **Warning:** Unsolicited or troll tickets will be closed immidiately and the creator will face appropriate consequences, up to account termination, depending on the severity of the action(s).")
client.guilds.cache.get("919708634596913172").channels.cache.get("921816425457401946").bulkDelete(100); client.guilds.cache.get("919708634596913172").channels.cache.get("921816425457401946").send({embeds: [ticketembed]}).then(interaction => {
            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId('ticketselect')
                .setPlaceholder("No category selected")
                .addOptions([
                    {
                        label: 'General Support',
                        emoji: "❓",
                        value: "general_support",
                        description: "Get general support."
                    },
                    {
                        label: 'Appeal a punishment',
                        emoji: "📓",
                        value: "appeal_punishment",
                        description: "Appeal a ban. Read instructions above."

                    },
                    {
                        label: "Other questions",
                        emoji: "🔔",
                        value: "other_questions",
                        description: "Questions related to partnerships, other inquiries etc."
                    }
                ])
            )
            interaction.edit({embeds: [ticketembed], components: [row]})
        })
    }
}