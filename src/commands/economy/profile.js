const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const datahandler = require("../../dataHandler")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription("Display your Bristo profile."),
	async execute(interaction) {
        await datahandler.checkUserProfile(interaction.user.id)
		const profileEmbed = new MessageEmbed()
        .setTitle(`Player profile for ${interaction.user.username}`)
        .setColor('#6afc91')
        .setDescription(`Hello, <@${interaction.user.id}>. You can view the Jumobos earned below. If you wish, you may exchange these Jumobos for in-game coins. \n\n **Current rate:** <:jumobo:941073795232460951> 1000 for :dollar: 100 (Run "/exchange" to exchange these.) \n\n Please note that we do NOT refund Jumobo exchanges. All transactions are final! \n\n **Your Jumobos:** ${await datahandler.getUserCoins(interaction.user.id)}`)
        await interaction.reply({embeds: [profileEmbed]})
        await console.log(datahandler.getUserCoins(interaction.user.id))
	},
};