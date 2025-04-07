fetch('https://crudekiss.github.io/rotot/auth.json')
  .then(response => {
    // Check if the response is successful (status code 200)
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    // Extract authorized and blacklisted prefixes from the fetched data
    const authorizedPrefixes = data.authorized;
    const blacklistedPrefixes = data.blacklisted;
    const currentUrl = window.location.href; // Get the current page URL

    // Check if the current URL starts with any blacklisted prefix
    const isBlacklisted = blacklistedPrefixes.some(prefix => currentUrl.startsWith(prefix));

    // Check if the current URL starts with any authorized prefix
    const isAuthorized = authorizedPrefixes.some(prefix => currentUrl.startsWith(prefix));

    if (isBlacklisted) {
      // If the URL is blacklisted, redirect to a blank page to block access
      window.location.href = 'about:blank';
    } else if (!isAuthorized) {
      // If the URL is not authorized, potentially redirect to a fallback URL (currently commented out)
      // window.location.href = 'about:blank'; // Example: Uncomment to enforce redirection
    }
    // If the URL is authorized, do nothing (implicitly allow access)
  })
  .catch(error => {
    // Handle any errors silently without logging or showing alerts
    // (e.g., if the JSON file cannot be fetched or parsed)
  });
