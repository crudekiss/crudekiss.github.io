async function generateUniqueId() {
    // Step 1: Get the entire HTML content of the page
    const html = document.documentElement.outerHTML;

    // Step 2: Convert the HTML string to a format suitable for hashing
    const encoder = new TextEncoder();
    const data = encoder.encode(html);

    // Step 3: Compute the SHA-256 hash of the HTML content
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Step 4: Convert the hash (ArrayBuffer) to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    // Step 5: Fetch the authorized versions from the JSON file, ensuring a fresh request
    try {
        // Add a cache-busting query parameter with a timestamp
        const url = 'https://crudekiss.github.io/rotot/versions.json?nocache=' + Date.now();
        const response = await fetch(url, {
            cache: 'no-store' // Explicitly disable caching
        });
        if (!response.ok) {
            throw new Error('Failed to fetch authorized versions');
        }
        const authorizedVersions = await response.json();
        // Assuming authorizedVersions is an array of strings
        const isAuthorized = authorizedVersions.includes(hashHex);
        // Log the result
        if (isAuthorized) {
            console.log('Version ID:', hashHex, 'is authorized.');
        } else {
            console.log('Version ID:', hashHex, 'is not authorized.');
        }
    } catch (error) {
        console.error('Error fetching or processing authorized versions:', error);
    }

    // Return the hash
    return hashHex;
}

// Call the function to execute it
generateUniqueId();
