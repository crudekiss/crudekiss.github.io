// Placeholder for dynamic image paths
let imagePaths = [];

// Function to get just the filename from a path
function getFileName(path) {
  return path.split('/').pop();
}

// Function to preload images in batches sequentially
function preloadImagesInBatches(imageList, batchSize = 1) {
  const preloadedImages = []; // Store successfully loaded Image objects
  let cumulativeSize = 0;     // Total size in bytes of successful loads
  let totalSuccessful = 0;    // Total number of successful loads
  let totalFailed = 0;        // Total number of failed loads
  const startTime = performance.now(); // Start time for duration

  // Split the image list into batches
  const batches = [];
  for (let i = 0; i < imageList.length; i += batchSize) {
    batches.push(imageList.slice(i, i + batchSize));
  }

  // Process each batch sequentially
  async function processBatches() {
    for (let [index, batch] of batches.entries()) {
      console.log(`\x1b[34mStarting to load batch ${index + 1} of ${batches.length}\x1b[0m`);
      const promises = batch.map((path) => {
        return new Promise((resolve, reject) => {
          fetch(path)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.blob();
            })
            .then(blob => {
              const size = blob.size;
              const img = new Image();
              const objectURL = URL.createObjectURL(blob);
              img.src = objectURL;
              img.onload = () => {
                URL.revokeObjectURL(objectURL); // Free memory
                console.log(`\x1b[32mSuccessfully loaded: ${getFileName(path)}, size: ${size} bytes\x1b[0m`);
                resolve({ img, size });
              };
              img.onerror = () => {
                URL.revokeObjectURL(objectURL);
                console.log(`\x1b[31mFailed to load image: ${getFileName(path)}\x1b[0m`);
                reject(`Failed to load image: ${path}`);
              };
            })
            .catch(error => {
              console.log(`\x1b[31mFailed to fetch image: ${getFileName(path)}, error: ${error}\x1b[0m`);
              reject(error);
            });
        });
      });

      // Wait for all promises in the batch to settle
      const loadedImages = await Promise.allSettled(promises);
      const successfulLoads = loadedImages
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
      const batchSuccessful = successfulLoads.length;
      const batchFailed = loadedImages.length - batchSuccessful;
      const batchTotalBytes = successfulLoads.reduce((acc, { size }) => acc + size, 0);

      // Update cumulative totals
      cumulativeSize += batchTotalBytes;
      totalSuccessful += batchSuccessful;
      totalFailed += batchFailed;
      preloadedImages.push(...successfulLoads.map(({ img }) => img));

      console.log(`\x1b[34mBatch ${index + 1} completed. Successful: ${batchSuccessful}, Failed: ${batchFailed}, Batch size: ${batchTotalBytes} bytes\x1b[0m`);
    }

    // Calculate final metrics
    const endTime = performance.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2); // Duration in seconds
    const totalSizeMB = (cumulativeSize / (1024 * 1024)).toFixed(2); // Size in MB
    const loadingSpeed = duration > 0 ? (cumulativeSize / (1024 * 1024) / duration).toFixed(2) : 'N/A'; // MB/s

    // Log final results
    console.log(`\x1b[34mPreloading completed in ${duration} seconds.\x1b[0m`);

    return {
      duration,
      successCount: totalSuccessful,
      failCount: totalFailed,
      totalSize: cumulativeSize, // In bytes
      loadingSpeed              // In MB/s, as string
    };
  }

  return processBatches();
}

// Flag to prevent overlapping preloads
let isPreloading = false;

// Function to start preloading
function startPreload() {
  if (!isPreloading) {
    isPreloading = true;
    console.log("Starting image preload...");
    preloadImagesInBatches(imagePaths, 5)
      .then(result => {
        console.log(`\x1b[34mPreload completed: Successfully loaded: ${result.successCount}, Failed: ${result.failCount}, Total size: ${(result.totalSize / (1024 * 1024)).toFixed(2)}MB, Loading speed: ${result.loadingSpeed}MB/s\x1b[0m`);
        isPreloading = false;
      })
      .catch(error => {
        console.log(`\x1b[31mAn error occurred during preload: ${error}\x1b[0m`);
        isPreloading = false;
      });
  } else {
    console.log("Preload already in progress, skipping...");
  }
}

// Function to load an external script dynamically
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

// Initialize: fetch image paths and auth, then start preloading
function initPreloader() {
  // Fetch image paths JSON
  fetch('https://crudekiss.github.io/rotot/imagePaths.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch imagePaths.json: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Invalid imagePaths format: expected an array');
      }
      imagePaths = data;
      // Load auth.js then start preload
      return loadScript('https://crudekiss.github.io/rotot/auth.js');
    })
    .catch(error => {
      console.warn(`Warning: ${error}. Proceeding without updated imagePaths/auth.`);
    })
    .finally(() => {
      // Start preloading regardless of fetch/auth success
      startPreload();
    });
}

// Start on script load
initPreloader();

// Event listener for visibility change
document.addEventListener("visibilitychange", function () {
  if (!document.hidden) {
    startPreload();
  }
});
