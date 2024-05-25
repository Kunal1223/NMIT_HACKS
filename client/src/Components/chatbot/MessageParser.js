class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
   
    parse(message) {

      const lowerCase = message.toLowerCase();

      if(lowerCase.includes("hello") ||  lowerCase.includes("hi") ){
        this.actionProvider.hellohandler();
      }

      else if(lowerCase.includes("kunal") || lowerCase.includes("kishor")){
        this.actionProvider.kunalHandler();
      }

      else if(lowerCase.includes("bengaluru")){
        this.actionProvider.locateHandler();
      }

      else if(lowerCase.includes("")){
        this.actionProvider.spaceHandler();
      }

      else if(lowerCase.includes("cricket")){
        this.actionProvider.hobbyHandler();
      }

      else if(lowerCase.includes("yes")){
        this.actionProvider.yesHandler();
      }

      else if(lowerCase.includes("thank")){
        this.actionProvider.thankHandler();
      }

      else{
        this.actionProvider.errorHandler();
      }
    }
  }
  
  export default MessageParser;