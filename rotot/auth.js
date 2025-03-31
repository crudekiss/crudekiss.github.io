fetch('https://crudekiss.github.io/rotot/auth.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    const authorizedPrefixes = data.authorized;
    const blacklistedPrefixes = data.blacklisted;
    const currentUrl = window.location.href;

    const isBlacklisted = blacklistedPrefixes.some(prefix => currentUrl.startsWith(prefix));
    const isAuthorized = authorizedPrefixes.some(prefix => currentUrl.startsWith(prefix));

    if (isBlacklisted) {
      State.variables.auth = "blacklisted";
    } else if (!isAuthorized) {
      State.variables.auth = "unauthorized";
    } else {
      State.variables.auth = "authorized";
    }
  })
  .catch(error => {
    State.variables.auth = "error";
  });
