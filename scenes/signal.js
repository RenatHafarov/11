const WizardScene = require("telegraf/scenes/wizard");
const { User } = require("../database")


path = require("path"),
    { Telegram, Markup } = require("telegraf"),
    bot = new Telegram(process.env.BOT_TOKEN);


const scene = new WizardScene('signal',
    async (ctx) => {
        try {
            ctx.reply(`📣Напишите сигнал`, {
                reply_markup: Markup.inlineKeyboard([
                    [Markup.callbackButton('◀️ Отмена', 'menu')],
                ])
            })
            return ctx.wizard.next()

        } catch (err) {
            console.log(err)
            await ctx.reply("❌ Неизвестная ошибка, попробуй еще раз.").catch((err) => err);
            return ctx.scene.leave()
        }
    },
    async (ctx) => {
        try {
            if (ctx.callbackQuery?.data == "menu") {
                ctx.scene.enter("menu1");
                return ctx.scene.leave()
            }
            bot.sendMessage(-1001861738437, ctx.message.text)
            return ctx.scene.leave()
        } catch (err) {
            console.log(err)
            await ctx.reply("❌ Неизвестная ошибка, попробуй еще раз.").catch((err) => err);
            return ctx.scene.leave()
        }
    },

)
module.exports = scene;
