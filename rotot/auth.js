// Utility function to get a formatted timestamp
const getTimestamp = () => {
  return new Date().toISOString(); // e.g., "2025-03-30T12:34:56.789Z"
};

// Fetch and authorization logic
fetch('https://crudekiss.github.io/rotot/auth.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const authorizedPrefixes = data.authorized;
    const currentUrl = window.location.href;

    // Check if the current URL matches any authorized prefix
    const isAuthorized = authorizedPrefixes.some(prefix => currentUrl.startsWith(prefix));

    // Professional console logging
    const logLevel = isAuthorized ? 'info' : 'warn';
    const statusMessage = isAuthorized ? 'Authorized' : 'Unauthorized';
    const logDetails = {
      timestamp: getTimestamp(),
      level: logLevel,
      message: `${statusMessage} access detected`,
      url: currentUrl,
      authorizedPrefixes: authorizedPrefixes
    };

    // Use console method based on authorization status
    if (isAuthorized) {
      console.info('[AUTH]', JSON.stringify(logDetails, null, 2));
    } else {
      console.warn('[AUTH]', JSON.stringify(logDetails, null, 2));
    }
  })
  .catch(error => {
    // Professional error logging
    const errorDetails = {
      timestamp: getTimestamp(),
      level: 'error',
      message: 'Failed to perform authorization check',
      url: window.location.href,
      error: error.message
    };
    console.error('[AUTH]', JSON.stringify(errorDetails, null, 2));
  });
