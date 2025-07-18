function startTest() {
  document.getElementById("ping").textContent = "...";
  document.getElementById("download").textContent = "...";
  document.getElementById("upload").textContent = "...";

  testPing().then(ping => {
    document.getElementById("ping").textContent = ping.toFixed(1);
  });

  testDownload().then(speed => {
    document.getElementById("download").textContent = speed.toFixed(2);
  });

  testUpload().then(speed => {
    document.getElementById("upload").textContent = speed.toFixed(2);
  });
}

// Basic Ping
async function testPing() {
  const start = performance.now();
  await fetch("https://corsproxy.io/?https://www.google.com/images/phd/px.gif");
  const end = performance.now();
  return end - start;
}

// Basic Download
async function testDownload() {
  const fileUrl = "https://speed.hetzner.de/10MB.bin";
  const start = performance.now();
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  const end = performance.now();
  const duration = (end - start) / 1000;
  const bitsLoaded = blob.size * 8;
  return (bitsLoaded / duration) / (1024 * 1024); // Mbps
}

// Basic Upload
async function testUpload() {
  const dataSize = 2 * 1024 * 1024;
  const data = new Blob([new Uint8Array(dataSize)]);
  const start = performance.now();
  await fetch("https://httpbin.org/post", {
    method: "POST",
    body: data,
  });
  const end = performance.now();
  const duration = (end - start) / 1000;
  const bitsSent = dataSize * 8;
  return (bitsSent / duration) / (1024 * 1024); // Mbps
}

// Get IP + Location Info
async function getIPInfo() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    document.getElementById("ip").textContent = data.ip;
    document.getElementById("location").textContent = `${data.city}, ${data.region}, ${data.country_name}`;
  } catch (e) {
    document.getElementById("ip").textContent = "Unavailable";
    document.getElementById("location").textContent = "Unavailable";
  }
}

getIPInfo();
