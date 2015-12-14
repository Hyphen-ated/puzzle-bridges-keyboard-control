// ==UserScript== 
// @name Puzzle Bridges Keyboard Control
// @namespace http://hyphen-ated.github.io/
// @description Use WASD to move a cursor and IJKL to draw bridges
// @author Hyphen-ated
// @include http://www.puzzle-bridges.com/*
// @run-at document-end
// ==/UserScript==
function init_puzzle() {
    your_position_x = 0;
    your_position_y = 0;
    game_table = document.getElementById("BridgesTable");
    max_x = game_table.rows.length;
    max_y = game_table.rows[0].cells.length;
}


function getImgAt(x,y) {
    var cell = game_table.rows[y].cells[x];
    return cell.getElementsByTagName("img")[0];
}

function setCellStyle(x, y, str) {
    var img = getImgAt(x, y);
    img.style.outline = str;
}

function doClick(img, clickx, clicky) {
    var rect = img.getBoundingClientRect();
    var evt = new MouseEvent("mousedown", {
        view: unsafeWindow,            
        clientX: rect.left + 1,
        clientY: rect.top + 1            
    });
    img.dispatchEvent(evt);

    var newtarget = getImgAt(your_position_x + clickx, your_position_y + clicky); 
    var evt = new MouseEvent("mouseover", {
        view: unsafeWindow,            
        clientX: rect.left + 1 + 18*clickx,
        clientY: rect.top + 1 + 18*clicky            
    });
    newtarget.dispatchEvent(evt);


    var evt = new MouseEvent("mouseup", {
        view: unsafeWindow,            
        clientX: rect.left + 1 + 18*clickx,
        clientY: rect.top + 1 + 18*clicky   
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
    var img = getImgAt(your_position_x, your_position_y);
    var xdelta = 0;
    var ydelta = 0;
    var clickx = 0;
    var clicky = 0;
    if(e.keyCode == 'w'.charCodeAt(0)) {
        ydelta = -1;         
    } else if(e.keyCode == 'W'.charCodeAt(0)) {
        ydelta = -5;
    } else if(e.keyCode == 'a'.charCodeAt(0)) {
        xdelta = -1;
    } else if(e.keyCode == 'A'.charCodeAt(0)) {
        xdelta = -5;
    } else if(e.keyCode == 's'.charCodeAt(0)) {
        ydelta = 1;
    } else if(e.keyCode == 'S'.charCodeAt(0)) {
        ydelta = 5;
    } else if(e.keyCode == 'd'.charCodeAt(0)) {
        xdelta = 1;
    } else if(e.keyCode == 'D'.charCodeAt(0)) {
        xdelta = 5;
    } else if(e.keyCode == 'i'.charCodeAt(0)) {        
        clicky = -1;       
    } else if(e.keyCode == 'I'.charCodeAt(0)) {        
        clicky = -2;       
    } else if(e.keyCode == 'j'.charCodeAt(0)) {
        clickx = -1;
    } else if(e.keyCode == 'J'.charCodeAt(0)) {
        clickx = -2;
    } else if(e.keyCode == 'k'.charCodeAt(0)) {
        clicky = 1;
    } else if(e.keyCode == 'K'.charCodeAt(0)) {
        clicky = 2;
    } else if(e.keyCode == 'l'.charCodeAt(0)) {
        clickx = 1;
    } else if(e.keyCode == 'L'.charCodeAt(0)) {
        clickx = 2;
    } else if(e.keyCode == 13) {
        //finish the board when you press enter
        document.getElementById("btnReady").click();
    }
    
    
    if(xdelta != 0 || ydelta != 0) {
        setCellStyle(your_position_x, your_position_y, "");
        your_position_x += xdelta;
        your_position_y += ydelta;
        your_position_x = (your_position_x + max_x) % max_x;
        your_position_y = (your_position_y + max_y) % max_y;
        setCellStyle(your_position_x, your_position_y, "1px solid red");       
    }
    
    
    while(clickx != 0) {
       doClick(img, clickx, 0);
       if(clickx < 0) ++clickx;
          else --clickx;
    }
    
    while(clicky != 0) {
       doClick(img, 0, clicky);
       if(clicky < 0) ++clicky;
          else --clicky;
    }
         
}

document.body.addEventListener('keypress', onpress);
