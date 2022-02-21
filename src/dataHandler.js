const { DataResolver } = require('discord.js')
const mongodb = require('mongodb')
const uri = "mongodb+srv://admin:admin@bristosystems.mddhu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mclient = new mongodb.MongoClient(uri, {useUnifiedTopology: true})
const database = require("./bot")

async function checkUserProfile(discordid) {
        const coins = await database.db.db("currency")
        await coins.collection("bristocoins").find({discordid: discordid}).toArray().then(result => {
            if(result[0] != undefined) {
                return result;
            } else {
                console.log("Got no results! Creating new user for " + discordid)
                console.log(parseInt(Math.floor(Date.now() / 1000)) + " g  re")
                coins.collection("bristocoins").insertOne({discordid: discordid, coins: 0, ingamecoins: 0, streak: 0, lastDaily: parseInt(Math.floor(Date.now()) / 1000 - 86400)}).catch(err => {
                    throw err;
                })
                coins.collection("bristocoins").find({discordid: discordid}).toArray().then(result => {

                    return result;
                }).catch(err => {
                    throw err;
                })
            }
        }).catch(err => {
            throw err;
        })
    
    
}

async function updateUserCoins(discordid, coinstoadd) {
    await checkUserProfile(discordid)
            const coins = await database.db.db("currency");
            await coins.collection("bristocoins").findOneAndUpdate({ discordid: discordid }, { $inc: { coins: coinstoadd } }, async function (err) {
                if (err)
                    throw err;
            });
        
}

async function updateStreak(discordid, streak) {
    await checkUserProfile(discordid)
            const coins = await database.db.db("currency");
            await coins.collection("bristocoins").findOneAndUpdate({ discordid: discordid }, { $inc: { streak: streak } }, async function (err) {
                if (err)
                    throw err;
            });
        
}

async function getUserCoins(discordid) {
    await checkUserProfile(discordid);
    const coins = await database.db.db("currency");
    
      const data = await coins.collection("bristocoins")
      .findOne({ discordid: discordid });
      console.log(data.coins)
      return data.coins

  }

  async function getRewardEligibility(discordid) {
    await checkUserProfile(discordid);
      const date = Math.floor(Date.now() / 1000)
      console.log(date)
      let isEligible = false
    const coins = await database.db.db("currency");
    
      const data = await coins.collection("bristocoins")
      .findOne({ discordid: discordid });
      if(date - data.lastDaily >= 86400) {
        await checkUserProfile(discordid);
          isEligible = true;
          coins.collection("bristocoins").findOneAndUpdate({discordid: discordid}, {$set: {lastDaily: date} }, async function (err) {
              if(err) throw err;  
          })

          
      }
      
      return [data.lastDaily, data.streak, isEligible]
  }

  async function updateUserInGameCurrency(discordid, coinstoadd) {
    await checkUserProfile(discordid)
            const coins = await database.db.db("currency");
            await coins.collection("bristocoins").findOneAndUpdate({ discordid: discordid }, { $inc: { ingamecoins: coinstoadd } }, async function (err) {
                if (err)
                    throw err;
            });
        
}

exports.checkUserProfile = checkUserProfile;
exports.updateUserCoins = updateUserCoins;
exports.getUserCoins = getUserCoins;
exports.getRewardEligibility = getRewardEligibility;
exports.setStreak = updateStreak;
exports.UpdateIngameCoins = updateUserInGameCurrency