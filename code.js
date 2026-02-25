const CONTAINER_SIZE = 600;
const container = document.querySelector(".grid-container");
const sizeInput = document.querySelector("#row-size");
const setBtn = document.querySelector(".set-btn");

let isDrawing = false;

document.querySelector(".main").addEventListener('mouseup', () => {
    isDrawing = false;
});
container.style.minHeight = `${CONTAINER_SIZE}px`;
container.style.minWidth = `${CONTAINER_SIZE}px`;
container.addEventListener('mousedown', () => isDrawing = true);
container.addEventListener('mouseup', () => isDrawing = false);
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
        grid.addEventListener('mouseover', (e) => {
            if (!isDrawing) return;

            e.target.style.backgroundColor = e.ctrlKey ? 'white' : 'black';
        });
        grid.addEventListener('mousedown', (e) => {
            e.target.style.backgroundColor = e.ctrlKey ? 'white' : 'black';
        })
        gridBg.appendChild(grid);
    }
    container.appendChild(gridBg);
}
