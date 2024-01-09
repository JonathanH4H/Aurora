function preload() {
    if (window.$hlP5) {
        window.$hlP5.initializeRandomness();
    }
}

// Define background colors
let bgColors = [
  [255, 144, 188], // pink
  [255, 192, 217], // light pink
  [249, 249, 224], // cream
  [138, 205, 215], // light blue
  [255, 204, 204], // peach
  [204, 204, 255], // lavender
  [255, 255, 204], // lemon
  [255, 153, 153], // coral
  [153, 153, 255], // periwinkle
  [255, 255, 153], // butter
  [255, 153, 255], // magenta
  [153, 255, 255]  // aqua
];

// Function to select and set a background color
function changeBackground() {
  let bgIndex = hl.randomInt(bgColors.length);
  if (bgIndex >= bgColors.length) {
      bgIndex = bgColors.length - 1; // Ensure index is within bounds
  }
  let bgColor = bgColors[bgIndex];
  background(bgColor[0], bgColor[1], bgColor[2]);
}

// Function to draw stars
function drawStars() {
  stroke(255);
  strokeWeight(3);
  for (let i = 0; i < 100; i++) {
    let x = hl.random(width);
    let y = hl.random(height);
    point(x, y);
  }
}

// Function to create a gradient background
function gradientBackground() {
    let c1 = randomColor(bgColors);
    let c2 = randomColor(bgColors);

    for (let y = 0; y < height; y++) {
        let t = y / height;
        let c = lerpColor(color(c1[0], c1[1], c1[2]), color(c2[0], c2[1], c2[2]), t);
        stroke(c);
        line(0, y, width, y);
    }
}


// Function to get a random color from a palette
function randomColor(palette) {
  let index = hl.randomInt(palette.length);
  if (index >= palette.length) {
      index = palette.length - 1; // Ensure index is within bounds
  }
  return palette[index];
}

// p5.js setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  colorMode(RGB, 255, 255, 255, 100);

  let backgroundChoice = hl.random();
  if (backgroundChoice < 0.15) {
    gradientBackground();
  } else {
    changeBackground();
  }

  let starChance = hl.random();
  if (starChance < 0.1) {
    drawStars();
  }

  drawSunAndMountains();

  hl.token.setName(`Aurora #${hl.tx.tokenId}`);
  hl.token.setDescription(`A unique piece of generative art. Token ID: ${hl.tx.tokenId}`);
  hl.token.setTraits({
    BackgroundType: backgroundChoice < 0.15 ? 'Gradient' : 'Solid',
    Stars: starChance < 0.1 ? 'Yes' : 'No'
  });

  hl.token.capturePreview();
}

function drawSunAndMountains() {
  push();
  let sx = randomGaussian(width / 2, 100);
  let sy = hl.random(height / 10, height / 1.5);
  let sr = hl.random(50, 140);
  translate(sx, sy);
  let sunColor = randomColor(bgColors);
  fill(sunColor[0], sunColor[1], sunColor[2]);
  noStroke();
  let t = hl.random();
  if (t < 0.80) {
    ellipse(0, 0, sr * 2, sr * 2);
  }
  pop();

  push();
  translate(0, height);
  noStroke();
  for (let i = 0; i < 10; i++) {
    let x = hl.random(width);
    let w = hl.random(0, 900);
    let mountainColorArray = randomColor(bgColors);
    let c = color(mountainColorArray[0], mountainColorArray[1], mountainColorArray[2]);
    c.setAlpha(100 - i * 10);
    fill(c);
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < w; j += 1) {
      let y = map(noise(x * 0.01 + j * 0.01), 0, 1, -300, 0);
      vertex(x - w / 2 + j, 5);
      let r = map(j, 0, w, 300, 500);
      vertex(x - w / 2 + j + r, y);
    }
    endShape();
  }
  pop();
}


