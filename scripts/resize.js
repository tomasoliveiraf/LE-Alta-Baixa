let isLeftDragging = false;
let isRightDragging = false;

function StartLeftDrag() {
  isLeftDragging = true;
}

function StartRightDrag() {
  isRightDragging = true;
}

function EndDrag() {
  isLeftDragging = false;
  isRightDragging = false;
}

function OnDrag(event, gridId) {
  if (isLeftDragging || isRightDragging) {
    let page = document.getElementById(gridId);
    let leftcol = page.querySelector(".article-left-column");
    let rightcol = page.querySelector(".article-right-column");

    let dragbarWidth = 5;

    let leftColWidth = isLeftDragging ? event.clientX : leftcol.clientWidth;
    let rightColWidth = isRightDragging
      ? page.clientWidth - event.clientX - dragbarWidth
      : rightcol.clientWidth;

    let totalWidth = page.clientWidth;
    let remainingSpace =
      totalWidth - leftColWidth - rightColWidth - 2 * dragbarWidth;

    let cols = [
      leftColWidth,
      dragbarWidth,
      remainingSpace,
      dragbarWidth,
      rightColWidth,
    ];

    let newColDefn = cols.map((c) => c.toString() + "px").join(" ");
    page.style.gridTemplateColumns = newColDefn;

    document.body.style.userSelect = "none";
  }
}

document.addEventListener("mouseup", function () {
  EndDrag();
  document.body.style.userSelect = "";
});
