require("dotenv").config()
const { default: axios } = require("axios");
const session = require("telegraf/session");
const log = require("./helpers/log")


const { User, Settings } = require("./database")
const settingsMiddleware = require("./middlewares/settings");
const menu = require("./commands/menu")

const auth = require("./middlewares/auth");
const { Sequelize, sequelize } = require("./models");
const { Op } = require("sequelize");



const cron = require('node-cron');

const stage = require("./scenes");
const { Composer, Telegraf } = require("telegraf"),
  bot = new Telegraf(process.env.BOT_TOKEN);

const { Markup } = require("telegraf");
const { signedCookie } = require("cookie-parser");

const user = require("./commands/admin/user");

const moment = require('moment');
const { all } = require("bluebird");

const date_now = moment()

const adminBot = new Composer(
  async (ctx, next) => ctx.state.user.pokupka == 5 && next()
);

bot.use(session());
bot.use(auth);
bot.use(settingsMiddleware);
bot.use(stage.middleware());

//_______________________________________________________________________________________________________

bot.action("pokupka", (ctx) => ctx.scene.enter("pokupka"));
bot.action("info", (ctx) => ctx.scene.enter("info"));
bot.action("bc1mon", (ctx) => ctx.scene.enter("bc1mon"));
bot.action("bc3mon", (ctx) => ctx.scene.enter("bc3mon"));
bot.action("bc6mon", (ctx) => ctx.scene.enter("bc6mon"));
bot.action("bc1year", (ctx) => ctx.scene.enter("bc1year"));
bot.action("kabinet", (ctx) => ctx.scene.enter("kabinet"));
bot.action("oplata", (ctx) => ctx.scene.enter("oplata"));
bot.action("signal", (ctx) => ctx.scene.enter("signal"));
bot.action("menu1", (ctx) => ctx.scene.enter("menu1"));


bot.use(async (ctx, next) => {
  let user = await User.findOne({
    where: {
      id: ctx.from.id
    }
  })
  if (user?.banned == 1) {
    return;
  } else {

    await next()
  }
})


// _______________________________________________________________________________________________________ADMIN COMMANDS


function userone() {
  User.findAll({ where: { pokupka: 1 }, raw: true })
    .then(users => {
      for (let i = 0; i < users.length; i++) {
        if (moment().format('l') == users[i]["timeend"]) {
          User.update({
            pokupka: 0
          }, { where: { username: users[i]["username"] } })
          bot.telegram.sendMessage(users[i]["id"], `<b>❌ Ваша подписка закончилась</b>`, {
            parse_mode: 'HTML'
          })
          bot.telegram.sendMessage(users[i]["id"], `Желаете продлить подписку?`, {
            reply_markup: Markup.inlineKeyboard([
              [Markup.callbackButton("💰Купить подписку", "pokupka")]
            ])
          })
          bot.telegram
            .kickChatMember(-1001861738437, users[i]["id"])
        }
      }
    }).catch(err => console.log(err));
}



function userthree() {
  User.findAll({ where: { pokupka: 2 }, raw: true })
    .then(users => {
      for (let i = 0; i < users.length; i++) {
        if (moment().format('l') == users[i]["timeend"]) {
          User.update({
            pokupka: 0
          }, { where: { username: users[i]["username"] } })
          bot.telegram.sendMessage(users[i]["id"], `<b>❌ Ваша подписка закончилась</b>`, {
            parse_mode: 'HTML'
          })
          bot.telegram.sendMessage(users[i]["id"], `Желаете продлить подписку?`, {
            reply_markup: Markup.inlineKeyboard([
              [Markup.callbackButton("💰Купить подписку", "pokupka")]
            ])
          })
          bot.telegram
            .kickChatMember(-1001861738437, users[i]["id"])
        }
      }
    }).catch(err => console.log(err));
}

function usersix() {
  User.findAll({ where: { pokupka: 3 }, raw: true })
    .then(users => {
      for (let i = 0; i < users.length; i++) {

        if (moment().format('l') == users[i]["timeend"]) {
          User.update({
            pokupka: 0
          }, { where: { username: users[i]["username"] } })

          bot.telegram.sendMessage(users[i]["id"], `<b>❌ Ваша подписка закончилась</b>`, {
            parse_mode: 'HTML'
          })
          bot.telegram.sendMessage(users[i]["id"], `Желаете продлить подписку?`, {
            reply_markup: Markup.inlineKeyboard([
              [Markup.callbackButton("💰Купить подписку", "pokupka")]
            ])
          })
          
          bot.telegram
            .kickChatMember(-1001861738437, users[i]["id"])
        }
      }
    }).catch(err => console.log(err));
}

function useryear() {
  User.findAll({ where: { pokupka: 4 }, raw: true })
    .then(users => {
      for (let i = 0; i < users.length; i++) {
        if (moment().format('l') == users[i]["timeend"]) {
          User.update({
            pokupka: 0
          }, { where: { username: users[i]["username"] } })

          bot.telegram.sendMessage(users[i]["id"], `<b>❌ Ваша подписка закончилась</b>`, {
            parse_mode: 'HTML'
          })
          bot.telegram.sendMessage(users[i]["id"], `Желаете продлить подписку?`, {
        reply_markup: Markup.inlineKeyboard([
          [Markup.callbackButton("💰Купить подписку", "pokupka")]
        ])
      })
          bot.telegram
            .kickChatMember(-1001861738437, users[i]["id"])
        }
      }
    }).catch(err => console.log(err));
}

const cron4ik = cron.schedule('* * * * *', function () {
  userone();
  userthree();
  usersix();
  useryear();
  //console.log(moment().calendar());
  //console.log(moment().format('l'));
  //console.log(moment().add(30,'days').format('l'));
});

bot.on(cron4ik);
//__________________________________________________________________________________________________chat


bot.on("new_chat_members", async (ctx) => {
  try {
    var users = ctx.message.new_chat_members;
    const settings = await Settings.findByPk(1);
    if (ctx.chat.id !== settings.allGroupId) return;
    users.map(async (v) => {
      const user = await User.findByPk(v.id, {
      });
      if (
        !user ||
        user?.banned ||
        user?.pokupka == 0
      )
        return ctx.telegram
          .kickChatMember(ctx.chat.id, v.id)
          .catch((err) => err);
    });
  } catch (err) { }
});



//___________________________________________________________________________________________________





bot.hears(/^\/user @?([A-Za-z0-9_]+)$/, (ctx) => user(ctx, ctx.match[1]));

bot.action(/^admin_user_(\d+)_((un)?ban)$/, async (ctx) => {
  try {
    if (ctx.match[2] == "ban" && ctx.from.id == ctx.match[1])
      return ctx
        .answerCbQuery("❌ Вы не можете заблокировать сами себя", true)
        .catch((err) => err);
    const user_ = await User.findByPk(ctx.match[1]);

    await user_.update({
      banned: ctx.match[2] == "ban",
    });

    if (ctx.match[2] == "ban")
      ctx.telegram
        .sendMessage(ctx.match[1], "Вы были заблокированы администратором😓", {
          parse_mode: "HTML",
        })
        .catch((err) => err);

    log(
      ctx,
      `${user_.banned ? "заблокировал" : "разблокировал"
      } пользователя <b><a href="tg://user?id=${user_.id}">${user_.username
      }</a></b>`
    );
    return user(ctx, ctx.match[1]);
  } catch (err) {
    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
});

bot.action(
  /^admin_user_(\d+)_set_status_(onemonth)$/,
  async (ctx) => {
    try {
      const user_ = await User.findByPk(ctx.match[1]);
      const vidacha = await user_.update({
        pokupka: {
          onemonth: 1,
        }[ctx.match[2]],
      });



      user_.update({ time: moment().format('l') })
      user_.update({ timeend: moment().add(30, 'days').format('l') })
      
      ctx.telegram.unbanChatMember(-1001861738437,user_.id)

      ctx.telegram.sendMessage(user_.id, `✅Подписка успешно активирована!`, {
        reply_markup: Markup.inlineKeyboard([
          [Markup.urlButton("👣Перейти в канал", "https://t.me/+z0Yt9Ibb9cY1NDgy")]
        ])
      })
      log(
        ctx,
        `Выдал подписку пользователю <b><a href="tg://user?id=${user_.id}">${user_.username
        }</a></b>`
      );
      await ctx
        .answerCbQuery("✅ Вы успешно изменили статус пользователя!", true)
        .catch((err) => err);
      return user(ctx, ctx.match[1]);
    } catch (err) {
      console.log(err)

      return ctx.reply("❌ Ошибка").catch((err) => err);
    }
  }
);
bot.action(
  /^admin_user_(\d+)_set_status_(threemonth)$/,
  async (ctx) => {
    try {
      const user_ = await User.findByPk(ctx.match[1]);
      const vidacha = await user_.update({
        pokupka: {
          threemonth: 2,
        }[ctx.match[2]],
      });



      user_.update({ time: moment().format('l') })
      user_.update({ timeend: moment().add(90, 'days').format('l') })

      ctx.telegram.unbanChatMember(-1001861738437,user_.id)

      ctx.telegram.sendMessage(user_.id, `✅Подписка успешно активирована!`, {
        reply_markup: Markup.inlineKeyboard([
          [Markup.urlButton("👣Перейти в канал", "https://t.me/+z0Yt9Ibb9cY1NDgy")]
        ])
      })
      log(
        ctx,
        `Выдал подписку пользователю <b><a href="tg://user?id=${user_.id}">${user_.username
        }</a></b>`
      );
      await ctx
        .answerCbQuery("✅ Вы успешно изменили статус пользователя!", true)
        .catch((err) => err);
      return user(ctx, ctx.match[1]);
    } catch (err) {
      console.log(err)

      return ctx.reply("❌ Ошибка").catch((err) => err);
    }
  }
);
bot.action(
  /^admin_user_(\d+)_set_status_(sixmonth)$/,
  async (ctx) => {
    try {
      const user_ = await User.findByPk(ctx.match[1]);
      const vidacha = await user_.update({
        pokupka: {

          sixmonth: 3,

        }[ctx.match[2]],
      });



      user_.update({ time: moment().format('l') })
      user_.update({ timeend: moment().add(180, 'days').format('l') })
      ctx.telegram.unbanChatMember(-1001861738437,user_.id)

      ctx.telegram.sendMessage(user_.id, `✅Подписка успешно активирована!`, {
        reply_markup: Markup.inlineKeyboard([
          [Markup.urlButton("👣Перейти в канал", "https://t.me/+z0Yt9Ibb9cY1NDgy")]
        ])
      })
      log(
        ctx,
        `Выдал подписку пользователю <b><a href="tg://user?id=${user_.id}">${user_.username
        }</a></b>`
      );
      await ctx
        .answerCbQuery("✅ Вы успешно изменили статус пользователя!", true)
        .catch((err) => err);
      return user(ctx, ctx.match[1]);
    } catch (err) {
      console.log(err)

      return ctx.reply("❌ Ошибка").catch((err) => err);
    }
  }
);
bot.action(
  /^admin_user_(\d+)_set_status_(oneyear)$/,
  async (ctx) => {
    try {
      const user_ = await User.findByPk(ctx.match[1]);
      const vidacha = await user_.update({
        pokupka: {
          oneyear: 4,
        }[ctx.match[2]],
      });



      user_.update({ time: moment().format('l') })
      user_.update({ timeend: moment().add(365, 'days').format('l') })
      ctx.telegram.unbanChatMember(-1001861738437,user_.id)
      

      ctx.telegram.sendMessage(user_.id, `✅Подписка успешно активирована!`, {
        reply_markup: Markup.inlineKeyboard([
          [Markup.urlButton("👣Перейти в канал", "https://t.me/+z0Yt9Ibb9cY1NDgy")]
        ])
      })

      log(
        ctx,
        `Выдал подписку пользователю <b><a href="tg://user?id=${user_.id}">${user_.username
        }</a></b>`
      );
      await ctx
        .answerCbQuery("✅ Вы успешно изменили статус пользователя!", true)
        .catch((err) => err);
      return user(ctx, ctx.match[1]);
    } catch (err) {
      console.log(err)

      return ctx.reply("❌ Ошибка").catch((err) => err);
    }
  }
);



bot.action(/^admin_user_(\d+)_edit_status$/, (ctx) => {
  if (ctx.from.id == ctx.match[1])
    return ctx
      .answerCbQuery("❌ Вы не можете изменить свой статус", true)
      .catch((err) => err);
  ctx
    .replyOrEdit(`⏱Выберите статус`, {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton(
            "⏳Подписка на 1 месяц",
            `admin_user_${ctx.match[1]}_set_status_onemonth`
          ),
        ],
        [
          Markup.callbackButton(
            "⏳Подписка на 3 месяца",
            `admin_user_${ctx.match[1]}_set_status_threemonth`
          ),
        ],
        [
          Markup.callbackButton(
            "⏳Подписка на 6 месяцев",
            `admin_user_${ctx.match[1]}_set_status_sixmonth`
          ),
        ],
        [
          Markup.callbackButton(
            "⏳Подписка на 1 год",
            `admin_user_${ctx.match[1]}_set_status_oneyear`
          ),
        ],


      ]),
    })
    .catch((err) => err);
});





// _______________________________________________________________________________________________________ADMIN COMMANDS
bot.command("menu", (ctx) => menu(ctx));
bot.start((ctx) => ctx.chat.id == ctx.from.id && menu(ctx))
//_______________________________________________________________________________________________________
bot.launch().then(res => {
  console.log('Бот запущен');

})
  .catch(err => console.log(err))