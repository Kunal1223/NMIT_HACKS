class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCase = message.toLowerCase();

    if (lowerCase.includes("hello") || lowerCase.includes("hi")) {
      this.actionProvider.hellohandler();
    } 
    else if (lowerCase.includes("platform works") || lowerCase.includes("tutorial") || lowerCase.includes("services")) {
      this.actionProvider.platformHandler();
    } 
    else if (lowerCase.includes("active area") ||  lowerCase.includes("present")) {
      this.actionProvider.locateHandler();
    } 
    else if (lowerCase.includes("requirements") || lowerCase.includes("registration")) {
      this.actionProvider.ngoHandler();
    } 
    else if (lowerCase.includes("menu") || lowerCase.includes("my choice") || lowerCase.includes("choice of food")) {
      this.actionProvider.menuyesHandler();
    } 
    else if (lowerCase.includes("thanks") || lowerCase.includes("thank you")) {
      this.actionProvider.thankHandler();
    } 
    else if (lowerCase.includes("accept") || lowerCase.includes("picked")) {
      this.actionProvider.acceptHandler();
    } 
    else if (lowerCase.includes("multiple") || lowerCase.includes("more than two")) {
      this.actionProvider.multipleHandler();
    } 
    else if (lowerCase.trim() === "") {
      this.actionProvider.spaceHandler();
    } 
    else {
      this.actionProvider.errorHandler();
    }
  }
}

export default MessageParser;
