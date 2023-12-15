let socket = null;
let listeners = {};

const WS_URL = process.env.REACT_APP_WEBSOCKET_URL;

const getWebSocket = () => {
  if (socket) return socket;

  socket = new WebSocket(WS_URL);

  socket.onclose = () => {
    window.location.reload();
  };

  socket.addListener = (commandName, listener) => {
    if (!listeners[commandName]) listeners[commandName] = [];

    listeners[commandName].push(listener);
  };

  const onMessage = (unparsedMessage) => {
    if (unparsedMessage) {
      const message = JSON.parse(unparsedMessage.data);
      const command = message.command ? message.command : "userlist";

      if (listeners[command])
        listeners[command].forEach((listener) => listener(message));
    }
  };

  socket.onmessage = onMessage;

  socket.sendMessage = (routeKey, message) => {
    if (socket) {
      socket.send(
        JSON.stringify({
          action: routeKey,
          data: JSON.stringify(message),
        })
      );
    } else {
      console.log("Websocket connection not found");
    }
  };

  return socket;
};

export default getWebSocket;
