const WizardScene = require("telegraf/scenes/wizard");
const { command } = require("yargs");
const { User, Settings } = require("../database")


path = require("path"),
    { Telegram, Markup } = require("telegraf"),
    bot = new Telegram(process.env.BOT_TOKEN);



const scene = new WizardScene('bc1mon',

    async (ctx) => {
        try {

            ctx.reply(`⚜️Сигнал Bitcore - 1 мес.

⚜️ Подписка на криптосигналы Bitcore на 1 месяц   

⚜️ Цена: 100 $`,
                {
                    reply_markup: Markup.inlineKeyboard([
                        [Markup.callbackButton('✅ Перейти к оплате', "oplata")],
                        [Markup.callbackButton('❌ Отмена', 'menu1')]
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
