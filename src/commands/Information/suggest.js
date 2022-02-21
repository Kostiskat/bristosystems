const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const datahandler = require("../../dataHandler")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription("Issue a suggestion for Bristo.")
        .addStringOption(option => option.setName('suggestion').setRequired(true).setDescription("Your suggestion")),
	async execute(interaction, client) {
        await datahandler.checkUserProfile(interaction.user.id)
		const suggEmbed = new MessageEmbed()
        .setTitle(`New suggestion from ${interaction.user.username}`)
        .setColor('#6afc91')
        .setDescription(`New suggestion from <@${interaction.user.id}>. Please vote using the appropriate emojis for it to be more easily recognized by the staff team. \n\n > *${interaction.options.getString('suggestion')}*`)
        await interaction.reply("Suggestion submitted!")
        await interaction.guild.channels.cache.get("921817257703780434").send({embeds: [suggEmbed]}).then(async message => {
           await message.react("<:like:927016619010580511> ")
           await message.react("<:dislike:927016619241267260>")
        })
	},
};