// document.getElementById('create').onclick = () => {
//   const textbox = document.getElementById('count');
//   const count = parseInt(textbox.value, 10);
//   parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
// }

// document.getElementById('cancel').onclick = () => {
//   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
// }
import "../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";


let themes = {};
let imgs = {};
let workingTheme;

document.getElementById("saveCurrent").onclick = () => {
  let themeName = document.getElementById("themeName").value.trim();
  if (themeName.trim() === "") {
    for(let i=0; ; i++) {
      themeName = "Untitled Theme " + i;
      if(!themes[themeName]) {
        break;
      }
    }
  }
  parent.postMessage( { pluginMessage: { type: 'saveCurrent', name: themeName} }, '*');
}

document.getElementById("saveToClipboard").onclick = () => {
  //console.log(imgs[0]);
  //console.log(JSON.stringify(Array.from(imgs[0])));
  document.getElementById("themesJSON").value = JSON.stringify({savedThemes: themes, savedImgs: imgs});
  let source = document.getElementById("themesJSON");
  source.select();
  document.execCommand("copy");
}

document.getElementById("importFromClipboard").onclick = () => {
  let source = document.getElementById("importThemes").value;
  parent.postMessage( { pluginMessage: { type: 'importThemes', value: source} }, '*');
  document.getElementById("importThemes").value = "";
}

let themeBtnOnclick = () => {
  let targetButton = event.target;
  parent.postMessage({ pluginMessage: { type: targetButton.class, name: targetButton.parentElement.id } }, '*');
  //console.log("theme clicked");
  //console.log("theme id: " + event.target.id);
}


let loadThemes = (msg) => {
  let parent = document.getElementById("themes");
  themes = msg.data.pluginMessage.themes;
  imgs = msg.data.pluginMessage.imgs;
  workingTheme = msg.data.pluginMessage.working;

  document.getElementById("savedThemes").innerHTML = "Current Theme: " + workingTheme;
  document.getElementById("themesJSON").value = JSON.stringify({savedThemes: themes, savedImgs: imgs});
   //console.log(themes);

    parent.innerHTML = '';

    let wrap;
    let themeButton;
    let name;
    let delButton;

    for(let i of Object.keys(themes)) {

      wrap = document.createElement("div");
      wrap.id = i;

      themeButton = document.createElement("button");
      themeButton.class = "theme";
      themeButton.onclick = themeBtnOnclick;
      name = document.createTextNode(i);
      themeButton.appendChild(name);

      delButton = document.createElement("button");
      delButton.onclick = themeBtnOnclick;

      if(i != workingTheme){   
        delButton.class = "delete";   
        name = document.createTextNode("Delete");
        
      }else {
        delButton.class = "update";
        name = document.createTextNode("Save Changes");
        
      }

      delButton.appendChild(name);
      wrap.appendChild(themeButton);
      wrap.appendChild(delButton);
      
      parent.appendChild(wrap);
    }
}


onmessage = (msg) => {
  if (msg.data.pluginMessage.type === "loadThemes") {
    loadThemes(msg);    
  }

}