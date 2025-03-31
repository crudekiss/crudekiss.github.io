fetch('https://crudekiss.github.io/rotot/auth.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    const authorizedPrefixes = data.authorized;
    const blacklistedPrefixes = data.blacklisted;
    const currentUrl = window.location.href; // Fixed: Properly defined currentUrl

    // Check if the URL starts with any blacklisted prefix
    const isBlacklisted = blacklistedPrefixes.some(prefix => currentUrl.startsWith(prefix));
    // Check if the URL starts with any authorized prefix
    const isAuthorized = authorizedPrefixes.some(prefix => currentUrl.startsWith(prefix));

    if (isBlacklisted) {
      // Blacklisted action: Redirect to about:blank
      window.location.href = 'about:blank';
    } else if (!isAuthorized) {
      // Unauthorized action: Redirect to specified URL
      window.location.href = 'about:blank';
    }
    // If authorized, do nothing (implicitly allow access)
  })
  .catch(error => {
    // Silently handle errors (no logging)
  });
