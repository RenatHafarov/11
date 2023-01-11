const WizardScene = require("telegraf/scenes/wizard");
const { User } = require("../database")


path = require("path"),
    { Telegram, Markup } = require("telegraf"),
    bot = new Telegram(process.env.BOT_TOKEN);


const scene = new WizardScene('pokupka',
    async (ctx) => {
        try {
            ctx.reply(`👑Покупка подписки
Выберите тариф который хотите приобрести:`, {
                reply_markup: Markup.inlineKeyboard([
                    [Markup.callbackButton('BitCoreSignal - 1 месяц', "bc1mon")],
                    [Markup.callbackButton('BitCoreSignal - 3 месяца', "bc3mon")],
                    [Markup.callbackButton('BitCoreSignal - 6 месяцов', "bc6mon")],
                    [Markup.callbackButton('BitCoreSignal - 1 год', "bc1year")],
                    [Markup.callbackButton('◀️ Отмена', 'menu1')],
                ])
            })
            return ctx.scene.leave()

        } catch (err) {
            console.log(err)
            await ctx.reply("❌ Неизвестная ошибка, попробуй еще раз.").catch((err) => err);
            return ctx.scene.leave()
        }
    },

    

)
module.exports = scene;
