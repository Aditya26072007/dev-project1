// const url = 'https://yahoo-finance-real-time1.p.rapidapi.com/market/get-quotes?region=IN&symbols=%5ENSEI%2CGC%3DF%2CSI%3DF%2CNG%3DF%2CINR%3DX';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': "775e86374bmshf402726fb55ec0ep11f4c1jsn7edf0a26b48e",
// 		'x-rapidapi-host': 'yahoo-finance-real-time1.p.rapidapi.com'
// 	}
// };
// async function fetchMarketData() {
// try {
// 	const response = await fetch(url, options);
// 	const text = await response.text();
//     const data = JSON.parse(text);
// 	console.log(data);

//     const quotes = data.quoteResponse.result;

//     quotes.forEach(item => {
//   if (item.symbol === "^NSEI") {
//     document.getElementById("nifty").innerText = `${item.regularMarketChangePercent}%`;
//     if (item.regularMarketChangePercent >= 0) {
//   document.getElementById("nifty").style.color = "lime";
// } else {
//   document.getElementById("nifty").style.color = "red";
// }
//   }

//   if (item.symbol === "GC=F") {
//     document.getElementById("gold").innerText = `${item.regularMarketChangePercent}%`;
//     if (item.regularMarketChangePercent >= 0) {
//       document.getElementById("gold").style.color = "lime";
//     } else {
//       document.getElementById("gold").style.color = "red";
//     }
//   }

//   if (item.symbol === "SI=F") {
//     document.getElementById("silver").innerText = `${item.regularMarketChangePercent}%`;
//     if (item.regularMarketChangePercent >= 0) {
//       document.getElementById("silver").style.color = "lime";
//     } else {
//       document.getElementById("silver").style.color = "red";
//     }
//   }

//   if (item.symbol === "NG=F") {
//     document.getElementById("gas").innerText = `${item.regularMarketChangePercent}%`;
//     if (item.regularMarketChangePercent >= 0) {
//       document.getElementById("gas").style.color = "lime";
//     } else {
//       document.getElementById("gas").style.color = "red";
//     }
//   }

//   if (item.symbol === "INR=X") {
//     document.getElementById("usd").innerText = item.regularMarketPrice;
//     document.getElementById("usd").style.color = "lime";
// }
// });
// } catch (error) {
// 	console.error(error);
// }
// }
// fetchMarketData();
// setInterval(fetchMarketData, 86400000); // run every 24 hours

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const hero = document.querySelector(".hero-line");

  const navBottom = nav.getBoundingClientRect().bottom;
  const heroTop = hero.getBoundingClientRect().top;

  if (navBottom > heroTop) {
    hero.classList.add("blur-effect");
  } else {
    hero.classList.remove("blur-effect");
  }
});

const squares = document.querySelectorAll(".square");
const preview3 = document.getElementById("preview");
let hoverTimeout;

squares.forEach((square) => {
  square.addEventListener("mouseenter", () => {
    const coin = square.dataset.coin;
    const canvasId = square.dataset.canvas;
    const label = square.dataset.label;
 hoverTimeout = setTimeout(() => {
      getCoinData(coin, canvasId, label);
    }, 200);
   
    const img = square.querySelector(".img1");
    const chart = square.querySelector(".chart-box");

    if (square.contains(preview3)) return;

    if (img) img.classList.remove("hidden");
    if (chart) chart.style.display = "block";
  });

  square.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimeout);
    const img = square.querySelector(".img1");
    const chart = square.querySelector(".chart-box");

    if (square.contains(preview3)) return;

    if (img) img.classList.add("hidden");
    if (chart) chart.style.display = "none";
  });
});

function updateSquareVisibility(card) {
  const cardImg = card.querySelector(".img1");
  const chart = card.querySelector(".chart-box");

  // hide image in grid
  if (cardImg) {
    cardImg.classList.add("hidden");
  }

  // hide chart in grid (so it appears only on hover)
  if (chart) {
    chart.style.display = "none";
  }
}

function updatePreviewVisibility() {
  const previewImg = preview3.querySelector(".img1");
  const chart = preview3.querySelector(".chart-box");

  if (previewImg) {
    previewImg.classList.remove("hidden");
  }

  if (chart) {
    chart.style.display = "block";
  }
}

squares.forEach((square) => {
  square.addEventListener("click", () => {
    const coin = square.dataset.coin;
  const canvasId = square.dataset.canvas;
  const label = square.dataset.label;

  // FORCE LOAD CHART
  getCoinData(coin, canvasId, label);
    const card = square.querySelector(".square-card");

    if (!card || square.contains(preview3)) return;

    const previewContent = preview3.firstElementChild;
    const cardContent = card.firstElementChild;

    if (!previewContent || !cardContent) return;

    preview3.replaceChildren(cardContent);
    card.replaceChildren(previewContent);

    updatePreviewVisibility();
    updateSquareVisibility(card);
  });
});

const steps = document.querySelectorAll(".step");
const image = document.getElementById("feature-img");
const bg = document.querySelector(".bgadd");
let currentImg = image.src;

window.addEventListener("scroll", () => {
  let closest = null;
  let closestOffset = Infinity;

  steps.forEach((step) => {
    const rect = step.getBoundingClientRect();
    const offset = Math.abs(rect.top - window.innerHeight / 2);

    if (offset < closestOffset) {
      closestOffset = offset;
      closest = step;
    }
  });

  if (closest) {
    const newImg = closest.dataset.img;
    const newBg = closest.dataset.bg;
    if (newImg !== currentImg) {
      image.classList.add("fade-out");

      setTimeout(() => {
        image.src = newImg;
        image.classList.remove("fade-out");
      }, 300);

      currentImg = newImg;
    }
    bg.style.background = newBg;
  }
});

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const hero = document.querySelector(".bgadd");
  const li1 = document.querySelectorAll("nav ol li");
  const navBottom = nav.getBoundingClientRect().top;
  const heroTop = hero.getBoundingClientRect().top;

  if (navBottom > heroTop) {
    nav.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    li1.forEach((li) => (li.style.color = "white"));
  } else {
    nav.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    li1.forEach((li) => (li.style.color = "#1f1a1a84"));
  }
});

const btn1 = document.querySelector(".login-btn");
const btn2 = document.querySelector("#strt-btn");
const side2 = document.querySelector("#sign-in");
const cross = document.querySelector(".cross");
const overlay = document.querySelector("#overlay");
const nav = document.querySelector("nav");
cross.addEventListener("click", () => {
  side2.classList.add("hidden");
  overlay.classList.add("hidden");
  nav.classList.remove("hidden");
});
btn2.addEventListener("click", () => {
  side2.classList.remove("hidden");
  overlay.classList.remove("hidden");
  nav.classList.add("hidden");
});
btn1.addEventListener("click", () => {
  side2.classList.remove("hidden");
  overlay.classList.remove("hidden");
  nav.classList.add("hidden");
});

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 12;
    const rotateY = (x - centerX) / 12;

    card.style.transform = `
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.05)
`;

    card.style.setProperty("--x", x + "px");
    card.style.setProperty("--y", y + "px");

    card.style.setProperty("background-position", `${x}px ${y}px`);

    card.style.setProperty("--glow-x", x + "px");

    card.style.setProperty("--glow-y", y + "px");

    card.style.setProperty("transform-origin", `${x}px ${y}px`);

    card.style.setProperty(
      "background",
      `radial-gradient(circle at ${x}px ${y}px, rgba(56,161,88,0.15), transparent 120px),
linear-gradient(145deg,#0f172a,#020617)`,
    );
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";

    card.style.background = "linear-gradient(145deg,#0f172a,#020617)";
  });
});


window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const footer = document.querySelector("footer");

  const navBottom = nav.getBoundingClientRect().bottom;
  const footerTop = footer.getBoundingClientRect().top;

  if (navBottom > footerTop) {
    nav.style.opacity = "0";
  } else {
    nav.style.opacity = "1";
  }
});














const charts = {};
const loadedCharts = new Set();

const coins = [
  ["bitcoin", "btcChart", "BTC"],
  ["solana", "solChart", "SOL"],
  ["binancecoin", "bnbChart", "BNB"],
  ["ripple", "xrpChart", "XRP"],
  ["cardano", "adaChart", "ADA"],
  ["litecoin", "ltcChart", "LTC"],
  ["shiba-inu", "shibChart", "SHIB"],
  ["aptos", "aptChart", "APT"],
  ["stellar", "xlmChart", "XLM"],
  ["dogecoin", "dogeChart", "DOGE"],
  ["tether", "usdtChart", "USDT"],
  ["monero", "xmrChart", "XMR"],
  ["polygon-ecosystem-token", "polChart", "POL"],
  ["polkadot", "dotChart", "DOT"],
  ["chainlink", "clinkChart", "LINK"]
];

let apiBlocked = false;

async function getCoinData(coinId, canvasId, label) {

  if (charts[canvasId]) return;

  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`
    );

    if (res.status === 429) {
      throw new Error("RATE_LIMIT");
    }

    if (!res.ok) {
      throw new Error("API_FAILED");
    }

    const data = await res.json();

    if (!data.prices) {
      throw new Error("NO_DATA");
    }

    const labels = data.prices.map(p => {
      let d = new Date(p[0]);
      return d.getHours() + ":" + d.getMinutes();
    });

    const values = data.prices.map(p => p[1]);

    charts[canvasId] = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label,
          data: values,
          borderColor: "#38a158",
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });

  } catch (err) {

    console.log(coinId + " X", err.message);

    // HANDLE RATE LIMIT
    if (err.message === "RATE_LIMIT") {
      apiBlocked = true;

      setTimeout(() => {
        apiBlocked = false;
      }, 60000); // wait 1 min
    }

    // RETRY AFTER DELAY
    setTimeout(() => {
      delete charts[canvasId]; // allow retry
      getCoinData(coinId, canvasId, label);
    }, 15000);
  }
}




window.addEventListener("DOMContentLoaded", () => {
  const previewSquare = document.querySelector("#preview");

  const coin = previewSquare.dataset.coin;
  const canvasId = previewSquare.dataset.canvas;
  const label = previewSquare.dataset.label;

  getCoinData(coin, canvasId, label);

  document.querySelectorAll(".square").forEach(square => {
    const chart = square.querySelector(".chart-box");
    if (chart) chart.style.display = "none";
  });


  coins.forEach((coin, i) => {
  setTimeout(() => {
    getCoinData(coin[0], coin[1], coin[2]);
  }, i * 2000);
});
});