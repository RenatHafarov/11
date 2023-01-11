const WizardScene = require("telegraf/scenes/wizard");
path = require("path"),
    { Telegram, Markup } = require("telegraf"),
    bot = new Telegram(process.env.BOT_TOKEN);


const scene = new WizardScene('menu1',
    async (ctx) => {
        try {
            if(ctx.state.user.pokupka == 5)(
          ctx.reply(`🤝Добро пожаловать, ${ctx.from.first_name}, тебя приветствует BITCORE SIGNAL BOT🤖
      
По кнопкам ниже ты можешь управлять своим личным кабинетом, приобрести подписку, и узнать больше о нашем ресурсе⬇️`, {
            reply_markup: Markup.inlineKeyboard([
           [Markup.callbackButton('⚙️ Информация о продукте', "info")],
           [Markup.callbackButton('💰 Приобрести подписку', "pokupka")],
           [Markup.callbackButton('👨‍💻 Личный кабинет', "kabinet")],
           [Markup.callbackButton('💼 Дать сигнал', "signal")],
           [Markup.urlButton("🎩 Поддержка","https://t.me/BitCoreSupport_bot")],
           [Markup.urlButton("🕸 Наш Web-сайт","https://bitcore.network/")]
            ])
          }))
         else(
            ctx.reply(`🤝Добро пожаловать, ${ctx.from.first_name}, тебя приветствует BITCORE SIGNAL BOT🤖
      
По кнопкам ниже ты можешь управлять своим личным кабинетом, приобрести подписку, и узнать больше о нашем ресурсе⬇️`, {
              reply_markup: Markup.inlineKeyboard([
             [Markup.callbackButton('⚙️ Информация о продукте', "info")],
             [Markup.callbackButton('💰 Приобрести подписку', "pokupka")],
             [Markup.callbackButton('👨‍💻 Личный кабинет', "kabinet")],
             [Markup.urlButton("🎩 Поддержка","https://t.me/BitCoreSupport_bot")],
             [Markup.urlButton("🕸 Наш Web-сайт","https://bitcore.network/")]
              ])
            }))
          return ctx.scene.leave()
        .catch((err) => err);
      } catch (err) {
        return ctx.reply("❌ Ошибка").catch((err) => err);
      }
      
    },


)
module.exports = scene;
