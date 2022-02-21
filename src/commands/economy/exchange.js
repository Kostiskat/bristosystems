const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const datahandler = require("../../dataHandler")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('exchange')
		.setDescription("Exchange Jumobos for in-game coins. User /profile to view current exchange rates."),
	async execute(interaction) {
        const successembed = new MessageEmbed()
        .setTitle("Transaction was successful!")
        .setColor('#6afc91')
        .setDescription("<:like:927016619010580511> All done! I have just converted <:jumobo:941073795232460951> **1000** to :dollar: **100**. Enjoy your newly acquired coins!")
        const failsembed = new MessageEmbed()
        .setTitle("Uh, oh!")
        .setColor('#6afc91')
        .setDescription("<:dislike:927016619241267260> Uhm.. That's really embarassing. It looks like I can't do that yet. Please try running this command once your account reaches **1000** or more Jumobos!\n\nTo view your current balance, try running ``/profile``.")
        const coins = await datahandler.getUserCoins(interaction.user.id)
        console.log(coins)
        if (coins >= 1000) {
            await datahandler.updateUserCoins(interaction.user.id, -1000)
            await datahandler.UpdateIngameCoins(interaction.user.id, 100)
            await interaction.reply({embeds: [successembed]})
        } else {
            await interaction.reply({embeds: [failsembed]})
        }
	},
};