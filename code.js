const CONTAINER_SIZE = 600;
const container = document.querySelector(".grid-container");
const form = document.querySelector("form");

let isDrawing = false;
let drawingMode = 'standard';

document.querySelector(".main").addEventListener('mouseup', () => {
    isDrawing = false;
});
container.style.minHeight = `${CONTAINER_SIZE}px`;
container.style.minWidth = `${CONTAINER_SIZE}px`;
container.addEventListener('mousedown', () => isDrawing = true);
container.addEventListener('mouseup', () => isDrawing = false);
form.addEventListener('submit', (e) => {
    const data = new FormData(form);

    renderGrid(Number(data.get("row-size")));
    drawingMode = data.get("draw-mode");
    
    e.preventDefault();
});

function renderGrid(rowSize) {
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
            e.target.style.backgroundColor = e.ctrlKey ? 'white' : getDrawColor(e.target.style.backgroundColor);
        });
        grid.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.target.style.backgroundColor = e.ctrlKey ? 'white' : getDrawColor(e.target.style.backgroundColor);
        })
        gridBg.appendChild(grid);
    }
    container.appendChild(gridBg);
}

function randomValue(maxInclusive) {
    return Math.floor(Math.random() * (maxInclusive + 1));
}

function getDrawColor(currentColor) {
    let color;
    switch (drawingMode) {
        case 'rainbow':
            color = `rgb(${randomValue(255)}, ${randomValue(255)}, ${randomValue(255)})`;
            break;
        case 'dimmed':
            if (!currentColor.length || currentColor === 'white') {
                color = "rgba(0, 0, 0, 0.1)";
                break;
            }
            let alpha = Number(currentColor.split(/\((.*?)\)/)[1].split(',').pop());
            // Browser automatically converts rgba to rgb if alpha hits >= 1 and alpha resets 🙄
            alpha = alpha + 0.1 >= 1 ? 0.99 : alpha + 0.1; 
            color = `rgba(0, 0, 0, ${alpha})`;
            break;
        case 'standard':
        default:
            color = "black"
            break;
        }
    return color;
}
