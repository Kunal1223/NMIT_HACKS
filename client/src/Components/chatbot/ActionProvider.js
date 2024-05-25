class ActionProvider {
    constructor(
      createChatBotMessage,
      setStateFunc,
      createClientMessage,
      stateRef,
      createCustomMessage,
      ...rest
    ) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
      this.stateRef = stateRef;
      this.createCustomMessage = createCustomMessage;
    }
  
    // coustamize actionProvider
    hellohandler = () =>{
      const message = this.createChatBotMessage("Hi, What's your good Name?");
      this.setChatbotMessage(message);
    }
  
    kunalHandler =() =>{
      const message = this.createChatBotMessage("Welcome kunal , Nice to meet you. Where are you locate");
      this.setChatbotMessage(message);
    }
  
    locateHandler =() =>{
      const message = this.createChatBotMessage("Great, Can you tell your hobby");
      this.setChatbotMessage(message);
    }
  
    hobbyHandler = () => {
      const message = this.createChatBotMessage("That's awesome! Some of your neighbour likes cricket. Do you want to connect with then.");
      this.setChatbotMessage(message);
    }
    
    yesHandler = () =>{
      const message = this.createChatBotMessage("Great! We've added you to the cricket group.");
      this.setChatbotMessage(message);
    }
  
    thankHandler =() =>{
      const message = this.createChatBotMessage("Your welcome")
      this.setChatbotMessage(message);
    }
  
    spaceHandler = () =>{
      const message = this.createChatBotMessage("Please Enter the proper text");
      this.setChatbotMessage(message);
    }
  
    errorHandler = () =>{
      const message = this.createChatBotMessage("Sorry, I Don't have any data about this please check once");
      this.setChatbotMessage(message);
    }
  
  
    setChatbotMessage = (message) => {
      this.setState(state => ({ ...state, messages: [...state.messages, message] }))
    }
  }
  export default ActionProvider;