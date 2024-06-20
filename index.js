const data = require("./model.json");
const { Readable } = require("node:stream");

const input = "Hello";
const temperature = 1; // Max 2, min 1

/*
    * @param {Object} data
    * @param {number} temp
    * @returns {number}
    * @description Get a random connection index.
    * @example
    * getConnection(data, 1);
 */
function getConnection(data, temp) {
    const randomIndex = Math.floor(Math.random() * data.connectionIndexes.length);
    const randomConnection = data.connectionIndexes[randomIndex];

    if (!randomConnection) {
        return null;
    }

    const bias = 1 / temp;

    return Math.random() < bias ? randomConnection.index : null;
}

/*
    * @param {string} text
    * @param {number} temp
    * @returns {Promise<Readable>}
    * @throws {Error}
    * @description Process input text and generate a stream of data.
    * @example
    * processInput("Hello", 1).then((stream) => {
    *     stream.on("data", (chunk) => {
    *         console.log(chunk);
    *     }
    * });
 */
async function processInput(text, temp) {
    if (!data || !Array.isArray(data) || !data.length) {
        throw new Error("Model data is either empty or is not an array.");
    }

    if (!text)
        throw new Error("Input text is empty.");
    if (!temp || typeof temp !== "number" || temp < 1 || temp > 2)
        throw new Error("Temperature must be a number and between 1 and 2.");

    let output = "";
    let completed = false;
    let connection = data.filter((v) => v.dataChunk === text)
        .sort(() => Math.random() - 0.5)[0];

    const stream = new Readable({
        read() {}
    });

    (() => {
        stream.push(connection.dataChunk);

        while (!completed) {
            const connectionIndex = getConnection(connection, temp);
            const newConnection = data[connectionIndex];

            if (!newConnection) {
                completed = true;
                continue;
            }

            stream.push(newConnection.dataChunk);

            output += newConnection.dataChunk;
            connection = newConnection;
        }

        stream.push(null);
    })();
    
    return stream;
}

processInput(input, temperature).then((stream) => {
    stream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    stream.on('end', () => {
        process.stdout.write('\n');
    });
});
