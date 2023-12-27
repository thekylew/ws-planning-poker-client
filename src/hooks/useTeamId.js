const { REACT_APP_SESSION_ID } = process.env;

function capitalizeFirstLetter(string) {
  if (string === "koolaid") string = "kool-aid";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//A wrapper around the complexity involved in each session having a unique session id.
const useTeamId = () => {
  let teamId = REACT_APP_SESSION_ID;

  const hostName = window.location.hostname;
  const hostNameElements = hostName.split(".");

  if (hostNameElements.length === 3) teamId = hostNameElements[0];

  return { teamId, cleanTeamId: capitalizeFirstLetter(teamId) };
};

export default useTeamId;
