const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const kanal = ayarlar.kanal;
const moment = require("moment");
const fs = require("fs");
const db = require('quick.db')
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
let prefix = ayarlar.prefix

const http = require("http");
app.get("/", (request, response) => {//splashen
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(` => { ${message} } `);
  
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {//splashen
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`AKTİF: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {//splashen
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {//splashen
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {//splashen
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

////////////////////////

client.elevation = message => {//splashen
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};

client.login(ayarlar.token);


client.on("ready", () => {//splashen
  client.user.setPresence({
    game: { name: `✭ Astrayos her daim ❤`, type: "WATCHING" },
    status: "online"
  });
});



// İSİM YAŞ İSİM DEĞİŞTİRME 

client.on("guildMemberAdd", member => {
  let tag = ayarlar.tag;
  //splashen
  member.setNickname(`${tag} İsim • Yaş`);
});

// İSİM YAŞ İSİM DEĞİŞTİRME SON






//BOT ROLÜ

client.on(`guildMemberAdd`, async member => {//splashen
  let botrol = ayarlar.botROL;
if(!member.bot) return;
member.addRole(botrol)
})

// BOT ROLÜ SON




// kayıtsız rolü

client.on(`guildMemberAdd`, async member => {
  let kayıtsızROL = ayarlar.kayıtsızROL;
if(member.bot) return;
member.addRole(kayıtsızROL)
})

/// kayıtsız rolü son
//splashen


// TAG LOG
client.on("userUpdate", async (oldUser, newUser) => {//splashen
  if (oldUser.username !== newUser.username) {
    let tag = ayarlar.tag
  
    let rol = ayarlar.tagROL;
    
    
    let embed1 = new Discord.RichEmbed()
    .setDescription(`${newUser} ${tag} tagını aldığı için <@&${rol}> rolünü kazandı!`)
    .setImage('https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif')
    
    let embed2 = new Discord.RichEmbed()
    .setDescription(`${newUser} ${tag} tagını çıkardığı için <@&${rol}> rolünü kaybetti!`)
    .setImage('https://cdn.discordapp.com/attachments/620989964104237077/766391664163029012/RDF_Barrinha-1-2-1-1-1-1-1-1.gif')
    
    if (newUser.username.includes(tag) && !client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).roles.has(rol)) {
      client.channels.get(ayarlar.tagLOG).send(embed1)
      client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).addRole(rol)
    } if (!newUser.username.includes(tag) && client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).roles.has(rol)) {
      client.guilds.get(ayarlar.sunucuID).members.get(newUser.id).removeRole(rol)
      client.channels.get(ayarlar.tagLOG).send(embed2)
    }

  }
})
// TAG LOG SON
//splashen

// BOT OTOROL

client.on('guildMemberAdd', async member => {//splashen
if(member.user.bot)
member.setRoles(['766634491502395392'])
})
// GİRİŞ 
  client.on("guildMemberAdd", member => {  
    var üyesayısı = member.guild.members.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
  '0': `<a:sfr:779317648839671829>`, // YAPMAYI BİLMİYORSAN VİDEOYU DİKKATLİ İZLE
    '1': `<a:bir:779317647572992000>`, // YAPMAYI BİLMİYORSAN VİDEOYU DİKKATLİ İZLE
    '2': `<a:iki:779317648684351498>`, // YAPMAYI BİLMİYORSAN VİDEOYU DİKKATLİ İZLE
    '3': `<a:uc:779317648701521962>`, // YAPMAYI BİLMİYORSAN VİDEOYU DİKKATLİ İZLE
    '4': `<a:drt:779317649107714048>`, // YAPMAYI BİLMİYORSAN VİDEOYU DİKKATLİ İZLE                        
    '5': `<a:bes:779317648474636288>`, // YAPMAYI BİLMİYORSAN VİDEOYU DİKKATLİ İZLE
    '6': `<a:alt:779317648646209577>`, // YAPMAYI BİLMİYORSAN VİDEOYU DİKKATLİ İZLE
    '7': `<a:yedi:779317648273702922>`, // YAPMAYI BİLMİYORSAN VİDEOYU DİKKATLİ İZLE
    '8': `<a:sekz:779317649095655444>`, // YAPMAYI BİLMİYORSAN VİDEOYU DİKKATLİ İZLE
    '9': `<a:dokz:779317648911106059>`}[d]; // YAPMAYI BİLMİYORSAN VİDEOYU DİKKATLİ İZLE
      })
    }
    const kanal = "779644651359043604"; // HOŞ GELDİN MESAJINI NEREYE ATACAKSA O KANALIN İDSİNİ GİRİN
    let user = client.users.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
    const embed = new Discord.RichEmbed()
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = ' **<a:carp:779057614087782400>**'
  if (kurulus > 1296000000) kontrol = ' **<a:tik:779057615199010826>**'
    moment.locale("tr");
    let stg = client.channels.get(kanal);
  stg.send("<a:kral:779671921717018664> ** Hoşgeldin! " + member + " Seninle "+ üyesayısı +" Kişiyiz.**  \n\n<a:ses:779317630502174731>  **Müsait olduğunda Teyit Odalarından Birine Geçip Kaydını Yaptırabilirsin..**  \n\n<a:kalp111:779319993548537898> **<@&779644580253007882> seninle ilgilenicektir.**\n\n<a:klbk:779317646478540801>  **Hesabını" + moment(member.user.createdAt).format(" YYYY DD MMMM dddd (hh:mm:ss) ") +  " Tarihinde Oluşturmuşsun.** \n\n<a:yldz4:779671890104156210>  **Hesap Durumu:** "  + kontrol + "   \n\n<a:yldz3:779671890641158187>  **Tagımızı alarak `✭` bize destek olabilirsin.** \n\n"
    );
  });
// GİRİŞ SON
//splashen