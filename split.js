import fs from "fs";
import { fontSplit } from "cn-font-split";

async function split(input, outDir, weight) {
    const inputBuffer = new Uint8Array(fs.readFileSync(input).buffer);

    console.log(`Splitting ${input}...`);

    console.time("node");
    await fontSplit({
        input: inputBuffer, // 输入的字体缓冲区
        outDir: outDir, // 输出目录
        css: {
            // CSS 输出产物配置，一般而言不需要手动配置
            fontFamily: "HarmonyOS Sans SC", // 输出 css 产物的 font-family 名称
            //  fontWeight: '400',           // 字重: 400 (常规)、700(粗体), 详细可见 https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
            //  fontStyle: 'normal',         // 字体样式: normal (常规)、italic (斜体)。可见 https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-style
            fontDisplay: "swap", // 字体显示策略，推荐 swap。可见 https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
            //  localFamily: ['Test Sans'],  // 本地字体族名称。可见 https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face
            // commentUnicodes: false, // 在 CSS 中添加 Unicode 码点注释
            //  compress: true               // 压缩生成的 CSS 产物
        },

        // languageAreas: false, // 是否启用语言区域优化，将同一语言的字符分到一起
        // autoSubset: true,           // 当分包超过指定大小时是否自动拆分
        // fontFeature: true,          // 是否保留字体特性（如 Code 字体的连字、字距调整等）
        // reduceMins: true,           // 是否减少碎片分包，合并小分包以减少请求数，一般不需要修改
        // testHtml: true, // 是否生成测试 HTML 文件
        // reporter: true, // 是否生成 reporter.bin 文件
        // 自定义分包输出的文件名为 6 位短哈希，或者使用自增索引: '[index].[ext]'
        renameOutputFont: `${weight}_[hash:6].[ext]`,
    });
    console.timeEnd("node");
}

// For every .ttf in HarmonyOS_Sans_SC folder
for (const file of fs.readdirSync("./HarmonyOS_Sans_SC")) {
    var dirName = file.split(".")[0].split("HarmonyOS_SansSC_")[1];
    if (file.endsWith(".ttf")) {
        await split(
            `./HarmonyOS_Sans_SC/${file}`,
            `./HarmonyOS_Sans_SC_Webfont_Splitted/${dirName}`,
            dirName
        );
    }
}
