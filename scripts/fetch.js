//FETCH DO FICHEIRO TEXTO
function loadText() {
  fetch("../data/baixa.txt")
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      processText(data);
    });
}

function processText(newTextContent) {
  const sections = newTextContent.split("\n\n\n");

  sections.forEach((sectionContent) => {
    //CRIAR AS SECÇÕES
    const sectionContainer = document.createElement("section");
    document.body.appendChild(sectionContainer);

    //APPEND DO HEADER
    const header = createHeader();
    sectionContainer.appendChild(header);

    //CONTEÚDO DE CADA COLUNA
    const columns = sectionContent.split("\n\n").map((column) => column.trim());

    //CRIAR A GRELHA DINAMICAMENTE CONSOANTE O CONTEÚDO
    const numberOfGrids = Math.ceil(columns.length / 3);
    for (let i = 0; i < numberOfGrids; i++) {
      createGrid(sectionContainer, columns.slice(i * 3, (i + 1) * 3));
    }
  });
}

function createHeader() {
  // Create a common header for each section
  const header = document.createElement("div");
  header.classList.add("article-header");

  const titles = [
    "Alta & Baixa",
    "Thirteen Ways of Looking at a Typeface",
    "Artigo 1",
  ];

  titles.forEach((title) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = title;
    header.appendChild(paragraph);
  });

  return header;
}

//CONTADOR PARA OS IDS
let gridCounter = 0;

function createGrid(sectionContainer, gridContent) {
  gridCounter++;

  //CRIAR A GRID
  const gridElement = document.createElement("div");
  gridElement.classList.add("article-grid");
  gridElement.setAttribute("id", `grid${gridCounter}`);
  //EVENTOS ASSOCIADOS
  gridElement.setAttribute("onmouseup", `EndDrag('grid${gridCounter}')`);
  gridElement.setAttribute(
    "onmousemove",
    `OnDrag(event, 'grid${gridCounter}')`
  );

  sectionContainer.appendChild(gridElement);

  gridContent.forEach((block, i) => {
    //CRIAR AS COLUNAS (LEFT/MIDDLE/RIGHT)
    const column = document.createElement("div");
    column.classList.add(`article-${["left", "middle", "right"][i]}-column`);

    //DRAGBARS
    if (i === 0) {
      const dragBar = document.createElement("div");
      dragBar.classList.add("article-left-dragbar");
      dragBar.setAttribute(
        "onmousedown",
        `StartLeftDrag('grid${gridCounter}')`
      );
      gridElement.appendChild(dragBar);
    }
    if (i === 1) {
      const dragBar = document.createElement("div");
      dragBar.classList.add("article-right-dragbar");
      dragBar.setAttribute(
        "onmousedown",
        `StartRightDrag('grid${gridCounter}')`
      );
      gridElement.appendChild(dragBar);
    }

    //DIVIDIR EM LINHAS OS BLOCOS DE TEXTO
    const lines = block.split("\n");

    //ANALISAR O COMEÇO DE TODAS AS LINHAS
    lines.forEach((line) => {
      //CRIAR HEADINGS E PARAGRAFOS
      if (line.startsWith("##### ")) {
        //H5
        const heading2 = document.createElement("h5");
        heading2.textContent = line.substring(6);
        column.appendChild(heading2);
      } else if (line.startsWith("### ")) {
        //H3
        const heading1 = document.createElement("h3");
        heading1.style.textAlign = "center";
        heading1.textContent = line.substring(4);
        column.appendChild(heading1);
      } else {
        //PARAGRAFOS
        const paragraph = document.createElement("p");
        paragraph.textContent = line;
        column.appendChild(paragraph);
      }
    });

    gridElement.appendChild(column);
  });
}

loadText();