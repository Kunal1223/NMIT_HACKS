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
      const message = this.createChatBotMessage("Hi! How may I help you ?");
      this.setChatbotMessage(message);
    }
  
    platformHandler =() =>{
      const message = this.createChatBotMessage("The platform works in 3 ways. Restaurants can put up meals for donations. NGOs will be notified about available donations to pick up. Individual users can place order for donations from their choice of restaurants.");
      this.setChatbotMessage(message);
    }
  
    locateHandler =() =>{
      const message = this.createChatBotMessage("We are currently active in Urban Bengaluru and New Delhi.");
      this.setChatbotMessage(message);
    }
  
    ngoHandler = () => {
      const message = this.createChatBotMessage("NGOs need to provide their accreditation and registration number along with the generic details.");
      this.setChatbotMessage(message);
    }
    
    menuyesHandler = () =>{
      const message = this.createChatBotMessage("Yes, you can donate your choice of food. As an individual user, you can pick from the menu of a variety of restaurants.");
      this.setChatbotMessage(message);
    }
  
    thankHandler =() =>{
      const message = this.createChatBotMessage("Your welcome")
      this.setChatbotMessage(message);
    }
  
    acceptHandler =() =>{
      const message = this.createChatBotMessage("Once an NGO has accepted your donation, you will receive a notification or email from us.")
      this.setChatbotMessage(message);
    }

    multipleHandler =() =>{
      const message = this.createChatBotMessage("Yes, as an NGO, you can accept multiple donations at a time from different restaurants but make sure to pick up all the meals to avoid getting a complaint rasied.")
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