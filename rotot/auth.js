fetch('https://crudekiss.github.io/rotot/auth.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    const authorizedPrefixes = data.authorized;
    const currentUrl = window.location.href;
    const isAuthorized = authorizedPrefixes.some(prefix => currentUrl.startsWith(prefix));

    if (isAuthorized) {
      // AUTHORIZED_ACTION: Add what happens when authorized here
      // Example: alert('Access granted!');
    } else {
      // UNAUTHORIZED_ACTION: Add what happens when unauthorized here
      // Example: window.location.href = 'https://example.com/unauthorized';
    }
  })
  .catch(error => {});
