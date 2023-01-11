const { Op } = require("sequelize");
const { Markup } = require("telegraf");
const { User } = require("../../database");


module.exports = async (ctx, id) => {
  try {
    if(ctx.state.user.pokupka != 5 ) {
      ctx.reply("❌Нет доступа")
    } else {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            id,
          },
          {
            username: id,
          },
        ],
      },
    
    });

    if (!user)
      return ctx
        .replyOrEdit("❌ Пользователь не найден", {
          
        })
        .catch((err) => err);


    return ctx
      .replyOrEdit(
        `👤 Пользователь <b><a href="tg://user?id=${user.id}">${
          user.username
        }</a></b>
${user.banned ? "<i><b>🚫 Этот пользователь заблокирован</b></i>\n" : ""}
🆔 ID: <code>${user.id}</code>
🚦 Статус: <b>${
              user.pokupka == 4
             ? "Есть подписка на 1 год"
           :user.pokupka == 3
          ? "Есть подписка на 6 месяцев"
          :user.pokupka == 2
          ? "Есть подписка на 3 месяцa"

          :user.pokupka == 1
            ? "Есть подписка на месяц"
            : user.pokupka == 5
            ? "Администратор"
            : user.pokupka == 0
            ? "Нет подписки"
            : "Нет подписки"
        }</b>

`,
        {
          parse_mode: "HTML",
          reply_markup: Markup.inlineKeyboard([
            [
              Markup.callbackButton(
                user.banned ? "✅ Разблокировать" : "🚫 Заблокировать",
                `admin_user_${user.id}_${user.banned ? "un" : ""}ban`
              ),
            ],
            [
              Markup.callbackButton(
                "🚦 Изменить статус",
                `admin_user_${user.id}_edit_status`
              ),
            ],
            
           
          ]),
        }
      )
      .catch((err) => err);
    }
  } catch (err) {
    console.log(err)

    return ctx.reply("❌ Ошибка").catch((err) => err);
  }
};
