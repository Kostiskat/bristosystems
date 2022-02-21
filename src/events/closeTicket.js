const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const { setTimeout } = require ("timers/promises");

module.exports = {
    name: "interactionCreate",
    async execute (interaction, client) {
        if(!interaction.isButton()) return;
        await interaction.reply("I will be closing this ticket in 5 seconds.")
        fs.writeFile(interaction.channel.name.split("_")[1] + "_ticket.txt", "Your ticket transcript\n\n", function() {})
        interaction.channel.messages.fetch({limit: 100}).then(async messages => {
            messages.reverse();
            const stream = fs.createWriteStream(interaction.channel.name.split("_")[1] + "_ticket.txt", {flags: 'a'});
           messages.forEach(element => {
              stream.write(`\n[${element.author.username}] ${element.content}`)
           });
           stream.end();
        })
        await setTimeout(5000);
            const closeembed = new MessageEmbed()
            .setTitle("Support Ticket")
            .setDescription(`Your support ticket has been closed by <@${interaction.member.id}>. If you feel like your issues were not covered, please feel free to open another one with an appropriate reason. Below, I have attached a transcript of your ticket if you wish to review the chat logs. **Thanks for reaching out!** :slight_smile:`)
            .setColor("#6afc91");
            await client.guilds.cache.get("919708634596913172").members.cache.get(interaction.channel.name.split("_")[1]).send({files: [interaction.channel.name.split("_")[1] + "_ticket.txt"], embeds: [closeembed], })
            await client.guilds.cache.get("919708634596913172").channels.cache.get("921819863012507708").send({files: [interaction.channel.name.split("_")[1] + "_ticket.txt"], content: `Ticket logs for <@${interaction.channel.name.split("_")[1]}>. Closed by <@${interaction.user.id}>`})
            await interaction.channel.delete();
            

    
    }
}