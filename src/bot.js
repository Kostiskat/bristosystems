const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const fs = require("fs");
const client = new Client({
  intents: [
     Intents.FLAGS.GUILDS,
     Intents.FLAGS.GUILD_MESSAGES,
     Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ]
});
require("dotenv").config();
const mongodb = require('mongodb')
const uri = "mongodb+srv://admin:admin@bristosystems.mddhu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mclient = new mongodb.MongoClient(uri, {useUnifiedTopology: true})
const modals = require('discord-modals')
modals(client)
// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()


client.commands = new Collection();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

client.on('modalSubmit', async (modal) => {
  console.log('hello')
  if(modal.customId === 'suggestion'){
    const firstResponse = modal.getTextInputValue('input')
    const suggEmbed = new MessageEmbed()
        .setTitle(`New suggestion from ${modal.user.username}`)
        .setColor('#6afc91')
        .setDescription(`New suggestion from <@${modal.user.id}>. Please vote using the appropriate emojis for it to be more easily recognized by the staff team. \n\n > ${firstResponse}`)
        await modal.reply("Suggestion submitted!")
        await modal.guild.channels.cache.get("921817257703780434").send({embeds: [suggEmbed]}).then(async message => {
           await message.react("<:like:927016619010580511> ")
           await message.react("<:dislike:927016619241267260>")
  })
 
} 
if(modal.customId === 'support') {
  const support = modal.getTextInputValue('brief-help')
  await modal.guild.channels.cache.find(channel => channel.name === "ticket_" + modal.user.id).send({content: "**Issue:** " + support})
  await modal.deferReply({ ephemeral: true })
  modal.followUp({ content: "Done!", ephemeral: true })
}
});

(async () => {
    for(file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
      mclient.connect(function(err, db) {
          if(err) throw err;
          exports.db = db
      })
    client.login(process.env.token);
    
})();