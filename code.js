const CONTAINER_SIZE = 600;
const container = document.querySelector(".grid-container");
const sizeInput = document.querySelector("#row-size");
const setBtn = document.querySelector(".set-btn");

container.style.minHeight = `${CONTAINER_SIZE}px`;
container.style.minWidth = `${CONTAINER_SIZE}px`;
setBtn.addEventListener('click', (e) => {
    e.preventDefault();
    renderGrid(Number(sizeInput.value));
});

function renderGrid(rowSize)
{
    if (rowSize < 0 || rowSize > 100) return;
    container.innerHTML = '';
    const gridSize = Math.floor(CONTAINER_SIZE / rowSize);
    const gridBg = document.createElement("div");
    gridBg.style.width = `${CONTAINER_SIZE}px`;
    gridBg.classList.add('grid-bg');
    for (let i = 0; i < rowSize ** 2; i++) {
        const grid = document.createElement("div");
        grid.classList.add("square");
        grid.style.height = `${gridSize}px`;
        grid.style.flexBasis = `${gridSize}px`;
        gridBg.appendChild(grid);
    }
    container.appendChild(gridBg);
}
