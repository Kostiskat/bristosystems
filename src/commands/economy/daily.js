const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const datahandler = require("../../dataHandler")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription("Earn your daily Jumobos!"),
	async execute(interaction) {
		await datahandler.checkUserProfile(interaction.user.id)
		const data = await datahandler.getRewardEligibility(interaction.user.id)
		let reward = 100 * (data[1] + 1)
		if(interaction.member.roles.cache.has("923586300823609414")) {
			reward = reward + reward/2
		};
		const weeklyembed = new MessageEmbed()
        .setTitle(`Weekly reward`)
        .setColor('#6afc91')
        .setDescription(`Hello, <@${interaction.user.id}>. You have been granted your daily Jumobo reward of <:jumobo:941073795232460951> **${reward}**! Come tomorrow for a bigger reward. \n\n **Current streak:** ${data[1]} ${interaction.member.roles.cache.has("941076406459306064") ? "\n\n<:heart1:924420172905857085> **Awe!** Thanks for boosting our server. As a reward, I have decided to give you an extra **50%** in your daily reward. Enjoy!" : ""}`)
		const failembed = new MessageEmbed()
        .setTitle(`Weekly reward`)
        .setColor('#6afc91')
        .setDescription(`Hey there, <@${interaction.user.id}> it looks like you are not yet eligible for your daily reward. Please come back <t:${parseInt(data[0]) + 86400}:R>`)
		if(data[2] == true) {
			datahandler.setStreak(interaction.user.id, 1)
			await interaction.reply({embeds: [weeklyembed]})
			await datahandler.updateUserCoins(interaction.user.id, reward)
			console.log(Date.now() - data[0])
			if(Date.now() - data[0] >= 172800 && data[1] > 0) {
				await datahandler.setStreak(interaction.user.id, -data[1])
				await interaction.followUp("You lost your daily streak! It has been reset back to **0**. That's so sad. :(")
			}
		} else {
			await interaction.reply({embeds: [failembed]})
		}
	},
};