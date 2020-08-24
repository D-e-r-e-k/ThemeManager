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

// This plugin is created to manage multiple color themes in one Figma design file. Enables save and switch between different color palettes. Good for developing design systems, projects require multiple color themes (like dark mode and light mode), and realizing your color ambitious.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
figma.ui.resize(300, 480);
// Load saved themes
let savedThemes = {};
let savedImgs = {};
let savedWorkingTheme = '';
let savedThemesJSON = figma.root.getPluginData("themes");
let savedImgsJSON = figma.root.getPluginData("savedImgs");
let savedDataWorkingTheme = figma.root.getPluginData("savedWorkingTheme");
if (savedThemesJSON) {
    savedThemes = JSON.parse(savedThemesJSON);
}
if (savedImgsJSON) {
    savedImgs = JSON.parse(savedImgsJSON);
}
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
                let imgBytes = yield image.getBytesAsync();
                if (!savedImgs[imgHash]) {
                    savedImgs[imgHash] = Array.from(imgBytes);
                }
            }
        }
        result += stringifyPaintStyle(i) + ",";
    }
    figma.root.setPluginData("savedImgs", JSON.stringify(savedImgs));
    result = result.slice(0, -1);
    result += "]";
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
            }
        }
    }
    catch (err) {
        figma.notify("Invalid color theme profile.");
        return;
    }
    figma.root.setPluginData("themes", JSON.stringify(savedThemes));
    figma.root.setPluginData("savedImgs", JSON.stringify(savedImgs));
    if (Object.keys(savedThemes).length > 0) {
        figma.ui.postMessage({ type: "loadThemes", themes: savedThemes, imgs: savedImgs, working: savedWorkingTheme });
    }
    figma.notify("Color theme(s) import complete!", { timeout: 4000 });
};
figma.ui.onmessage = msg => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQSwyQkFBMkIsK0RBQStELGdCQUFnQixFQUFFLEVBQUU7QUFDOUc7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IscUZBQXFGO0FBQ3BIO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix1RkFBdUY7QUFDakg7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix1RkFBdUY7QUFDakg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUZBQXVGO0FBQ2pIO0FBQ0EsZ0RBQWdELGdCQUFnQjtBQUNoRSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVGQUF1RjtBQUNqSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHVGQUF1RjtBQUNySDtBQUNBLHFEQUFxRCxnQkFBZ0I7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiLy8gVGhpcyBwbHVnaW4gaXMgY3JlYXRlZCB0byBtYW5hZ2UgbXVsdGlwbGUgY29sb3IgdGhlbWVzIGluIG9uZSBGaWdtYSBkZXNpZ24gZmlsZS4gRW5hYmxlcyBzYXZlIGFuZCBzd2l0Y2ggYmV0d2VlbiBkaWZmZXJlbnQgY29sb3IgcGFsZXR0ZXMuIEdvb2QgZm9yIGRldmVsb3BpbmcgZGVzaWduIHN5c3RlbXMsIHByb2plY3RzIHJlcXVpcmUgbXVsdGlwbGUgY29sb3IgdGhlbWVzIChsaWtlIGRhcmsgbW9kZSBhbmQgbGlnaHQgbW9kZSksIGFuZCByZWFsaXppbmcgeW91ciBjb2xvciBhbWJpdGlvdXMuXHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuLy8gVGhpcyBzaG93cyB0aGUgSFRNTCBwYWdlIGluIFwidWkuaHRtbFwiLlxyXG5maWdtYS5zaG93VUkoX19odG1sX18pO1xyXG5maWdtYS51aS5yZXNpemUoMzAwLCA0ODApO1xyXG4vLyBMb2FkIHNhdmVkIHRoZW1lc1xyXG5sZXQgc2F2ZWRUaGVtZXMgPSB7fTtcclxubGV0IHNhdmVkSW1ncyA9IHt9O1xyXG5sZXQgc2F2ZWRXb3JraW5nVGhlbWUgPSAnJztcclxubGV0IHNhdmVkVGhlbWVzSlNPTiA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShcInRoZW1lc1wiKTtcclxubGV0IHNhdmVkSW1nc0pTT04gPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoXCJzYXZlZEltZ3NcIik7XHJcbmxldCBzYXZlZERhdGFXb3JraW5nVGhlbWUgPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoXCJzYXZlZFdvcmtpbmdUaGVtZVwiKTtcclxuaWYgKHNhdmVkVGhlbWVzSlNPTikge1xyXG4gICAgc2F2ZWRUaGVtZXMgPSBKU09OLnBhcnNlKHNhdmVkVGhlbWVzSlNPTik7XHJcbn1cclxuaWYgKHNhdmVkSW1nc0pTT04pIHtcclxuICAgIHNhdmVkSW1ncyA9IEpTT04ucGFyc2Uoc2F2ZWRJbWdzSlNPTik7XHJcbn1cclxuaWYgKHNhdmVkRGF0YVdvcmtpbmdUaGVtZSkge1xyXG4gICAgc2F2ZWRXb3JraW5nVGhlbWUgPSBzYXZlZERhdGFXb3JraW5nVGhlbWU7XHJcbn1cclxuaWYgKE9iamVjdC5rZXlzKHNhdmVkVGhlbWVzKS5sZW5ndGggPiAwKSB7XHJcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwibG9hZFRoZW1lc1wiLCB0aGVtZXM6IHNhdmVkVGhlbWVzLCBpbWdzOiBzYXZlZEltZ3MsIHdvcmtpbmc6IHNhdmVkV29ya2luZ1RoZW1lIH0pO1xyXG59XHJcbmxldCBzdHJpbmdpZnlQYWludFN0eWxlID0gZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgbGV0IHJlc3VsdCA9IFwie1wiO1xyXG4gICAgcmVzdWx0ICs9IFwiXFxcIm5hbWVcXFwiOlxcXCJcIiArIHNvdXJjZS5uYW1lICsgXCJcXFwiLFwiO1xyXG4gICAgcmVzdWx0ICs9IFwiXFxcInBhaW50c1xcXCI6W1wiO1xyXG4gICAgZm9yIChsZXQgaSBvZiBzb3VyY2UucGFpbnRzKSB7XHJcbiAgICAgICAgcmVzdWx0ICs9IEpTT04uc3RyaW5naWZ5KGkpICsgXCIsXCI7XHJcbiAgICB9XHJcbiAgICByZXN1bHQgPSByZXN1bHQuc2xpY2UoMCwgLTEpO1xyXG4gICAgcmVzdWx0ICs9IFwiXX1cIjtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmxldCBnZXRMb2NhbFRoZW1lID0gKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgbGV0IGxvY2FsUGFpbnRzID0gZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpO1xyXG4gICAgbGV0IHJlc3VsdCA9IFwiW1wiO1xyXG4gICAgZm9yIChsZXQgaSBvZiBsb2NhbFBhaW50cykge1xyXG4gICAgICAgIGZvciAobGV0IGogb2YgaS5wYWludHMpIHtcclxuICAgICAgICAgICAgaWYgKGoudHlwZSA9PT0gXCJJTUFHRVwiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW1nSGFzaCA9IGouaW1hZ2VIYXNoO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlID0gZmlnbWEuZ2V0SW1hZ2VCeUhhc2goaW1nSGFzaCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1nQnl0ZXMgPSB5aWVsZCBpbWFnZS5nZXRCeXRlc0FzeW5jKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNhdmVkSW1nc1tpbWdIYXNoXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNhdmVkSW1nc1tpbWdIYXNoXSA9IEFycmF5LmZyb20oaW1nQnl0ZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdCArPSBzdHJpbmdpZnlQYWludFN0eWxlKGkpICsgXCIsXCI7XHJcbiAgICB9XHJcbiAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoXCJzYXZlZEltZ3NcIiwgSlNPTi5zdHJpbmdpZnkoc2F2ZWRJbWdzKSk7XHJcbiAgICByZXN1bHQgPSByZXN1bHQuc2xpY2UoMCwgLTEpO1xyXG4gICAgcmVzdWx0ICs9IFwiXVwiO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufSk7XHJcbmxldCBhcHBseVRoZW1lID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgbGV0IGxvY2FsUGFpbnRzID0gZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpO1xyXG4gICAgbGV0IGV4aXN0O1xyXG4gICAgbGV0IHRlbXBQYWludFN0eWxlO1xyXG4gICAgZm9yIChsZXQgaSBvZiBzYXZlZFRoZW1lc1ttc2cubmFtZV0pIHtcclxuICAgICAgICBleGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGogb2YgbG9jYWxQYWludHMpIHtcclxuICAgICAgICAgICAgaWYgKGkubmFtZSA9PT0gai5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBqLnBhaW50cyA9IGkucGFpbnRzO1xyXG4gICAgICAgICAgICAgICAgZXhpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZXhpc3QpIHtcclxuICAgICAgICAgICAgdGVtcFBhaW50U3R5bGUgPSBmaWdtYS5jcmVhdGVQYWludFN0eWxlKCk7XHJcbiAgICAgICAgICAgIHRlbXBQYWludFN0eWxlLm5hbWUgPSBpLm5hbWU7XHJcbiAgICAgICAgICAgIHRlbXBQYWludFN0eWxlLnBhaW50cyA9IGkucGFpbnRzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNhdmVkV29ya2luZ1RoZW1lID0gbXNnLm5hbWU7XHJcbiAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoXCJzYXZlZFdvcmtpbmdUaGVtZVwiLCBzYXZlZFdvcmtpbmdUaGVtZSk7XHJcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwibG9hZFRoZW1lc1wiLCB0aGVtZXM6IHNhdmVkVGhlbWVzLCBpbWdzOiBzYXZlZEltZ3MsIHdvcmtpbmc6IHNhdmVkV29ya2luZ1RoZW1lIH0pO1xyXG59O1xyXG5sZXQgc2F2ZUN1cnJlbnQgPSAobXNnKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBsZXQgc2F2aW5nID0gZmlnbWEubm90aWZ5KFwiU2F2aW5nIGN1cnJlbnQgY29sb3IgdGhlbWUuLi5cIik7XHJcbiAgICBzYXZlZFRoZW1lc1ttc2cubmFtZV0gPSBKU09OLnBhcnNlKHlpZWxkIGdldExvY2FsVGhlbWUoKSk7XHJcbiAgICBzYXZlZFdvcmtpbmdUaGVtZSA9IG1zZy5uYW1lO1xyXG4gICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKFwidGhlbWVzXCIsIEpTT04uc3RyaW5naWZ5KHNhdmVkVGhlbWVzKSk7XHJcbiAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoXCJzYXZlZFdvcmtpbmdUaGVtZVwiLCBzYXZlZFdvcmtpbmdUaGVtZSk7XHJcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwibG9hZFRoZW1lc1wiLCB0aGVtZXM6IHNhdmVkVGhlbWVzLCBpbWdzOiBzYXZlZEltZ3MsIHdvcmtpbmc6IHNhdmVkV29ya2luZ1RoZW1lIH0pO1xyXG4gICAgc2F2aW5nLmNhbmNlbCgpO1xyXG4gICAgZmlnbWEubm90aWZ5KFwiQ3VycmVudCBjb2xvciB0aGVtZSBzYXZlZCFcIiwgeyB0aW1lb3V0OiAyMDAwIH0pO1xyXG59KTtcclxubGV0IGRlbGV0ZVRoZW1lID0gZnVuY3Rpb24gKG1zZykge1xyXG4gICAgZGVsZXRlIHNhdmVkVGhlbWVzW21zZy5uYW1lXTtcclxuICAgIGZpZ21hLnJvb3Quc2V0UGx1Z2luRGF0YShcInRoZW1lc1wiLCBKU09OLnN0cmluZ2lmeShzYXZlZFRoZW1lcykpO1xyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImxvYWRUaGVtZXNcIiwgdGhlbWVzOiBzYXZlZFRoZW1lcywgaW1nczogc2F2ZWRJbWdzLCB3b3JraW5nOiBzYXZlZFdvcmtpbmdUaGVtZSB9KTtcclxufTtcclxubGV0IGltcG9ydFRoZW1lcyA9IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgIGxldCBzb3VyY2U7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHNvdXJjZSA9IEpTT04ucGFyc2UobXNnLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoXCJJbmNvbXBsZXRlIEpTT04gZXhwcmVzc2lvbi5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBmb3IgKGxldCBpIG9mIE9iamVjdC5rZXlzKHNvdXJjZS5zYXZlZFRoZW1lcykpIHtcclxuICAgICAgICAgICAgc2F2ZWRUaGVtZXNbaV0gPSBzb3VyY2Uuc2F2ZWRUaGVtZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgb2YgT2JqZWN0LmtleXMoc291cmNlLnNhdmVkSW1ncykpIHtcclxuICAgICAgICAgICAgbGV0IGltZyA9IFVpbnQ4QXJyYXkuZnJvbShzb3VyY2Uuc2F2ZWRJbWdzW2ldKTtcclxuICAgICAgICAgICAgaWYgKCFzYXZlZEltZ3NbaV0pIHtcclxuICAgICAgICAgICAgICAgIHNhdmVkSW1nc1tpXSA9IHNvdXJjZS5zYXZlZEltZ3NbaV07XHJcbiAgICAgICAgICAgICAgICBmaWdtYS5jcmVhdGVJbWFnZShpbWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeShcIkludmFsaWQgY29sb3IgdGhlbWUgcHJvZmlsZS5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZmlnbWEucm9vdC5zZXRQbHVnaW5EYXRhKFwidGhlbWVzXCIsIEpTT04uc3RyaW5naWZ5KHNhdmVkVGhlbWVzKSk7XHJcbiAgICBmaWdtYS5yb290LnNldFBsdWdpbkRhdGEoXCJzYXZlZEltZ3NcIiwgSlNPTi5zdHJpbmdpZnkoc2F2ZWRJbWdzKSk7XHJcbiAgICBpZiAoT2JqZWN0LmtleXMoc2F2ZWRUaGVtZXMpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6IFwibG9hZFRoZW1lc1wiLCB0aGVtZXM6IHNhdmVkVGhlbWVzLCBpbWdzOiBzYXZlZEltZ3MsIHdvcmtpbmc6IHNhdmVkV29ya2luZ1RoZW1lIH0pO1xyXG4gICAgfVxyXG4gICAgZmlnbWEubm90aWZ5KFwiQ29sb3IgdGhlbWUocykgaW1wb3J0IGNvbXBsZXRlIVwiLCB7IHRpbWVvdXQ6IDQwMDAgfSk7XHJcbn07XHJcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XHJcbiAgICBpZiAobXNnLnR5cGUgPT09ICd0aGVtZScpIHtcclxuICAgICAgICBhcHBseVRoZW1lKG1zZyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ3NhdmVDdXJyZW50Jykge1xyXG4gICAgICAgIHNhdmVDdXJyZW50KG1zZyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gXCJkZWxldGVcIikge1xyXG4gICAgICAgIGRlbGV0ZVRoZW1lKG1zZyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChtc2cudHlwZSA9PT0gXCJpbXBvcnRUaGVtZXNcIikge1xyXG4gICAgICAgIGltcG9ydFRoZW1lcyhtc2cpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobXNnLnR5cGUgPT09IFwidXBkYXRlXCIpIHtcclxuICAgICAgICBzYXZlQ3VycmVudChtc2cpO1xyXG4gICAgfVxyXG4gICAgLy8gTWFrZSBzdXJlIHRvIGNsb3NlIHRoZSBwbHVnaW4gd2hlbiB5b3UncmUgZG9uZS4gT3RoZXJ3aXNlIHRoZSBwbHVnaW4gd2lsbFxyXG4gICAgLy8ga2VlcCBydW5uaW5nLCB3aGljaCBzaG93cyB0aGUgY2FuY2VsIGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4uXHJcbiAgICAvL2ZpZ21hLmNsb3NlUGx1Z2luKCk7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=