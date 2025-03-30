// Utility function to get a compact timestamp
const getTimestamp = () => new Date().toISOString().slice(11, 23); // e.g., "12:34:56.789"

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

    // Professional one-line console logging
    const timestamp = getTimestamp();
    const level = isAuthorized ? 'INFO' : 'WARN';
    const status = isAuthorized ? 'Authorized' : 'Unauthorized';
    const color = isAuthorized ? 'color: green' : 'color: orange';
    console.log(
      `%c[AUTH] ${timestamp} ${level} ${status} - URL: ${currentUrl}`,
      color
    );
  })
  .catch(error => {
    // Professional one-line error logging
    const timestamp = getTimestamp();
    console.log(
      `%c[AUTH] ${timestamp} ERROR Failed to check authorization - URL: ${window.location.href} - Error: ${error.message}`,
      'color: red'
    );
  });
