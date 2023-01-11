module.exports = async function (
    ctx,
    action,
    extra = {
      disable_web_page_preview: true,
    }
  ) {
    return ctx.telegram
      .sendMessage(
        ctx.state.bot.loggingGroupId,
        `<b>Пользователь </b>@${ctx.from.username} (${ctx.from.id})  <code>${ctx.from.first_name}</code> : ${action}`, 
       
        {
          parse_mode: "HTML",
          ...extra,
        }
      )
      .catch((err) => err);
  };



  
  //const log = require("../helpers/log")
  // Прописать логи для бота - log(ctx,"нажал на кнопку")


  //my sql
  // ALTER TABLE users ADD COLUMN time VARCHAR(255) DEFAULT 0 AFTER pokupka - добавить колонку
  // ALTER TABLE users drop column time - удалить