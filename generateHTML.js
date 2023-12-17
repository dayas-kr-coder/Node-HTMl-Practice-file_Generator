const fs = require("fs");
const path = require("path");

const a = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const lessonNumber = 2;
const alphabetCount = a.indexOf("f") + 1;

let htmlFiles = [];

for (let i = 0; i < alphabetCount; i++) {
  htmlFiles.push(`${lessonNumber}${a[i]}.html`);
}

// Create "app" directory
const appDirectory = path.join(__dirname, "app");
fs.mkdirSync(appDirectory, { recursive: true });

// Create "style.css" file
const styleFilePath = path.join(appDirectory, "style.css");
const styleContent = `* {
  box-sizing: border-box;
}

body {
  font-size: 16px;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 0.6rem;
  border-radius: 8px;
  font-family: Arial, Helvetica, sans-serif;
  max-width: 250px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.box p {
  margin: 1rem 0.5rem 0.5rem 0.5rem;
  color: #555;
}

.box a {
  text-align: center;
  color: #333;
  text-decoration: none;
  padding: 5px 12px;
  border-radius: 5px;
  background-color: #dfdfdf;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.25) 0px 0px 0px 1px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #666;
    color: #fff;
  }
  &:active {
    background-color: #111;
  }
}

.bottom-box {
  gap: 0.45rem;
  width: 100%;
}

.home {
  display: block;
  margin-bottom: 0.45rem;
}

.boxNone .home {
  display: none;
}

.closeX {
  display: block;
  text-align: end;
  color: #666;
  cursor: pointer;
  &:hover {
    color: #ff5252;
  }
}

.disNone {
  display: none;
}

.Closebox {
  padding: 1rem;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.CloseCloseX {
  text-align: center;
}

#noMore {
  cursor: not-allowed;
  opacity: 0.4;
  &:hover {
    color: #333;
    background-color: #dfdfdf;
  }
  &:active {
    background-color: #dfdfdf;
  }
}`;

fs.writeFileSync(styleFilePath, styleContent);
console.log(`Created ${styleFilePath}`);

// Create "main.js" file
const mainFilePath = path.join(appDirectory, "main.js");
const mainContent = `
document.body.innerHTML += \`<div class="box">
<span class="closeX"></span>
<p>Lorem ipsum</p>
<a href="#" id="home" class="home">Home</a>
<div class="bottom-box flex">
  <a id="left">&#8592;</a>
  <a class="right">&#8594;</a>
</div>
</div>\`;

const closeX = document.querySelector(".closeX");
const box = document.querySelector(".box");
const boxB = document.querySelector(".bottom-box");
const boxP = document.querySelector(".box p");
const boxH = document.querySelector(".box .home");
const navLeft = document.querySelector(".bottom-box a:first-child");
const navRight = document.querySelector(".bottom-box a:last-child");

closeX.innerHTML = "✕";

closeX.addEventListener("click", () => {
  boxB.classList.toggle("disNone");
  boxP.classList.toggle("disNone");
  boxH.classList.toggle("disNone");

  box.classList.toggle("Closebox");
  closeX.classList.toggle("CloseCloseX");

  if (closeX.innerHTML === "✕") {
    closeX.innerHTML = "?";
    closeX.style.color = "green";
  } else {
    closeX.style.color = "#666";
    closeX.innerHTML = "✕";
  }
});

let a = [${htmlFiles.map((file) => `"${file}"`).join(", ")}];

const PageFileName = location.href.split("/").pop();
const withoutExtension = PageFileName.split(".")[0];

const lessonNo = withoutExtension.slice(0, 1);
const pageTitle = \`Lesson \${lessonNo} | Project \${withoutExtension}\`;

document.querySelector(".box p").innerHTML = pageTitle;
document.title = pageTitle;

boxH.setAttribute("href", a[0]);

const currentIndex = a.indexOf(PageFileName);

if (currentIndex !== -1) {
  navLeft.setAttribute("href", a[currentIndex - 1] || "#");
  navRight.setAttribute("href", a[currentIndex + 1] || "#");
}

if (currentIndex === 0) {
  navLeft.setAttribute("id", "noMore");
}

if (currentIndex === a.length - 1) {
  navRight.setAttribute("id", "noMore");
}
`;

fs.writeFileSync(mainFilePath, mainContent);
console.log(`Created ${mainFilePath}`);

// Create HTML files
for (let i = 0; i < alphabetCount; i++) {
  const fileName = `${lessonNumber}${a[i]}.html`;
  const fileContent = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${fileName}</title>
      <link rel="stylesheet" href="./app/style.css" />
    <script defer src="./app/main.js"></script>
    </head>
    <body></body>
  </html>`;
  fs.writeFileSync(fileName, fileContent);
  console.log(`Created ${fileName}`);
}

console.log("HTML files created successfully.");
