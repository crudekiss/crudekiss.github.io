function checkURLAuth() {
  // Add a cache-busting query to the URL
  const url = `https://crudekiss.github.io/rotot/auth.json?cb=${Date.now()}`;

  fetch(url, { cache: "no-store" })
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
        State.variables.urlStatus = "blacklisted";
        window.location.href = 'about:blank';
      } else if (!isAuthorized) {
        State.variables.urlStatus = "unauthorized";
        // Optional redirect:
        // window.location.href = 'about:blank';
      } else {
        State.variables.urlStatus = "authorized";
      }

      State.variables.url = currentUrl;
    })
    .catch(error => {
      State.variables.urlStatus = "error";
      State.variables.url = window.location.href;
    });
}

// Run once immediately
checkURLAuth();

// Repeat every 120 seconds (2 minutes)
setInterval(checkURLAuth, 120000);
