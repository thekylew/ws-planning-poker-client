const { REACT_APP_SESSION_ID } = process.env;

function capitalizeFirstLetter(string) {
  if (string === "koolaid") string = "kool-aid";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const useSessionId = () => {
  let sessionId = REACT_APP_SESSION_ID;

  const hostName = window.location.hostname;
  const hostNameElements = hostName.split(".");

  if (hostNameElements.length === 3) sessionId = hostNameElements[0];

  return { sessionId, cleanSessionId: capitalizeFirstLetter(sessionId) };
};

export default useSessionId;
