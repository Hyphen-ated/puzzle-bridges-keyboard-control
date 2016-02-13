// ==UserScript== 
// @name Puzzle Bridges mouse+keyboard
// @namespace http://hyphen-ated.github.io/
// @description Use WASD to draw bridges from the cursor
// @author Hyphen-ated
// @include http://www.puzzle-bridges.com/*
// @run-at document-end
// ==/UserScript==
function init_puzzle() {
    game_table = document.getElementById("BridgesTable");
    max_x = game_table.rows.length;
    max_y = game_table.rows[0].cells.length;
}


function getImgAt(x,y) {
    var cell = game_table.rows[y].cells[x];
    return cell.getElementsByTagName("img")[0];
}

function doClick(clickx, clicky) {
    
    var img = document.elementFromPoint(mouse_x, mouse_y);
    var evt = new MouseEvent("mousedown", {
        view: unsafeWindow,            
        clientX: mouse_x + 1,
        clientY: mouse_y + 1            
    });
    img.dispatchEvent(evt);
   
    var newimg = document.elementFromPoint(mouse_x + 18*clickx, mouse_y + 18*clicky);
    var evt = new MouseEvent("mouseover", {
        view: unsafeWindow,            
        clientX: mouse_x + 1 + 18*clickx,
        clientY: mouse_y + 1 + 18*clicky            
    });
    newimg.dispatchEvent(evt);


    var evt = new MouseEvent("mouseup", {
        view: unsafeWindow,            
        clientX: mouse_x + 1 + 18*clickx,
        clientY: mouse_y + 1 + 18*clicky   
    });
    document.dispatchEvent(evt);
    img.dispatchEvent(evt);
}

var initted = false;
function onpress(e) {
    if(!initted) {
        init_puzzle();
        initted = true;
    }
    var xdelta = 0;
    var ydelta = 0;
    if(e.keyCode == ','.charCodeAt(0)) {
        ydelta = -1;         
    }  else if(e.keyCode == 'a'.charCodeAt(0)) {
        xdelta = -1;
    } else if(e.keyCode == 'o'.charCodeAt(0)) {
        ydelta = 1;
    } else if(e.keyCode == 'e'.charCodeAt(0)) {
        xdelta = 1;
    } else if(e.keyCode == 'p'.charCodeAt(0)) {       
        document.getElementById("btnReady").click();
    } else if(e.keyCode == 'y'.charCodeAt(0)) { 
        //get a new puzzle when you press 0
        document.getElementsByName("new")[0].click(); 
    }
    
    
    if(xdelta != 0 || ydelta != 0) {
        doClick(xdelta, ydelta);
    }       
         
}

function onmove(e) {
   mouse_x = e.clientX;
   mouse_y = e.clientY;
}

document.body.addEventListener('keypress', onpress);
document.body.addEventListener("mousemove", onmove);
