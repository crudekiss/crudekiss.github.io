(function () {
  const ckeStatus = 'ckestatus';  // Key to store the status in localStorage
  const checkInterval = 120 * 1000;    // 120 seconds in milliseconds
  const jsonUrl = 'https://crudekiss.github.io/rotot/auth.json'; // URL for the JSON data

  // Function to fetch and process the JSON data
  function fetchAndProcessJson() {
    fetch(jsonUrl)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        const authorizedPrefixes = data.authorized;
        const blacklistedPrefixes = data.blacklisted;
        const currentUrl = window.location.href; // Get the current page URL

        // Check if the current URL starts with any blacklisted or authorized prefix
        const isBlacklisted = blacklistedPrefixes.some(prefix => currentUrl.startsWith(prefix));
        const isAuthorized = authorizedPrefixes.some(prefix => currentUrl.startsWith(prefix));

        // Set the status based on URL checks and store it in localStorage
        if (isBlacklisted) {
          localStorage.setItem(ckeStatus, 'blacklist');
          window.location.href = 'about:blank';  // Redirect to a blank page if blacklisted
        } else if (isAuthorized) {
          localStorage.setItem(ckeStatus, 'authorize');
        } else {
          localStorage.setItem(ckeStatus, 'unauthorize');
          // Uncomment the next line if you want to redirect unauthorized URLs
          // window.location.href = 'about:blank';
        }
      })
      .catch(error => {
        // Handle any errors during the fetch process silently
        console.error("Error fetching JSON data:", error);
      });
  }

  // Run the fetchAndProcessJson function immediately when the script loads
  fetchAndProcessJson();

  // Set an interval to refresh the JSON data every 120 seconds (2 minutes)
  setInterval(fetchAndProcessJson, checkInterval);
})();
