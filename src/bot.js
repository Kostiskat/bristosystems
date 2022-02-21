const { Client, Intents, Collection } = require('discord.js');
const fs = require("fs");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
require("dotenv").config();
const mongodb = require('mongodb')
const uri = "mongodb+srv://admin:admin@bristosystems.mddhu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mclient = new mongodb.MongoClient(uri, {useUnifiedTopology: true})
const datahandler = require("./dataHandler")
const fastify = require('fastify')({logger: true})


client.commands = new Collection();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");
const gracefulShutdown = require('http-graceful-shutdown');

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  const start = async () => {
    try {
      await fastify.listen(3000)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }

(async () => {
    for(file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
      start()
      mclient.connect(function(err, db) {
          if(err) throw err;
          exports.db = db
      })
    client.login(process.env.token);
    
})();