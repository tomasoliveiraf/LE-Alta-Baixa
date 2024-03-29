//FETCH DO FICHEIRO TEXTO
function loadText(filePath, articleHeader, articleType) {
  fetch(filePath)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      processText(data, articleHeader, articleType);
    });
}

function processText(newTextContent, articleHeader, articleType) {
  const sections = newTextContent.split("\n\n\n");

  sections.forEach((sectionContent) => {
    //CRIAR AS SECÇÕES
    const sectionContainer = document.createElement("section");

    //DIFERENCIAR ARTIGOS DA BAIXA DOS DA ALTA
    const articleContainerAlta = document.querySelector("#alta");
    const articleContainerBaixa = document.querySelector("#baixa");

    if (articleType === "alta") {
      articleContainerAlta.appendChild(sectionContainer);
    } else if (articleType === "baixa") {
      articleContainerBaixa.appendChild(sectionContainer);
    }

    //APPEND DO HEADER
    const header = createHeader(articleHeader);
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

function createHeader(articleHeader) {
  const header = document.createElement("div");
  header.classList.add("article-header");

  const titles = articleHeader.split(",");
  titles.forEach((title, index) => {
    if (index === 0) {
      const a = document.createElement("a");
      a.href = "#home";

      const paragraph = document.createElement("p");
      paragraph.textContent = title;

      a.appendChild(paragraph);
      header.appendChild(a);
    } else {
      const paragraph = document.createElement("p");
      paragraph.textContent = title;
      header.appendChild(paragraph);
    }
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
    if (i === 1) {
      const dragBar = document.createElement("div");
      dragBar.classList.add("article-left-dragbar");
      dragBar.setAttribute(
        "onmousedown",
        `StartLeftDrag('grid${gridCounter}')`
      );
      gridElement.appendChild(dragBar);
    }
    if (i === 2) {
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
      if (line.startsWith("_IMG ")) {
        //IMG
        const img = document.createElement("img");
        img.src = "./images/" + line.substring(5);
        column.appendChild(img);
      } else if (line.startsWith("###### ")) {
        //H5
        const heading6 = document.createElement("h6");
        heading6.textContent = line.substring(7);
        column.appendChild(heading6);
      } else if (line.startsWith("##### ")) {
        //H5
        const heading5 = document.createElement("h5");
        heading5.textContent = line.substring(6);
        column.appendChild(heading5);
      } else if (line.startsWith("#### ")) {
        //H4
        const heading4 = document.createElement("h4");
        heading4.textContent = line.substring(5);
        column.appendChild(heading4);
      } else if (line.startsWith("### ")) {
        //H3
        const heading3 = document.createElement("h3");
        heading3.style.textAlign = "center";
        heading3.textContent = line.substring(4);
        column.appendChild(heading3);
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

//LOAD DO ARTIGO DA ALTA
loadText(
  "./articles/alta.txt",
  "Alta & Baixa,Using Autoencoders to Generate Skeleton-based Typography,Artigo 1",
  "alta"
);
//LOAD DO ARTIGO DA BAIXA
loadText(
  "./articles/baixa.txt",
  "Alta & Baixa,Thirteen Ways of Looking at a Typeface,Artigo 2",
  "baixa"
);
