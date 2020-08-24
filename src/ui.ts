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

let saveCurrentHandler = () => {
  let themeName = document.getElementById("themeName").value.trim();
  if (themeName.trim() === "") {
    for(let i=0; ; i++) {
      themeName = "Untitled Theme " + i;
      if(!themes[themeName]) {
        break;
      }
    }
  }
  document.getElementById("themeName").value = "";
  parent.postMessage( { pluginMessage: { type: 'saveCurrent', name: themeName} }, '*');
  return false;
}

document.getElementById("saveCurrent").onclick =  saveCurrentHandler;
document.getElementById("themeNameForm").onsubmit = saveCurrentHandler;

document.getElementById("saveToClipboard").onclick = () => {
  //console.log(imgs[0]);
  //console.log(JSON.stringify(Array.from(imgs[0])));
  document.getElementById("themesJSON").value = JSON.stringify({savedThemes: themes, savedImgs: imgs});
  let source = document.getElementById("themesJSON");
  source.select();
  document.execCommand("copy");
}

let importFromClipboardHandler = () => {
  let source = document.getElementById("importThemes").value;
  parent.postMessage( { pluginMessage: { type: 'importThemes', value: source} }, '*');
  document.getElementById("importThemes").value = "";
  return false;
}

document.getElementById("importFromClipboard").onclick = importFromClipboardHandler;
document.getElementById("importThemesForm").onsubmit = importFromClipboardHandler;

let themeBtnOnclick = () => {
  let targetButton = event.target;
  parent.postMessage({ pluginMessage: { type: "theme", name: targetButton.parentElement.id } }, '*');
  //console.log("theme clicked: " + targetButton.parentElement.id);
  //console.log("theme id: " + event.target.id);
}

let delBtnOnclick = () => {
    let targetButton = event.target;
    parent.postMessage({ pluginMessage: { type: "delete", name: targetButton.parentElement.id } }, '*');
    //console.log("del: " + targetButton.parentElement.id );
    //console.log("theme id: " + event.target.id);
}

let updateBtnOnclick = () => {
    let targetButton = event.target;
    parent.postMessage({ pluginMessage: { type: "update", name: targetButton.parentElement.id } }, '*');
    //console.log("theme clicked");
    //console.log("theme id: " + event.target.id);
}

let loadThemes = (msg) => {
  let parent = document.getElementById("themes");
  themes = msg.data.pluginMessage.themes;
  imgs = msg.data.pluginMessage.imgs;
  workingTheme = msg.data.pluginMessage.working;

  //document.getElementById("savedThemes").innerHTML = "Current Theme: " + workingTheme;
  document.getElementById("themesJSON").value = JSON.stringify({savedThemes: themes, savedImgs: imgs});
   //console.log(themes);

    parent.innerHTML = '';

    let wrap;
    let themeButton;
    let name;
    let delButton;
    let comStyle = "padding: 8px 16px; display: flex; flex-direction:row; align-items: center; justify-content: space-between;";

    for(let i of Object.keys(themes)) {

      wrap = document.createElement("div");
      wrap.id = i;
      wrap.setAttribute("class", "themeDiv");

      themeButton = document.createElement("p");
      //themeButton.setAttribute('class', 'button button--tertiary');
      themeButton.setAttribute("style", "cursor: pointer; width: 200px; margin: 0px; font-size: 13.28px; overflow: hidden; text-overflow: ellipsis;");
      themeButton.onclick = themeBtnOnclick;
      name = document.createTextNode(i);
      themeButton.appendChild(name);

      delButton = document.createElement("div");
      delButton.setAttribute("id", i);
      let innerBtn = document.createElement("div");
      
      

      wrap.setAttribute("style", comStyle);

      if(i != workingTheme){ 
        delButton.setAttribute('class', 'icon-button');
        innerBtn.setAttribute("class", "icon icon--trash");
        delButton.onclick = delBtnOnclick;
        //delButton.type = "delete";   
        name = document.createTextNode("Delete");
        
      }else {
        delButton.setAttribute('class', 'icon-button');
        innerBtn.setAttribute("class", "icon icon--swap");
        //delButton.type = "update";
        delButton.onclick = updateBtnOnclick;
        //name = document.createTextNode("Save Changes");
        wrap.setAttribute("style", comStyle + "background-color: #DAEBF7;");
      }

      delButton.appendChild(innerBtn);
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