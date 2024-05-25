import { createChatBotMessage } from "react-chatbot-kit";

const botName = "PlateLinker chatbot";
const config = {

  botName: botName,
  initialMessages: [createChatBotMessage(`Hi I'm ${botName}. I’m here to help you to find your matching interest nearby.`)
  ],
  
}

export default config   