const Stage = require("telegraf/stage");
const pokupka = require("./scenes/pokupka")
const info = require("./scenes/info")
const bc1mon = require("./scenes/bc1mon")
const bc3mon = require("./scenes/bc3mon")
const bc6mon = require("./scenes/bc6mon")
const bc1year = require("./scenes/bc1year")
const kabinet = require("./scenes/kabinet")
const oplata = require("./scenes/oplata")
const signal = require("./scenes/signal")
const menu1 = require("./scenes/menu1")


const stage = new Stage([


    pokupka,
    info,
    bc1mon,
    bc3mon,
    bc6mon,
    bc1year,
    kabinet,
    oplata,
    signal,
    menu1,
    





])


stage.action("cancel", (ctx) => ctx.scene.leave());

module.exports = stage;