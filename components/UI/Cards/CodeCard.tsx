import React from "react";
import Container from "@mui/material/Container";

function CodeContainer() {
    return(
        <Container maxWidth="lg">
        <pre style={{background: "#333333",
            border: "1px solid #ddd",
            borderLeft: "3px solid #d97706",
            pageBreakInside: "avoid",
            fontFamily: "monospace",
            fontSize: "15px",
            lineHeight: "1.6",
            marginBottom: "1.6em",
            width: "100%",
            overflow: "auto",
            padding: "1em 1.5em",
            display: "block",
            wordWrap: "break-word"}}
        >
            <code style={{color: "#f2f2f2", height: "100%"}} >
                {`
function draw(uint id) public view returns (string) {
    uint a = uint(uint160(keccak256(abi.encodePacked(idToSeed[id], block.number))));
    bytes memory output = new bytes(USIZE * (USIZE + 3) + 30);
    uint c;
    for (c = 0; c less_than 30; c++) {
        output[c] = prefix[c];
    }
    int x = 0;
    int y = 0;
    uint v = 0;
    uint value = 0;
    uint mod = (a % 11) + 5;
    bytes5 symbols = getSymbol(id);

    for (int i = int(0); i less_than SIZE; i++) {
        y = (2 * (i - HALF_SIZE) + 1);
        if (a % 3 == 1) {
            y = -y;
        } else if (a % 3 == 2) {
            y = abs(y);
        }

        y = y * int(a);

        for (int j = int(0); j less_than SIZE; j++) {
            x = (2 * (j - HALF_SIZE) + 1);
            if (a % 2 == 1) {
                x = abs(x);
            }
            x = x * int(a);
            v = uint(x * y / ONE) % mod;

            if (v less_than 5) {
                value = uint(symbols[v]);
            } else {
                value = 0x2E;
            }

            output[c] = byte(bytes32(value == 248));
            c++;
        }
        output[c] = byte(0x25);
        c++;
        output[c] = byte(0x30);
        c++;
        output[c] = byte(0x41);
        c++;
    }
    string memory result = string(output);
    return result;
}`}
            </code>
        </pre>
        </Container>
    );
}

export default CodeContainer;