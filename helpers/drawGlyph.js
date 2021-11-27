const chroma = require("chroma-js");

// VIZ PARAMS
let gridDimension = 64;
let cellSize = 5;
let strokeWidth = 2;
// let colorScale = chroma.scale(['#fafa6e', '#2A4858']).mode('lch').colors(8); // initial colors
let colorScale = chroma.scale(['#c913c3', '#f8b9f6', ]).mode('lch').colors(8);

export function setGridData(glyphData) {
    let data = new Array();
    let xpos = 0; // start xpos and ypos at 1 so the stroke will show when we make the grid
    let ypos = 0;
    let width = cellSize;
    let height = cellSize;

    for (let row = 0; row < glyphData.length; row++) {
        data.push(new Array());
        for (let column = 0; column < gridDimension; column++) {
            data[row].push({
                x: xpos,
                y: ypos,
                width: width,
                height: height,
                character: glyphData[row][column]
            })
            xpos += width; // increment the x position. I.e. move it over by width
        }
        xpos = 1; // reset the x position after a row is complete
        ypos += height; // increment the y position for the next row. Move it down by height
    }
    return data;
}

export function drawSVG(gridData) {
    const beginingSVG = `<svg width="${cellSize * gridDimension}" height="${cellSize * gridDimension}" fill="none" xmlns="http://www.w3.org/2000/svg">`;
    const endingSVG = "</svg>";

    const beginingRows = '<g class="row">';
    const endingRows = '</g>';

    const cells = gridData.map((gridObj) => {
        const cells = gridObj.map(cellData => {
            if(setGlyph(cellData.character, colorScale)) {
                return `<g class="${setClass(cellData.character)}" transform="${`translate(${cellData.x},${cellData.y})`}">${setGlyph(cellData.character, colorScale)}</g>`;
            } else {
                return `<g transform="${`translate(${cellData.x},${cellData.y})`}" />`;
            }
        });
        return cells;
    });

    const finalSVG = beginingSVG + cells.map(cell => `${beginingRows}${cell.join("")}${endingRows}`).join("") + endingSVG;
    return finalSVG;
}

export function setGlyph(char, colorScale) {
    switch (char) {
        case ("."):
            break;
        case ("O"):
            return `<circle stroke="${colorScale[0]}" stroke-width="${strokeWidth}" cx="${cellSize/2}" cy="${cellSize/2}" r="${cellSize/2}"></circle>`;
        case ("+"):
            return `<g>
                        <path d="M0,5 L10,5" stroke="${colorScale[1]}" stroke-width="${strokeWidth}"></path>
                        <path d="M5,0 L5,10" stroke="${colorScale[1]}" stroke-width="${strokeWidth}"></path>
                    </g>`;
        case ("X"):
            return `<g>
                        <path d="M10,0 L0,10" stroke="${colorScale[2]}" stroke-width="${strokeWidth}"></path>
                        <path d="M0,0 L10,10" stroke="${colorScale[2]}" stroke-width="${strokeWidth}"></path>
                    </g>`;
        case ("|"):
            return `<path d="M5,0 L5,10" stroke="${colorScale[3]}" stroke-width="${strokeWidth}"></path>`;
        case ("-"):
            return `<path d="M0,5 L10,5" stroke="${colorScale[4]}" stroke-width="${strokeWidth}"></path>`;
        case ("\\"):
            return `<path d="M0,0 L10,10" stroke="${colorScale[5]}" stroke-width="${strokeWidth}"></path>`;
        case ("/"):
            return `<path d="M10,0 L0,10" stroke="${colorScale[6]}" stroke-width="${strokeWidth}"></path>`;
        case ("#"):
            return `<rect fill="${colorScale[7]}" fill-rule="nonzero" x="0" y="0" width="${cellSize}" height="${cellSize}"></rect>`;
        default:
            break;
    }
}

function setClass(char) {
    switch (char) {
        case ("."): // 0x2E = .
            return "whitespace";
        case ("O"): // 0x4F = O
            return "circle";
        case ("+"): // 0x2B = +
            return "plus";
        case ("X"): // 0x58 = X
            return "x";
        case ("|"): // 0x7C = |
            return "vertical-line";
        case ("-"): // 0x2D = -
            return "horizontal-line";
        case ("\\"): // 0x5C = \
            return "back-slash";
        case ("/"): // 0x2F = /
            return "forward-slash";
        case ("#"): // 0x23 = #
            return "hash";
        default:
            break;
    }
}

export function getImages(tokenURI) {
    const rawTokenURI = tokenURI.slice(30);
    const grid = rawTokenURI.split("%0A");

    const gridData = setGridData(grid);
    const svg = drawSVG(gridData);
    return encodeSVG(svg);
}

function encodeSVG(_svg) {
    var svg = unescape(encodeURIComponent(_svg));
    var base64SVG = window.btoa(svg);
    var imgSource = `data:image/svg+xml;base64,${base64SVG}`;
    return imgSource;
}