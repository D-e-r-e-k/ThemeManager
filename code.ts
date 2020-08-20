// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

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

let getLocalPaintStyles = function(name: string): void {
  let localPaints: PaintStyle[] = figma.getLocalPaintStyles();
  let result: string = "[";
  for (let i of localPaints) {
    result += stringifyPaintStyle(i) + ",";
  }
  result = result.slice(0, -1);
  result += "]";
  console.log(result);
  //figma.root.setPluginData(name, result);
}

// Hard coded themes.
const TOPOSLIGHT = JSON.parse(
  '[{"name":"backgroundColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":1,"g":1,"b":1}}]},{"name":"primaryColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.1411764770746231,"g":0.1411764770746231,"b":0.1411764770746231}}]},{"name":"accentColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.3450980484485626,"g":0.33725491166114807,"b":0.8392156958580017}}]},{"name":"unselectedColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.9411764740943909,"g":0.9411764740943909,"b":0.9411764740943909}}]},{"name":"lightColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.9411764740943909,"g":0.9411764740943909,"b":0.9411764740943909}}]},{"name":"bottomBarColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":1,"g":1,"b":1}}]},{"name":"dialogBackgroundColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":1,"g":1,"b":1}}]},{"name":"cardColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":1,"g":1,"b":1}}]},{"name":"textInputFillColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.9411764740943909,"g":0.9411764740943909,"b":0.9411764740943909}}]},{"name":"textColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.1411764770746231,"g":0.1411764770746231,"b":0.1411764770746231}}]},{"name":"primaryTextColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":1,"g":1,"b":1}}]},{"name":"accentTextColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":1,"g":1,"b":1}}]},{"name":"descriptiveTextColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.5568627715110779,"g":0.5568627715110779,"b":0.5764706134796143}}]},{"name":"placeholderTextColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.6823529601097107,"g":0.6823529601097107,"b":0.6392157077789307}}]},{"name":"KCardBorder","paints":[{"type":"SOLID","visible":true,"opacity":0.05000000074505806,"blendMode":"NORMAL","color":{"r":0,"g":0,"b":0}}]}]'
);

const TOPOSDARK = JSON.parse(
  '[{"name":"backgroundColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.08235294371843338,"g":0.08235294371843338,"b":0.08235294371843338}}]},{"name":"primaryColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.20392157137393951,"g":0.20392157137393951,"b":0.20392157137393951}}]},{"name":"accentColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.3686274588108063,"g":0.3607843220233917,"b":0.9019607901573181}}]},{"name":"unselectedColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.15294118225574493,"g":0.15294118225574493,"b":0.15294118225574493}}]},{"name":"lightColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.15294118225574493,"g":0.15294118225574493,"b":0.15294118225574493}}]},{"name":"bottomBarColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.1411764770746231,"g":0.1411764770746231,"b":0.1411764770746231}}]},{"name":"dialogBackgroundColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.125490203499794,"g":0.125490203499794,"b":0.125490203499794}}]},{"name":"cardColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.125490203499794,"g":0.125490203499794,"b":0.125490203499794}}]},{"name":"textInputFillColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.1568627506494522,"g":0.1568627506494522,"b":0.1568627506494522}}]},{"name":"textColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.7333333492279053,"g":0.7333333492279053,"b":0.7333333492279053}}]},{"name":"primaryTextColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.7333333492279053,"g":0.7333333492279053,"b":0.7333333492279053}}]},{"name":"accentTextColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.9411764740943909,"g":0.9411764740943909,"b":0.9411764740943909}}]},{"name":"descriptiveTextColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.4941176474094391,"g":0.4941176474094391,"b":0.5137255191802979}}]},{"name":"placeholderTextColor","paints":[{"type":"SOLID","visible":true,"opacity":1,"blendMode":"NORMAL","color":{"r":0.45490196347236633,"g":0.45490196347236633,"b":0.45490196347236633}}]},{"name":"KCardBorder","paints":[{"type":"SOLID","visible":true,"opacity":0.05000000074505806,"blendMode":"NORMAL","color":{"r":0,"g":0,"b":0}}]}]'
);

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

  if (msg.type === 'saveCurrent') {
    getLocalPaintStyles(figma.root.id);
    console.log(TOPOSDARK);
    
  }

  if (msg.type === 'dark') {
    console.log("dark mode called");
    let localPaints: PaintStyle[] = figma.getLocalPaintStyles();
    for(let i of localPaints) {
      for(let j of TOPOSDARK) {
        if(i.name === j.name) {
          i.paints = j.paints;
        }
      }
    }
  }

  if (msg.type === 'light') {
    figma.ui.postMessage({type: "test"});
    console.log("light mode called");
    let localPaints: PaintStyle[] = figma.getLocalPaintStyles();
    for(let i of localPaints) {
      for(let j of TOPOSLIGHT) {
        if(i.name === j.name) {
          i.paints = j.paints;
        }
      }
    }
  }
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  //figma.closePlugin();
};
