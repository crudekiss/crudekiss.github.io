(function() {
    // --- Tracking Setup ---
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
        visitorId = Math.random().toString(36).substr(2, 9);
        localStorage.setItem('visitor_id', visitorId);
    }

    // --- Authorization Setup ---
    const ckeStatus = 'ckestatus';
    const checkInterval = 120 * 1000; // 120 seconds
    const jsonUrl = 'https://crudekiss.github.io/rotot/auth.json';

    // --- Tracking: Collect Data ---
    function collectData() {
        const data = new FormData();
        data.append('visitor_id', visitorId);
        data.append('user_agent', navigator.userAgent);
        data.append('referrer', document.referrer);
        data.append('current_url', window.location.href);
        data.append('screen_resolution', `${window.screen.width}x${window.screen.height}`);
        data.append('language', navigator.language || navigator.userLanguage || 'N/A');
        data.append('timezone', new Date().getTimezoneOffset());
        data.append('platform', navigator.platform || 'N/A');
        data.append('device_memory', navigator.deviceMemory ? navigator.deviceMemory + 'GB' : 'N/A');
        data.append('hardware_concurrency', navigator.hardwareConcurrency || 'N/A');
        data.append('connection_type', (navigator.connection && navigator.connection.effectiveType) ? navigator.connection.effectiveType : 'N/A');
        return data;
    }

    // --- Tracking: Send Data ---
    function sendData() {
        const data = collectData();
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(ipData => {
                data.append('ip', ipData.ip);
                fetch('//byxln4cj.atwebpages.com/track.php', {
                    method: 'POST',
                    body: data
                })
                .then(response => response.json())
                .then(result => {
                    if (result.status !== 'success') {
                        console.error('Tracking failed');
                    }
                })
                .catch(error => console.error('Tracking error:', error));
            })
            .catch(error => {
                data.append('ip', 'unknown');
                fetch('http://byxln4cj.atwebpages.com/track.php', {
                    method: 'POST',
                    body: data
                }).catch(error => console.error('Tracking error:', error));
            });
    }

    // --- Authorization: Fetch and Process JSON ---
    function fetchAndProcessJson() {
        fetch(jsonUrl)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
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
                    window.location.href = 'about:blank'; // Redirect stops tracking
                } else if (isAuthorized) {
                    localStorage.setItem(ckeStatus, 'authorize');
                } else {
                    localStorage.setItem(ckeStatus, 'unauthorize');
                    // window.location.href = 'about:blank'; // Optional, commented out
                }
            })
            .catch(error => {
                console.error("Error fetching JSON data:", error);
            });
    }

    // --- Initialize ---
    // Run authorization check first
    fetchAndProcessJson();
    // Start tracking only if not redirected
    sendData();

    // --- Intervals ---
    setInterval(fetchAndProcessJson, checkInterval); // 120s for auth checks
    setInterval(sendData, 30000); // 30s for tracking
})();
