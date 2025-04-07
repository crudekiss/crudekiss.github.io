// Function to fetch the latest status and update localStorage
function checkAuthorizationStatus() {
  fetch('https://crudekiss.github.io/rotot/auth.json', {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache', // Ensure fresh data without caching
    }
  })
  .then(response => {
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

    // Set the ckeStatus variable in localStorage based on the conditions
    if (isBlacklisted) {
      localStorage.setItem('ckeStatus', 'blacklisted');
      window.location.href = 'about:blank'; // Redirect to a blank page to block access
    } else if (isAuthorized) {
      localStorage.setItem('ckeStatus', 'authorized');
      // If authorized, allow access (do nothing, implicitly allow access)
    } else {
      localStorage.setItem('ckeStatus', 'unauthorized');
      // If the URL is not authorized, you could implement a redirect or warning here
      // Example: window.location.href = 'about:blank';
    }
  })
  .catch(error => {
    // Handle any errors silently without logging
    console.error('Authorization check failed:', error); // Optionally log errors for debugging
  });
}

// Initial check on page load
checkAuthorizationStatus();

// Set up a recurring check every 120 seconds (120,000 milliseconds)
setInterval(checkAuthorizationStatus, 120000);
