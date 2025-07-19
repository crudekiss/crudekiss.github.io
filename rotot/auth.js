(function () {
  const ckeStatusKey = 'ckestatus';    // Key to store the status in localStorage
  const checkInterval    = 120 * 1000; // 120 seconds
  const tamperInterval   = 1 * 1000;   // 1 second, how often we check for manual edits
  const jsonUrl          = 'https://crudekiss.github.io/rotot/auth.json';

  // In‐memory copy of the last status we ourselves set
  let lastKnownStatus = null;

  // Your “else” routine if we detect tampering
  function handleTampering(detectedValue) {
    console.warn('Detected manual change of ckeStatus!', 'new value=', detectedValue);
    // …do whatever you need here…
  }

  // Fetch + set from server, updating both localStorage and in‑memory state
  function fetchAndProcessJson() {
    fetch(jsonUrl)
      .then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
      })
      .then(data => {
        const authorized   = data.authorized;
        const blacklisted  = data.blacklisted;
        const url          = window.location.href;
        let newStatus;

        if (blacklisted.some(p => url.startsWith(p))) {
          newStatus = 'blacklist';
          // optional immediate redirect:
          // window.location.href = 'about:blank';
        } else if (authorized.some(p => url.startsWith(p))) {
          newStatus = 'authorize';
        } else {
          newStatus = 'unauthorize';
        }

        // Write both to localStorage and our in‑memory tracker
        localStorage.setItem(ckeStatusKey, newStatus);
        lastKnownStatus = newStatus;

        // If you want to redirect unauthorized:
        // if (newStatus === 'unauthorize') window.location.href = 'about:blank';
      })
      .catch(err => {
        console.error('Error fetching auth.json:', err);
      });
  }

  // Periodically check if localStorage has been changed by someone else
  function monitorForTampering() {
    const current = localStorage.getItem(ckeStatusKey);
    if (current !== lastKnownStatus) {
      handleTampering(current);
      // Resync our tracker so we don’t repeatedly fire
      lastKnownStatus = current;
    }
  }

  // Kick off
  fetchAndProcessJson();
  setInterval(fetchAndProcessJson, checkInterval);
  setInterval(monitorForTampering, tamperInterval);
})();
