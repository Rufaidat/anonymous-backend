const messagesRouter = require("express").Router();

const Message = require("../models/message");
const User = require("../models/user");

messagesRouter.get("/", async (request, response) => {
  const messages = await Message.find({}).populate("user", { messages: 0 });
  response.json(messages);
});

messagesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  console.log(body);
  const username = {
    username: body.username,
  };
  const user = await User.findOne(username);
  console.log(user);
  const message = new Message({
    message: body.message,
    user: user._id,
  });

  const savedMessage = await message.save();
  user.messages = user.messages.concat(savedMessage);
  await user.save();

  response.json(savedMessage);
});

module.exports = messagesRouter;
