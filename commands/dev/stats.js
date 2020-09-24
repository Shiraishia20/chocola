const m = require('moment-duration-format'),
      os = require('os'),
      cpuStat = require('cpu-stat'),
      ms = require('ms'),
      moment = require('moment')
const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
  cpuStat.usagePercent(function (error, percent, seconds) {
      if (error) {
        return console.error(error)
      }
      
      const cores = os.cpus().length // Counting how many cores your hosting has.
      const cpuModel = os.cpus()[0].model // Your hosting CPU model.
      const usage = formatBytes(process.memoryUsage().heapUsed) // Your memory usage.
      const Node = process.version // Your node version.
      const CPU = percent.toFixed(2) // Your CPU usage.
      
      const embed = new MessageEmbed()
      embed.setColor("#ff99dd")
      embed.addField('Physical Statistics:', `CPU: ${cores} - ${cpuModel} \nUsage: ${usage} \nNode: ${Node} \nCPU Usage: ${CPU}% \nUptime: **${parseDur(client.uptime)}**`)
      message.channel.send(embed)
    })
  }


exports.help = {
  name: "stats",
  description: "Untuk Mengetahui Status Bot",
  usage: "np!stats",
  example: "np!stats"
}

exports.conf = {
  aliases: [],
  cooldown: 5
}

function formatBytes (a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
      d = b || 2,
      e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
  
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
} // Create MB, KB, TB or something in the back of your memory counters.

function parseDur(ms) {
  let seconds = ms / 1000,
      days = parseInt(seconds / 86400);
  seconds = seconds % 86400
  
  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600
  
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60)
  
  if (days) {
    return `${days} day, ${hours} hours, ${minutes} minutes`
  } else if (hours) {
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
  } else if (minutes) {
    return `${minutes} minutes, ${seconds} seconds`
  }
  
  return `${seconds} second(s)`
} // Uptime bot.
