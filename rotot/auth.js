(function () {
  const ckeStatus = 'ckestatus';  // Key name used for storing URL status in localStorage
  const checkInterval = 120 * 1000; // Time interval for periodic checks (in milliseconds)
  const jsonUrl = 'https://crudekiss.github.io/rotot/auth.json'; // URL to fetch authorized/blacklisted URL prefixes

  /**
   * Fetches authorization data from a remote JSON file and updates the localStorage
   * based on whether the current URL is authorized, unauthorized, or blacklisted.
   */
  function fetchAndProcessJson() {
    fetch(jsonUrl)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        const authorizedPrefixes = data.authorized;
        const blacklistedPrefixes = data.blacklisted;
        const currentUrl = window.location.href; // Get the full current URL

        // Check if the current URL matches any blacklisted or authorized prefix
        const isBlacklisted = blacklistedPrefixes.some(prefix => currentUrl.startsWith(prefix));
        const isAuthorized = authorizedPrefixes.some(prefix => currentUrl.startsWith(prefix));

        // Update status in localStorage and redirect if needed
        if (isBlacklisted) {
          localStorage.setItem(ckeStatus, 'blacklist');
          window.location.href = 'about:blank';  // Block access by redirecting to a blank page
        } else if (isAuthorized) {
          localStorage.setItem(ckeStatus, 'authorize');
        } else {
          localStorage.setItem(ckeStatus, 'unauthorize');
          // Optionally block access for unauthorized URLs:
          // window.location.href = 'about:blank';
        }
      })
      .catch(error => {
        // Handle fetch errors silently and log them for debugging
        console.error("Error fetching JSON data:", error);
      });
  }

  // Run the check immediately on script load
  fetchAndProcessJson();

  // Repeat the check every 2 minutes to ensure up-to-date validation
  setInterval(fetchAndProcessJson, checkInterval);
})();
