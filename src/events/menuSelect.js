const { SelectMenuInteraction, Permissions, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if(!interaction.isSelectMenu()) return;
        if(!interaction.customId == "ticketselect") return;
        let reason = "";
        switch(interaction.values[0]) {
            case "general_support":
                reason = "❓**General Support**"
                break;
            case "appeal_punishment":
                reason = "📒 **Appeal a punishment**"
                break;
            case "other_questions":
                reason = "🔔 **Other questions**"
                break;
        }
        let isopen = false;
       client.guilds.cache.get("919708634596913172").channels.cache.forEach(channel => {
           if(channel.name.includes(interaction.member.id)) {
               interaction.reply({content: "You already have an open ticket. Please wait for it to be solved before creating a new one.", ephemeral: true})
               isopen = true;
           }
       });
       if(isopen == true) {
           isopen = false;
        return;
       } 

        await interaction.guild.channels.create("ticket_" + interaction.member.id, {
            type: "GUILD_TEXT",
            parent: "921819368495652965",
            permissionOverwrites: [
                {
                    id: interaction.member.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.ADD_REACTIONS]
                }
            ],
            topic: reason + ` ticket for <@${interaction.member.id}>`
        }).then(channel => {
            channel.lockPermissions();
            channel.edit({permissionOverwrites: [{
                id: interaction.member.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.ADD_REACTIONS]
            },
            {
                id: "935735705957707777",
                deny: [Permissions.FLAGS.VIEW_CHANNEL]
            },
            {
                id: "921818427100913705",
                deny: [Permissions.FLAGS.VIEW_CHANNEL]
            },
            {
                id: "919708634596913172",
                deny: [Permissions.FLAGS.VIEW_CHANNEL]
            },
            {
                id: "922296648607100948",
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.VIEW_CHANNEL]
            }
        ]})
            interaction.reply({content: `I have created a support channel for you! <#${channel.id}>`, ephemeral: true})
            const startembed = new MessageEmbed()
            .setTitle("Support Ticket")
            .setDescription("Greetings. Thanks for reaching out via our support system for " + reason + ". A support representative will be with you shortly. In the meanwhile, feel free to describe the issue below. Please do be as descriptive as possible to help us solve your issue quicker.")
            .setColor("#6afc91");
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('close')
                .setLabel("Close Ticket")
                .setStyle("DANGER"),
            );
            channel.send({content: `<@${interaction.member.id}>`, embeds: [startembed], components: [row]})
        })
        
    }
}