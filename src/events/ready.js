module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
            setInterval(() => {
                client.user.setActivity("with " + client.guilds.cache.get('919708634596913172').memberCount + " members")
                setTimeout(() => {
                    client.user.setActivity("Bristo v1 😳")
                    setTimeout(() => {
                        client.user.setActivity("with cookies")
                    }, 10000);  
                }, 10000);
            }, 10000);
	},
};