const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const datahandler = require("../../dataHandler")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription("Issue a suggestion for Bristo."),
	async execute(interaction, client) {
        const modals = require('discord-modals')

        await datahandler.checkUserProfile(interaction.user.id)
		const suggestionmodal = new modals.Modal()
        .setCustomId('suggestion')
        .setTitle("Make a suggestion")
        .addComponents([
            new modals.TextInputComponent()
            .setCustomId('input')
            .setStyle('LONG')
            .setPlaceholder("Your suggestion")
            .setRequired(true)
            .setLabel("Your suggestion")
        ])
        modals.showModal(suggestionmodal, {client: client, interaction: interaction})
	},
};