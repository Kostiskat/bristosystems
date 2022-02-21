const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription("Get a word from Bristo System's magic 8-ball!")
        .addStringOption(option => option.setName('question').setDescription('Enter a question.').setRequired(true)),
	async execute(interaction) {
		const xml = require('xmlhttprequest').XMLHttpRequest;
        const eightballhttp = new xml()
        console.log(interaction.options.getString('question'))
        console.log('https://8ball.delegator.com/magic/JSON/' + encodeURIComponent(interaction.options.getString('question')))
        eightballhttp.open('GET', 'https://8ball.delegator.com/magic/JSON/' + encodeURIComponent(interaction.options.getString('question')))
        eightballhttp.send('');
        eightballhttp.addEventListener('load', function() {
            console.log(eightballhttp.responseText)
            interaction.reply({content: ':8ball: **Hm..** Let me check my magic 8-ball! \n\n <:treasuremap:924414454794440744> **Question:** ' + interaction.options.getString('question') + "\n <:finish1:924420173228806194> **Answer:** " + JSON.parse(eightballhttp.responseText).magic.answer})
        })
	},
};