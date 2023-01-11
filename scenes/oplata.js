const e = require("express");
const WizardScene = require("telegraf/scenes/wizard");
const { User } = require("../database")
const paylog = require("../helpers/paylog");

path = require("path"),
    { Telegram, Markup } = require("telegraf"),
    bot = new Telegram(process.env.BOT_TOKEN);


const scene = new WizardScene('oplata',
    async (ctx) => {
        try {
            ctx.reply(`🧩Выберите способ оплаты`, {
                reply_markup: Markup.inlineKeyboard([
                    [Markup.callbackButton('💵USDT (TRC20)', "usdt")],
                    [Markup.callbackButton('◀️ Отмена', "menu")]
                ])
            })
            return ctx.wizard.next();

        } catch (err) {
            console.log(err)
            await ctx.reply("❌ Неизвестная ошибка, попробуй еще раз.").catch((err) => err);

        }
    },
    async (ctx) => {
        try {
            if (ctx.callbackQuery?.data == "usdt") {
                await ctx.replyWithHTML(`💳Кошелек : <code><b>TCCExE5JDwhh2iRBo7EzokmmyT3XVFDfXd</b></code>

💰Оправьте указанную выше сумму на данный кошелек☝️, и нажмите кнопку подтвердить

<b>Сеть - TRC20</b>`, {
                    reply_markup: Markup.inlineKeyboard([
                        [Markup.callbackButton('✅Подтвердить', "accept")],
                        [Markup.callbackButton('◀️ Отмена', "menu")]
                    ])
                })
                return ctx.wizard.next();
            } 
            
            if (ctx.callbackQuery?.data == "menu") {
                ctx.scene.enter("menu1");
                return ctx.scene.leave()
            }
           
        } catch (err) {
            console.log(err)
            await ctx.reply("❌ Неизвестная ошибка, попробуй еще раз.").catch((err) => err);
        }
    },

    async (ctx) => {
        try {
            if (ctx.callbackQuery?.data == "accept") {
                await ctx.reply(`📝Напишите хеш транзакции`, {
                    reply_markup: Markup.inlineKeyboard([
                        [Markup.callbackButton('◀️ Отмена', "menu")]
                    ])
                })
                return ctx.wizard.next();
            }
            if (ctx.callbackQuery?.data == "menu") {
                ctx.scene.enter("menu1");
                return ctx.scene.leave()
            }
           
            
        } catch (err) {
            console.log(err)
            await ctx.reply("❌ Неизвестная ошибка, попробуй еще раз.").catch((err) => err);
        }
    },
    async (ctx) => {
        try {
            if (ctx.callbackQuery?.data == "menu") {
                
                ctx.scene.enter("menu1");
                return ctx.scene.leave()
            }
            if(ctx.message.text!=""){
                if(ctx.message.text == "/menu"){
                    ctx.scene.enter("menu1");
                    return ctx.scene.leave()
                }
                else{
                const user = await User.findOne({
                    where: {
                        id: ctx.from.id
                    }
                })
    
                paylog(ctx, `отправил хеш транзакнции: <code><b>${ctx.message.text}</b></code>`)
                ctx.reply(`⏳Ожидайте 5-10 минут`)
               }}
           
            return ctx.scene.leave()
        } catch (err) {
            console.log(err)
            await ctx.reply("❌ Неизвестная ошибка, попробуй еще раз.").catch((err) => err);
            return ctx.scene.leave()
        }
    },


)

module.exports = scene;


