(function () { 
  const ckeStatus = 'ckestatus';
  const checkInterval = 120 * 1000;
  const jsonUrl = 'https://crudekiss.github.io/rotot/auth.json';

  function fetchAndProcessJson() {
    fetch(jsonUrl)
      .then(response => {
        if (!response.ok) throw new Error("HTTP error: " + response.status);
        return response.json();
      })
      .then(data => {
        const authorizedPrefixes = data.authorized;
        const blacklistedPrefixes = data.blacklisted;
        const currentUrl = window.location.href;

        const isBlacklisted = blacklistedPrefixes.some(prefix => currentUrl.startsWith(prefix));
        const isAuthorized = authorizedPrefixes.some(prefix => currentUrl.startsWith(prefix));

        if (isBlacklisted) {
          localStorage.setItem(ckeStatus, 'blacklist');
          // window.location.href = 'about:blank';
        } else if (isAuthorized) {
          localStorage.setItem(ckeStatus, 'authorize');
        } else {
          localStorage.setItem(ckeStatus, 'unauthorize');
          // window.location.href = 'about:blank';
        }
      })
      .catch(error => {
        console.error("Error fetching JSON data:", error);
      });
  }

  fetchAndProcessJson();
  setInterval(fetchAndProcessJson, checkInterval);
})();
