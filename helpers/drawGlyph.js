const chroma = require("chroma-js");
// import "d3";
import * as d3 from 'd3';
// import d3 from "d3";

const PREFIX = "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000010de646174613a746578742f706c61696e3b636861727365743d7574662d382c";
// VIZ PARAMS
let grid;
let gridDimension = 64;
let cellSize = 5;
let strokeWidth = 2;
let colorScale = chroma.scale(['#fafa6e', '#2A4858']).mode('lch').colors(8);

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

// export function draw(gridData) {
//     let grid = d3.select("#grid")
//         .append("svg")
//         .attr("width", `${cellSize * gridDimension/* + strokeWidth*/}`)
//         .attr("height", `${cellSize * gridDimension/* + strokeWidth*/}`);

//     let row = grid.selectAll(".row")
//         .data(gridData)
//         .enter().append("g")
//         .attr("class", "row");

//     let cells = row.selectAll(".cell")
//         .data(d => d)
//         .enter().append("g")
//         .attr("transform", d => `translate(${d.x},${d.y})`)
//         .attr("class", d => setClass(d.character))
//         .html(d => setGlyph(d.character, colorScale));
// }

export function draw(gridData, id) {

    const gridElement = document.getElementById("grid");
    const container = document.createElement("div");
    const htmlId = `yeroglyphs-${id}`
    container.setAttribute("id", htmlId);
    gridElement.appendChild(container);

    var containerStyle = document.createElement('style');
    containerStyle.type = 'text/css';
    containerStyle.innerHTML = '.yeroglyphs-container { background-color: #0d0d0d; display: flex; flex-direction: column; width: 340px; padding: 7% 3% 3% 3%; margin: 3% 3% 3% 3%; border-radius: 1em;  }';
    container.appendChild(containerStyle);
    container.setAttribute("class", "yeroglyphs-container");

    let grid = d3.select(`#${htmlId}`)
        .append("svg")
        .attr("width", `${cellSize * gridDimension/* + strokeWidth*/}`)
        .attr("height", `${cellSize * gridDimension/* + strokeWidth*/}`);

    let row = grid.selectAll(".row")
        .data(gridData)
        .enter().append("g")
        .attr("class", "row");

    let cells = row.selectAll(".cell")
        .data(d => d)
        .enter().append("g")
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .attr("class", d => setClass(d.character))
        .html(d => setGlyph(d.character, colorScale));

        const nameElement = `<p id="name-yeroglyphs-${id}" >Yeroglyphs #${id}</p>`
        container.insertAdjacentHTML("beforeend", nameElement);
    
        const nameStyle = document.createElement("style");
        const nameElement2 = document.getElementById(`name-yeroglyphs-${id}`);
        nameStyle.type = 'text/css';
        nameStyle.innerHTML = '.name-yeroglyphs { color: #ffffff; }';
        nameElement2.appendChild(nameStyle);
        nameElement2.setAttribute("class", "name-yeroglyphs");
    
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

// let gridGlyph = formatData();
// let gridData = setGridData(gridGlyph);
// draw(gridData);