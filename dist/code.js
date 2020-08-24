/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

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
figma.ui.resize(300, 480);
// Load saved themes
let savedThemes = {};
let savedImgs = {};
let savedWorkingTheme = '';
//savedThemes = JSON.parse(TESTDATA);
let savedThemesJSON = figma.root.getPluginData("themes");
let savedImgsJSON = figma.root.getPluginData("savedImgs");
let savedDataWorkingTheme = figma.root.getPluginData("savedWorkingTheme");
if (savedThemesJSON) {
    savedThemes = JSON.parse(savedThemesJSON);
}
if (savedImgsJSON) {
    savedImgs = JSON.parse(savedImgsJSON);
}
// for(let i of savedImgs) {
//   figma.createImage(i);
// }
if (savedDataWorkingTheme) {
    savedWorkingTheme = savedDataWorkingTheme;
}
if (Object.keys(savedThemes).length > 0) {
    figma.ui.postMessage({ type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: savedWorkingTheme });
}
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
    savedWorkingTheme = msg.name;
    figma.root.setPluginData("savedWorkingTheme", savedWorkingTheme);
    figma.ui.postMessage({ type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: savedWorkingTheme });
};
let saveCurrent = (msg) => __awaiter(this, void 0, void 0, function* () {
    let saving = figma.notify("Saving current color theme...");
    savedThemes[msg.name] = JSON.parse(yield getLocalTheme());
    savedWorkingTheme = msg.name;
    figma.root.setPluginData("themes", JSON.stringify(savedThemes));
    figma.root.setPluginData("savedWorkingTheme", savedWorkingTheme);
    figma.ui.postMessage({ type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: savedWorkingTheme });
    saving.cancel();
    figma.notify("Current color theme saved!", { timeout: 2000 });
});
let deleteTheme = function (msg) {
    delete savedThemes[msg.name];
    figma.root.setPluginData("themes", JSON.stringify(savedThemes));
    figma.ui.postMessage({ type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: savedWorkingTheme });
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
    if (Object.keys(savedThemes).length > 0) {
        figma.ui.postMessage({ type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: savedWorkingTheme });
    }
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwrREFBK0QsZ0JBQWdCLEVBQUUsRUFBRTtBQUM5RztBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixxRkFBcUY7QUFDcEg7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUZBQXVGO0FBQ2pIO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUZBQXVGO0FBQ2pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVGQUF1RjtBQUNqSDtBQUNBLGdEQUFnRCxnQkFBZ0I7QUFDaEUsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix1RkFBdUY7QUFDakg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qix1RkFBdUY7QUFDckg7QUFDQSxxREFBcUQsZ0JBQWdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQSwwQkFBMEIsdUJBQXVCLG9CQUFvQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS50c1wiKTtcbiIsIi8vIFRoaXMgcGx1Z2luIHdpbGwgb3BlbiBhIG1vZGFsIHRvIHByb21wdCB0aGUgdXNlciB0byBlbnRlciBhIG51bWJlciwgYW5kXHJcbi8vIGl0IHdpbGwgdGhlbiBjcmVhdGUgdGhhdCBtYW55IHJlY3RhbmdsZXMgb24gdGhlIHNjcmVlbi5cclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG4vLyBUaGlzIGZpbGUgaG9sZHMgdGhlIG1haW4gY29kZSBmb3IgdGhlIHBsdWdpbnMuIEl0IGhhcyBhY2Nlc3MgdG8gdGhlICpkb2N1bWVudCouXHJcbi8vIFlvdSBjYW4gYWNjZXNzIGJyb3dzZXIgQVBJcyBpbiB0aGUgPHNjcmlwdD4gdGFnIGluc2lkZSBcInVpLmh0bWxcIiB3aGljaCBoYXMgYVxyXG4vLyBmdWxsIGJyb3dzZXIgZW52aXJvbm1lbnQgKHNlZSBkb2N1bWVudGF0aW9uKS5cclxuLy8gVGhpcyBzaG93cyB0aGUgSFRNTCBwYWdlIGluIFwidWkuaHRtbFwiLlxyXG5maWdtYS5zaG93VUkoX19odG1sX18pO1xyXG5maWdtYS51aS5yZXNpemUoMzAwLCA0ODApO1xyXG4vLyBMb2FkIHNhdmVkIHRoZW1lc1xyXG5sZXQgc2F2ZWRUaGVtZXMgPSB7fTtcclxubGV0IHNhdmVkSW1ncyA9IHt9O1xyXG5sZXQgc2F2ZWRXb3JraW5nVGhlbWUgPSAnJztcclxuLy9zYXZlZFRoZW1lcyA9IEpTT04ucGFyc2UoVEVTVERBVEEpO1xyXG5sZXQgc2F2ZWRUaGVtZXNKU09OID0gZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKFwidGhlbWVzXCIpO1xyXG5sZXQgc2F2ZWRJbWdzSlNPTiA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShcInNhdmVkSW1nc1wiKTtcclxubGV0IHNhdmVkRGF0YVdvcmtpbmdUaGVtZSA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShcInNhdmVkV29ya2luZ1RoZW1lXCIpO1xyXG5pZiAoc2F2ZWRUaGVtZXNKU09OKSB7XHJcbiAgICBzYXZlZFRoZW1lcyA9IEpTT04ucGFyc2Uoc2F2ZWRUaGVtZXNKU09OKTtcclxufVxyXG5pZiAoc2F2ZWRJbWdzSlNPTikge1xyXG4gICAgc2F2ZWRJbWdzID0gSlNPTi5wYXJzZShzYXZlZEltZ3NKU09OKTtcclxufVxyXG4vLyBmb3IobGV0IGkgb2Ygc2F2ZWRJbWdzKSB7XHJcbi8vICAgZmlnbWEuY3JlYXRlSW1hZ2UoaSk7XHJcbi8vIH1cclxuaWYgKHNhdmVkRGF0YVdvcmtpbmdUaGVtZSkge1xyXG4gICAgc2F2ZWRXb3JraW5nVGhlbWUgPSBzYXZlZERhdGFXb3JraW5nVGhlbWU7XHJcbn1cclxuaWYgKE9iamVjdC5rZXlzKHNhdmVkVGhlbWVzKS5sZW5ndGggPiAwKSB7XHJcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwibG9hZFRoZW1lc1wiLCB0aGVtZXM6IHNhdmVkVGhlbWVzLCBpbWdzOiBzYXZlZEltZ3MsIHdvcmtpbmc6IHNhdmVkV29ya2luZ1RoZW1lIH0pO1xyXG59XHJcbmxldCBzdHJpbmdpZnlQYWludFN0eWxlID0gZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgbGV0IHJlc3VsdCA9IFwie1wiO1xyXG4gICAgcmVzdWx0ICs9IFwiXFxcIm5hbWVcXFwiOlxcXCJcIiArIHNvdXJjZS5uYW1lICsgXCJcXFwiLFwiO1xyXG4gICAgcmVzdWx0ICs9IFwiXFxcInBhaW50c1xcXCI6W1wiO1xyXG4gICAgZm9yIChsZXQgaSBvZiBzb3VyY2UucGFpbnRzKSB7XHJcbiAgICAgICAgcmVzdWx0ICs9IEpTT04uc3RyaW5naWZ5KGkpICsgXCIsXCI7XHJcbiAgICB9XHJcbiAgICByZXN1bHQgPSByZXN1bHQuc2xpY2UoMCwgLTEpO1xyXG4gICAgcmVzdWx0ICs9IFwiXX1cIjtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmxldCBnZXRMb2NhbFRoZW1lID0gKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgbGV0IGxvY2FsUGFpbnRzID0gZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFwiW1wiO1xyXG4gICAgZm9yIChsZXQgaSBvZiBsb2NhbFBhaW50cykge1xyXG4gICAgICAgIGZvciAobGV0IGogb2YgaS5wYWludHMpIHtcclxuICAgICAgICAgICAgaWYgKGoudHlwZSA9PT0gXCJJTUFHRVwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW1nSGFzaCA9IGouaW1hZ2VIYXNoO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlID0gZmlnbWEuZ2V0SW1hZ2VCeUhhc2goaW1nSGFzaCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpbWFnZS5nZXRCeXRlc0FzeW5jKCkudGhlbigoaW1nQnl0ZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgaWYoIXNhdmVkSW1nc1tpbWdIYXNoXSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNhdmVkSW1nc1tpbWdIYXNoXSA9IEFycmF5LmZyb20oaW1nQnl0ZXMpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHNhdmVkSW1ncyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKFwic2F2ZWRJbWdzXCIsIEpTT04uc3RyaW5naWZ5KHNhdmVkSW1ncykpO1xyXG4gICAgICAgICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBpbWdCeXRlcyA9IHlpZWxkIGltYWdlLmdldEJ5dGVzQXN5bmMoKTtcclxuICAgICAgICAgICAgICAgIGlmICghc2F2ZWRJbWdzW2ltZ0hhc2hdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZWRJbWdzW2ltZ0hhc2hdID0gQXJyYXkuZnJvbShpbWdCeXRlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzYXZlZEltZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShcInNhdmVkSW1nc1wiLCBKU09OLnN0cmluZ2lmeShzYXZlZEltZ3MpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQgKz0gc3RyaW5naWZ5UGFpbnRTdHlsZShpKSArIFwiLFwiO1xyXG4gICAgfVxyXG4gICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKFwic2F2ZWRJbWdzXCIsIEpTT04uc3RyaW5naWZ5KHNhdmVkSW1ncykpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcInNhdmVkSW1ncyBudW06IFwiICsgT2JqZWN0LmtleXMoc2F2ZWRJbWdzKS5sZW5ndGgpO1xyXG4gICAgcmVzdWx0ID0gcmVzdWx0LnNsaWNlKDAsIC0xKTtcclxuICAgIHJlc3VsdCArPSBcIl1cIjtcclxuICAgIC8vZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKG5hbWUsIHJlc3VsdCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59KTtcclxubGV0IGFwcGx5VGhlbWUgPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICBsZXQgbG9jYWxQYWludHMgPSBmaWdtYS5nZXRMb2NhbFBhaW50U3R5bGVzKCk7XHJcbiAgICBsZXQgZXhpc3Q7XHJcbiAgICBsZXQgdGVtcFBhaW50U3R5bGU7XHJcbiAgICBmb3IgKGxldCBpIG9mIHNhdmVkVGhlbWVzW21zZy5uYW1lXSkge1xyXG4gICAgICAgIGV4aXN0ID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaiBvZiBsb2NhbFBhaW50cykge1xyXG4gICAgICAgICAgICBpZiAoaS5uYW1lID09PSBqLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGoucGFpbnRzID0gaS5wYWludHM7XHJcbiAgICAgICAgICAgICAgICBleGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFleGlzdCkge1xyXG4gICAgICAgICAgICB0ZW1wUGFpbnRTdHlsZSA9IGZpZ21hLmNyZWF0ZVBhaW50U3R5bGUoKTtcclxuICAgICAgICAgICAgdGVtcFBhaW50U3R5bGUubmFtZSA9IGkubmFtZTtcclxuICAgICAgICAgICAgdGVtcFBhaW50U3R5bGUucGFpbnRzID0gaS5wYWludHM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2F2ZWRXb3JraW5nVGhlbWUgPSBtc2cubmFtZTtcclxuICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShcInNhdmVkV29ya2luZ1RoZW1lXCIsIHNhdmVkV29ya2luZ1RoZW1lKTtcclxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJsb2FkVGhlbWVzXCIsIHRoZW1lczogc2F2ZWRUaGVtZXMsIGltZ3M6IHNhdmVkSW1ncywgd29ya2luZzogc2F2ZWRXb3JraW5nVGhlbWUgfSk7XHJcbn07XHJcbmxldCBzYXZlQ3VycmVudCA9IChtc2cpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGxldCBzYXZpbmcgPSBmaWdtYS5ub3RpZnkoXCJTYXZpbmcgY3VycmVudCBjb2xvciB0aGVtZS4uLlwiKTtcclxuICAgIHNhdmVkVGhlbWVzW21zZy5uYW1lXSA9IEpTT04ucGFyc2UoeWllbGQgZ2V0TG9jYWxUaGVtZSgpKTtcclxuICAgIHNhdmVkV29ya2luZ1RoZW1lID0gbXNnLm5hbWU7XHJcbiAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoXCJ0aGVtZXNcIiwgSlNPTi5zdHJpbmdpZnkoc2F2ZWRUaGVtZXMpKTtcclxuICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShcInNhdmVkV29ya2luZ1RoZW1lXCIsIHNhdmVkV29ya2luZ1RoZW1lKTtcclxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJsb2FkVGhlbWVzXCIsIHRoZW1lczogc2F2ZWRUaGVtZXMsIGltZ3M6IHNhdmVkSW1ncywgd29ya2luZzogc2F2ZWRXb3JraW5nVGhlbWUgfSk7XHJcbiAgICBzYXZpbmcuY2FuY2VsKCk7XHJcbiAgICBmaWdtYS5ub3RpZnkoXCJDdXJyZW50IGNvbG9yIHRoZW1lIHNhdmVkIVwiLCB7IHRpbWVvdXQ6IDIwMDAgfSk7XHJcbn0pO1xyXG5sZXQgZGVsZXRlVGhlbWUgPSBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICBkZWxldGUgc2F2ZWRUaGVtZXNbbXNnLm5hbWVdO1xyXG4gICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKFwidGhlbWVzXCIsIEpTT04uc3RyaW5naWZ5KHNhdmVkVGhlbWVzKSk7XHJcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwibG9hZFRoZW1lc1wiLCB0aGVtZXM6IHNhdmVkVGhlbWVzLCBpbWdzOiBzYXZlZEltZ3MsIHdvcmtpbmc6IHNhdmVkV29ya2luZ1RoZW1lIH0pO1xyXG59O1xyXG5sZXQgaW1wb3J0VGhlbWVzID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgbGV0IHNvdXJjZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgc291cmNlID0gSlNPTi5wYXJzZShtc2cudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIkluY29tcGxldGUgSlNPTiBleHByZXNzaW9uLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGZvciAobGV0IGkgb2YgT2JqZWN0LmtleXMoc291cmNlLnNhdmVkVGhlbWVzKSkge1xyXG4gICAgICAgICAgICBzYXZlZFRoZW1lc1tpXSA9IHNvdXJjZS5zYXZlZFRoZW1lc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBvZiBPYmplY3Qua2V5cyhzb3VyY2Uuc2F2ZWRJbWdzKSkge1xyXG4gICAgICAgICAgICBsZXQgaW1nID0gVWludDhBcnJheS5mcm9tKHNvdXJjZS5zYXZlZEltZ3NbaV0pO1xyXG4gICAgICAgICAgICBpZiAoIXNhdmVkSW1nc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgc2F2ZWRJbWdzW2ldID0gc291cmNlLnNhdmVkSW1nc1tpXTtcclxuICAgICAgICAgICAgICAgIGZpZ21hLmNyZWF0ZUltYWdlKGltZyk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiY3JlYXRlZCBpbWdcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgZmlnbWEubm90aWZ5KFwiSW52YWxpZCBjb2xvciB0aGVtZSBwcm9maWxlLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvL2xldCBzb3VyY2VTYXZlZEltZ3MgPSBVaW50OEFycmF5LmZyb20oc291cmNlLnNhdmVkSW1ncyk7XHJcbiAgICAvL3NvdXJjZS5zYXZlZEltZ3MgPSBzb3VyY2VTYXZlZEltZ3M7XHJcbiAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoXCJ0aGVtZXNcIiwgSlNPTi5zdHJpbmdpZnkoc2F2ZWRUaGVtZXMpKTtcclxuICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShcInNhdmVkSW1nc1wiLCBKU09OLnN0cmluZ2lmeShzYXZlZEltZ3MpKTtcclxuICAgIGlmIChPYmplY3Qua2V5cyhzYXZlZFRoZW1lcykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJsb2FkVGhlbWVzXCIsIHRoZW1lczogc2F2ZWRUaGVtZXMsIGltZ3M6IHNhdmVkSW1ncywgd29ya2luZzogc2F2ZWRXb3JraW5nVGhlbWUgfSk7XHJcbiAgICB9XHJcbiAgICBmaWdtYS5ub3RpZnkoXCJDb2xvciB0aGVtZShzKSBpbXBvcnQgY29tcGxldGUhXCIsIHsgdGltZW91dDogNDAwMCB9KTtcclxufTtcclxuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcclxuICAgIC8vIE9uZSB3YXkgb2YgZGlzdGluZ3Vpc2hpbmcgYmV0d2VlbiBkaWZmZXJlbnQgdHlwZXMgb2YgbWVzc2FnZXMgc2VudCBmcm9tXHJcbiAgICAvLyB5b3VyIEhUTUwgcGFnZSBpcyB0byB1c2UgYW4gb2JqZWN0IHdpdGggYSBcInR5cGVcIiBwcm9wZXJ0eSBsaWtlIHRoaXMuXHJcbiAgICAvLyBpZiAobXNnLnR5cGUgPT09ICdjcmVhdGUtcmVjdGFuZ2xlcycpIHtcclxuICAgIC8vICAgY29uc3Qgbm9kZXM6IFNjZW5lTm9kZVtdID0gW107XHJcbiAgICAvLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXNnLmNvdW50OyBpKyspIHtcclxuICAgIC8vICAgICBjb25zdCByZWN0ID0gZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKCk7XHJcbiAgICAvLyAgICAgcmVjdC54ID0gaSAqIDE1MDtcclxuICAgIC8vICAgICByZWN0LmZpbGxzID0gW3t0eXBlOiAnU09MSUQnLCBjb2xvcjoge3I6IDEsIGc6IDAuNSwgYjogMH19XTtcclxuICAgIC8vICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChyZWN0KTtcclxuICAgIC8vICAgICBub2Rlcy5wdXNoKHJlY3QpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IG5vZGVzO1xyXG4gICAgLy8gICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpO1xyXG4gICAgLy8gfVxyXG4gICAgaWYgKG1zZy50eXBlID09PSAndGhlbWUnKSB7XHJcbiAgICAgICAgYXBwbHlUaGVtZShtc2cpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09ICdzYXZlQ3VycmVudCcpIHtcclxuICAgICAgICBzYXZlQ3VycmVudChtc2cpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09IFwiZGVsZXRlXCIpIHtcclxuICAgICAgICBkZWxldGVUaGVtZShtc2cpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09IFwiaW1wb3J0VGhlbWVzXCIpIHtcclxuICAgICAgICBpbXBvcnRUaGVtZXMobXNnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG1zZy50eXBlID09PSBcInVwZGF0ZVwiKSB7XHJcbiAgICAgICAgc2F2ZUN1cnJlbnQobXNnKTtcclxuICAgIH1cclxuICAgIC8vIE1ha2Ugc3VyZSB0byBjbG9zZSB0aGUgcGx1Z2luIHdoZW4geW91J3JlIGRvbmUuIE90aGVyd2lzZSB0aGUgcGx1Z2luIHdpbGxcclxuICAgIC8vIGtlZXAgcnVubmluZywgd2hpY2ggc2hvd3MgdGhlIGNhbmNlbCBidXR0b24gYXQgdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuLlxyXG4gICAgLy9maWdtYS5jbG9zZVBsdWdpbigpO1xyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9