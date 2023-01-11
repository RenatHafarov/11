const { next } = require("cheerio/lib/api/traversing");
const WizardScene = require("telegraf/scenes/wizard");
const { User } = require("../database");
const moment = require('moment');


path = require("path"),
    { Telegram, Markup } = require("telegraf"),
    bot = new Telegram(process.env.BOT_TOKEN);


const scene = new WizardScene('kabinet',
    async (ctx) => {

        try {
            const user = await User.findOne({
                where: {
                    id: ctx.from.id
                }
            })
            if (ctx.state.user.pokupka == 0) (
                ctx.reply(`${ctx.from.first_name}, на данный момент у вас нету подписки`, {
                    reply_markup: Markup.inlineKeyboard([

                        [Markup.callbackButton('💰 Приобрести подписку', "pokupka")],
                        [Markup.urlButton("🕸 Наш Web-сайт", "https://bitcore.network/")],
                        [Markup.callbackButton('🔴 Отмена', "menu1")]
                    ])
                }))
            if (ctx.state.user.pokupka>0 && ctx.state.user.pokupka<5 ) (
                

                ctx.replyWithHTML(`${ctx.from.first_name}, у вас есть подписка. 
Ваша подписка заканчивается :<b>${user.timeend}</b>
<b>📵При продлении подписки старая подписка становиться недействительна!</b>`, {
                    reply_markup: Markup.inlineKeyboard([
                        [Markup.callbackButton('💰 Приобрести подписку', "pokupka")],
                        [Markup.urlButton("🕸 Наш Web-сайт", "https://bitcore.network/")],
                        [Markup.callbackButton('🔴 Отмена', "menu1")]
                    ])
                }))
                if (ctx.state.user.pokupka == 5) (

                    ctx.replyWithHTML(`${ctx.from.first_name}, вы администратор. 
Ваша подписка заканчивается :<b>Никогда</b>
<b>📵При продлении подписки старая подписка становиться недействительна!</b>`, {
                                        reply_markup: Markup.inlineKeyboard([
                                            [Markup.callbackButton('💰 Приобрести подписку', "pokupka")],
                                            [Markup.urlButton("🕸 Наш Web-сайт", "https://bitcore.network/")],
                                            [Markup.callbackButton('🔴 Отмена', "menu1")]
                                        ])
                                    }))
    

            return ctx.scene.leave()
                .catch((err) => err);
        } catch (err) {
            console.log(err)
            return ctx.reply("❌ Ошибка").catch((err) => err);
            
        }
    },


)
module.exports = scene;
