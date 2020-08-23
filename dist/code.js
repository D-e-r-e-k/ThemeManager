// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.root.setPluginData("themes", "");
figma.root.setPluginData("savedImgs", '');
figma.root.setPluginData("workingTheme", '');
// Load saved themes
let savedThemes = {};
let savedImgs = {};
let workingTheme = '';
//savedThemes = JSON.parse(TESTDATA);
let savedThemesJSON = figma.root.getPluginData("themes");
let savedImgsJSON = figma.root.getPluginData("savedImgs");
let savedWorkingTheme = figma.root.getPluginData("workingTheme");
if (savedThemesJSON) {
    savedThemes = JSON.parse(savedThemesJSON);
}
if (savedImgsJSON) {
    savedImgs = JSON.parse(savedImgsJSON);
}
// for(let i of savedImgs) {
//   figma.createImage(i);
// }
if (savedWorkingTheme) {
    workingTheme = savedWorkingTheme;
}
figma.ui.postMessage({ type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: workingTheme });
let stringifyPaintStyle = function (source) {
    let result = "{";
    result += "\"name\":\"" + source.name + "\",";
    result += "\"paints\":[";
    for (let i of source.paints) {
        result += JSON.stringify(i) + ",";
    }
    result = result.slice(0, -1);
    result += "]}";
    return result;
};
let getLocalTheme = () => __awaiter(this, void 0, void 0, function* () {
    let localPaints = figma.getLocalPaintStyles();
    let result = "[";
    for (let i of localPaints) {
        for (let j of i.paints) {
            if (j.type === "IMAGE") {
                var imgHash = j.imageHash;
                let image = figma.getImageByHash(imgHash);
                // image.getBytesAsync().then((imgBytes) => {
                //   if(!savedImgs[imgHash]) {
                //     savedImgs[imgHash] = Array.from(imgBytes);
                //     console.log(savedImgs);
                //     // figma.root.setPluginData("savedImgs", JSON.stringify(savedImgs));
                //   }
                // });
                let imgBytes = yield image.getBytesAsync();
                if (!savedImgs[imgHash]) {
                    savedImgs[imgHash] = Array.from(imgBytes);
                    //console.log(savedImgs);
                    // figma.root.setPluginData("savedImgs", JSON.stringify(savedImgs));
                }
            }
        }
        result += stringifyPaintStyle(i) + ",";
    }
    figma.root.setPluginData("savedImgs", JSON.stringify(savedImgs));
    //console.log("savedImgs num: " + Object.keys(savedImgs).length);
    result = result.slice(0, -1);
    result += "]";
    //figma.root.setPluginData(name, result);
    return result;
});
let applyTheme = function (msg) {
    let localPaints = figma.getLocalPaintStyles();
    let exist;
    let tempPaintStyle;
    for (let i of savedThemes[msg.name]) {
        exist = false;
        for (let j of localPaints) {
            if (i.name === j.name) {
                j.paints = i.paints;
                exist = true;
            }
        }
        if (!exist) {
            tempPaintStyle = figma.createPaintStyle();
            tempPaintStyle.name = i.name;
            tempPaintStyle.paints = i.paints;
        }
    }
    workingTheme = msg.name;
    figma.root.setPluginData("workingTheme", workingTheme);
    figma.ui.postMessage({ type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: workingTheme });
};
let saveCurrent = (msg) => __awaiter(this, void 0, void 0, function* () {
    let saving = figma.notify("Saving current color theme...");
    savedThemes[msg.name] = JSON.parse(yield getLocalTheme());
    workingTheme = msg.name;
    figma.root.setPluginData("themes", JSON.stringify(savedThemes));
    figma.root.setPluginData("workingTheme", workingTheme);
    figma.ui.postMessage({ type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: workingTheme });
    saving.cancel();
    figma.notify("Current color theme saved!", { timeout: 2000 });
});
let deleteTheme = function (msg) {
    delete savedThemes[msg.name];
    figma.root.setPluginData("themes", JSON.stringify(savedThemes));
    figma.ui.postMessage({ type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: workingTheme });
};
let importThemes = function (msg) {
    let source;
    try {
        source = JSON.parse(msg.value);
    }
    catch (err) {
        figma.notify("Incomplete JSON expression.");
        return;
    }
    try {
        for (let i of Object.keys(source.savedThemes)) {
            savedThemes[i] = source.savedThemes[i];
        }
        for (let i of Object.keys(source.savedImgs)) {
            let img = Uint8Array.from(source.savedImgs[i]);
            if (!savedImgs[i]) {
                savedImgs[i] = source.savedImgs[i];
                figma.createImage(img);
                //console.log("created img");
            }
        }
    }
    catch (err) {
        figma.notify("Invalid color theme profile.");
        return;
    }
    //let sourceSavedImgs = Uint8Array.from(source.savedImgs);
    //source.savedImgs = sourceSavedImgs;
    figma.root.setPluginData("themes", JSON.stringify(savedThemes));
    figma.root.setPluginData("savedImgs", JSON.stringify(savedImgs));
    figma.ui.postMessage({ type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: workingTheme });
    figma.notify("Color theme(s) import complete!", { timeout: 4000 });
};
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    // if (msg.type === 'create-rectangles') {
    //   const nodes: SceneNode[] = [];
    //   for (let i = 0; i < msg.count; i++) {
    //     const rect = figma.createRectangle();
    //     rect.x = i * 150;
    //     rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //     figma.currentPage.appendChild(rect);
    //     nodes.push(rect);
    //   }
    //   figma.currentPage.selection = nodes;
    //   figma.viewport.scrollAndZoomIntoView(nodes);
    // }
    if (msg.type === 'theme') {
        applyTheme(msg);
    }
    else if (msg.type === 'saveCurrent') {
        saveCurrent(msg);
    }
    else if (msg.type === "delete") {
        deleteTheme(msg);
    }
    else if (msg.type === "importThemes") {
        importThemes(msg);
    }
    else if (msg.type === "update") {
        saveCurrent(msg);
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    //figma.closePlugin();
};
