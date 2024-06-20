const data = [
    { dataChunk: "Hello", connectionIndexes: [ { index: 1, weight: 35 }, { index: 2, weight: 8 }, { index: 3, weight: 16 } ] },
    { dataChunk: ",", connectionIndexes: [ { index: 4, weight: 35 }, { index: 5, weight: 32 } ] },
    { dataChunk: " mate", connectionIndexes: [ { index: 3, weight: 35 } ] },
    { dataChunk: "!", connectionIndexes: [ { index: 7, weight: 35 }, { index: 22, weight: 23 } ] },
    { dataChunk: " how", connectionIndexes: [ { index: 8, weight: 36 }, { index: 10, weight: 23 } ] },
    { dataChunk: " what", connectionIndexes: [ { index: 15, weight: 35 } ] },
    { dataChunk: "!", connectionIndexes: [  ] },
    { dataChunk: " How", connectionIndexes: [ { index: 18, weight: 35 } ] },
    { dataChunk: "'", connectionIndexes: [ { index: 9, weight: 35 } ] },
    { dataChunk: "s", connectionIndexes: [ { index: 11, weight: 35 }, { index: 12, weight: 35 }, { index: 13, weight: 35 } ] },
    { dataChunk: " are you", connectionIndexes: [ { index: 14, weight: 25 }, { index: 21, weight: 28 } ] },
    { dataChunk: " it going", connectionIndexes: [ { index: 14, weight: 35 } ] },
    { dataChunk: " life treating ya", connectionIndexes: [ { index: 14, weight: 35 } ] },
    { dataChunk: " it hanging", connectionIndexes: [ { index: 14, weight: 35 } ] },
    { dataChunk: "?", connectionIndexes: [ ] },
    { dataChunk: "'", connectionIndexes: [ { index: 16, weight: 23 } ] },
    { dataChunk: "s", connectionIndexes: [ { index: 17, weight: 28 } ] },
    { dataChunk: " up mate", connectionIndexes: [ { index: 14, weight: 24 } ] },
    { dataChunk: " are", connectionIndexes: [ { index: 19, weight: 37 }, { index: 20, weight: 34 } ] },
    { dataChunk: " ya", connectionIndexes: [ { index: 14, weight: 24 }, { index: 21, weight: 23 } ] },
    { dataChunk: " you", connectionIndexes: [ { index: 14, weight: 35 }, { index: 21, weight: 33 } ] },
    { dataChunk: " today", connectionIndexes: [ { index: 14, weight: 10 } ] },
    { dataChunk: "", connectionIndexes: [ ] },
];

const input = "Hello"; // Should be an even ", how are you?" or "!"
const temperature = 1; // Max 2, min 1

function getConnection(data, temp) {
    const randomIndex = Math.floor(Math.random() * data.connectionIndexes.length);
    const randomConnection = data.connectionIndexes[randomIndex];

    if (!randomConnection) {
        return null;
    }

    const bias = 1 / temp;

    return Math.random() < bias ? randomConnection.index : null;
}

async function processInput(text, temp) {
    let output = "";
    let completed = false;
    let connection = data.filter((v) => v.dataChunk === text)
        .sort(() => Math.random() - 0.5)[0];

    while (!completed) {
        const connectionIndex = getConnection(connection, temp);
        const newConnection = data[connectionIndex];

        if (!newConnection) {
            completed = true;
            continue;
        }

        process.stdout.write(connection.dataChunk);
        await new Promise(res => setTimeout(res, Math.floor(Math.random() * 100)))

        output += newConnection.dataChunk;
        connection = newConnection;
    }

    process.stdout.write(connection.dataChunk);
    console.log();
    
    return text + output;
}

processInput(input, temperature);
