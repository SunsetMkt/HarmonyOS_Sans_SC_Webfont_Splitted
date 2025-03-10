import fs from "fs";
import { fontSplit } from "cn-font-split";

async function split(input, outDir) {
    const inputBuffer = new Uint8Array(fs.readFileSync(input).buffer);

    console.log(`Splitting ${input}...`);

    console.time("node");
    await fontSplit({
        input: inputBuffer,
        outDir: outDir,
    });
    console.timeEnd("node");
}

// For every .ttf in HarmonyOS_Sans_SC folder
for (const file of fs.readdirSync("./HarmonyOS_Sans_SC")) {
    var dirName = file.split(".")[0].split("HarmonyOS_SansSC_")[1];
    if (file.endsWith(".ttf")) {
        await split(
            `./HarmonyOS_Sans_SC/${file}`,
            `./HarmonyOS_Sans_SC_Webfont_Splitted/${dirName}`
        );
    }
}
