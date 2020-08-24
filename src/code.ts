// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(300,480);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.


//figma.root.setPluginData("themes", "");
//figma.root.setPluginData("savedImgs", '');
//figma.root.setPluginData("savedWorkingTheme", '');


interface BasicPaint {
  name: string;
  paints: Paint[];
}

interface Theme {
  name: string;
  BasicPaints: BasicPaint[];
}

// Load saved themes
let savedThemes = {};
let savedImgs = {};
let savedWorkingTheme = '';
//savedThemes = JSON.parse(TESTDATA);
let savedThemesJSON: string = figma.root.getPluginData("themes");
let savedImgsJSON: string = figma.root.getPluginData("savedImgs");
let savedDataWorkingTheme: string = figma.root.getPluginData("savedWorkingTheme");
if(savedThemesJSON) {
  savedThemes = JSON.parse(savedThemesJSON);
}
if(savedImgsJSON) {
  savedImgs = JSON.parse(savedImgsJSON);
}
// for(let i of savedImgs) {
//   figma.createImage(i);
// }
if(savedDataWorkingTheme) {
  savedWorkingTheme = savedDataWorkingTheme;
}

if(Object.keys(savedThemes).length > 0) {
  figma.ui.postMessage( {type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: savedWorkingTheme} );
}


let stringifyPaintStyle = function(source: PaintStyle): string {
  let result: string = "{";

  result += "\"name\":\"" + source.name + "\",";

  result += "\"paints\":[";
for (let i of source.paints) {
    result += JSON.stringify(i) + ",";
  }
  result = result.slice(0, -1);
  result += "]}";

  return result;
}

let getLocalTheme = async(): Promise<string> => {
  let localPaints: PaintStyle[] = figma.getLocalPaintStyles();
  let result: string = "[";
  for (let i of localPaints) {
    for(let j of i.paints) {
        if(j.type === "IMAGE") {
          var imgHash: string = j.imageHash;
          let image = figma.getImageByHash(imgHash);

          // image.getBytesAsync().then((imgBytes) => {
          //   if(!savedImgs[imgHash]) {
          //     savedImgs[imgHash] = Array.from(imgBytes);
          //     console.log(savedImgs);
          //     // figma.root.setPluginData("savedImgs", JSON.stringify(savedImgs));
              
          //   }
          // });

          let imgBytes = await image.getBytesAsync();
          if(!savedImgs[imgHash]) {
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
}

let applyTheme = function(msg): void {
  let localPaints: PaintStyle[] = figma.getLocalPaintStyles();
    let exist: boolean;
    let tempPaintStyle: PaintStyle;
    for(let i of savedThemes[msg.name]) {
      exist = false;
      for(let j of localPaints) {
        if(i.name === j.name) {
          j.paints = i.paints;
          exist = true;
        }
      }
      if(!exist) {
        tempPaintStyle = figma.createPaintStyle();
        tempPaintStyle.name = i.name;
        tempPaintStyle.paints = i.paints;
      }
    }
    savedWorkingTheme = msg.name;
    figma.root.setPluginData("savedWorkingTheme", savedWorkingTheme);
    figma.ui.postMessage( {type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: savedWorkingTheme} );
}

let saveCurrent = async(msg): Promise<void> => {
  let saving = figma.notify("Saving current color theme...");
  savedThemes[msg.name] = JSON.parse(await getLocalTheme());
  savedWorkingTheme = msg.name;
  figma.root.setPluginData("themes", JSON.stringify(savedThemes));
  figma.root.setPluginData("savedWorkingTheme", savedWorkingTheme);
  figma.ui.postMessage( {type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: savedWorkingTheme} );
  saving.cancel();
  figma.notify("Current color theme saved!", {timeout: 2000});
}

let deleteTheme = function(msg): void {
  delete savedThemes[msg.name];
  figma.root.setPluginData("themes", JSON.stringify(savedThemes));
  figma.ui.postMessage( {type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: savedWorkingTheme} );
}

let importThemes = function(msg): void {
  let source;
  try {
    source = JSON.parse(msg.value);
  } catch(err) {
    figma.notify("Incomplete JSON expression.");
    return;
  }

  try {
    for(let i of Object.keys(source.savedThemes)) {
      savedThemes[i] = source.savedThemes[i];
    }

    for(let i of Object.keys(source.savedImgs)) {  
      let img: Uint8Array = Uint8Array.from(source.savedImgs[i]);
      if(!savedImgs[i]) {   
        savedImgs[i] = source.savedImgs[i];
        figma.createImage(img);
        //console.log("created img");
      }
    }
  } catch(err) {
    figma.notify("Invalid color theme profile.");
    return;
  }
  //let sourceSavedImgs = Uint8Array.from(source.savedImgs);
  //source.savedImgs = sourceSavedImgs;

  
  figma.root.setPluginData("themes", JSON.stringify(savedThemes));
  figma.root.setPluginData("savedImgs", JSON.stringify(savedImgs));
  if(Object.keys(savedThemes).length > 0) {
    figma.ui.postMessage( {type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: savedWorkingTheme} );
  }
  figma.notify("Color theme(s) import complete!", {timeout: 4000});
}


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
