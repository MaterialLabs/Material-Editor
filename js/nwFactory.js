app.factory('GUI', function() {
    return require('nw.gui');
})
app.factory('Window', ['GUI', function(gui) {
    return gui.Window.get();
}])

app.factory('Clipboard', ['GUI', function(gui) {
    return gui.Clipboard.get();
}])

app.run(['GUI', 'Window', 'Clipboard', 'aceModelService', function(GUI, Window, Clipboard, aceModelService) {

    //==================================================================================
                                //MAKING THE MENUS
    //==================================================================================

    var windowMenu = new GUI.Menu({
        type: 'menubar'
    });

    var appMenu = new GUI.Menu();

    //Add to window menu
    windowMenu.append(new GUI.MenuItem({
        label: "Material Editor",
        submenu: appMenu,
    }));

    appMenu.append(new GUI.MenuItem({
        label: "About",
        click: function(){
            alert("This is a lightweight Material Design Code Editor");
        }
    }));

    appMenu.append(new GUI.MenuItem({
        label: "Preferences",
        click: function(){
            alert("Preferences biyatch");
        }
    }));

    //================================File menu===================================
    var fileMenu = new GUI.Menu();

    //Add to window menu
    windowMenu.append(new GUI.MenuItem({
        label: "File",
        submenu: fileMenu,
    }));

    //About subentries
    fileMenu.append(new GUI.MenuItem({
        label: "New",
        click: function(){
            handleNew();
        },
        key: "n",
        modifiers: "cmd"
    }));

    fileMenu.append(new GUI.MenuItem({
        label: "Open",
        click: function(){
            alert("Open");
        },
        key: "o",
        modifiers: "cmd"
    }));

    fileMenu.append(new GUI.MenuItem({
        label: "New Window",
        click: function(){
            alert("New Window");
        },
        key: "n",
        modifiers: "cmd-shift"
    }));

    fileMenu.append(new GUI.MenuItem({
        label: "Print",
        click: function(){
            alert("Printing");
        },
        key: "p",
        modifiers: "cmd"
    }));

    //separator

    fileMenu.append(new GUI.MenuItem({
        type: "separator"
    }));

    fileMenu.append(new GUI.MenuItem({
        label: "Save",
        click: function(){
            alert("Save");
        },
        key: "s",
        modifiers: "cmd"
    }));

    fileMenu.append(new GUI.MenuItem({
        label: "Save As",
        click: function(){
            alert("Save As");
        },
        key: "s",
        modifiers: "cmd-shift"
    }));

    //separator

    fileMenu.append(new GUI.MenuItem({
        type: "separator"
    }));


    fileMenu.append(new GUI.MenuItem({
        label: "Close Tab",
        click: function(){
            alert("Close Tab");
        }
    }));

    fileMenu.append(new GUI.MenuItem({
        label: "Close Material Editor",
        click: function(){
            win.close();
        },
        key: "q",
        modifiers: "cmd"
    }));

    //===========================EDIT MENU===========================

    var editMenu = new GUI.Menu();

    //Add to window menu
    windowMenu.append(new GUI.MenuItem({
        label: "Edit",
        submenu: editMenu,
    }));

    //subentries
    editMenu.append(new GUI.MenuItem({
        label: "Cut",
        click: function(){
            //Clipboard.set(aceModelService.getCurrentText());
            aceModelService.setCurrentText("");
        },
        key: "x",
        modifiers: "cmd"
    }));

    editMenu.append(new GUI.MenuItem({
        label: "Copy",
        click: function(){
            //Clipboard.set(aceModelService.getCurrentText());
        },
        key: "c",
        modifiers: "cmd"
    }));

    editMenu.append(new GUI.MenuItem({
        label: "Paste",
        click: function(){
            //aceModelService.setCurrentText(Clipboard.get());
        }
    }));

    //==============================VIEW===============================

    var viewMenu = new GUI.Menu();

    //Add to window menu
    windowMenu.append(new GUI.MenuItem({
        label: "View",
        submenu: viewMenu,
    }));

    //About subentries
    viewMenu.append(new GUI.MenuItem({
        label: "Toggle Wrap Line",
        type: "checkbox",
        checked: function(){
            //REMOVE THAT DAMN LINE
            alert("the line is enabled");
        }
    }));

    //===========================WINDOW MENU===========================

    var windowMen = new GUI.Menu();

    //Add to window menu
    windowMenu.append(new GUI.MenuItem({
        label: "Window",
        submenu: windowMen,
    }));

    //subentries
    windowMen.append(new GUI.MenuItem({
        label: "Bring all to Front",
        click: function(){
            alert("bring all to front");
        }
    }));

    //Assigning to the window
    Window.menu = windowMenu;

    //==================================================================================
                                //MAKING THE FRAME BUTTONS
    //==================================================================================


    //-----------------------HEADER BUTTONS------------------------

    var minimize = document.getElementById('minimize');
    var close = document.getElementById('close');
    var maximize = document.getElementById('maximize');

    minimize.addEventListener("click", function(){
        Window.minimize();
    }, false);

    close.addEventListener("click", function(){
        Window.close();
    }, false);


    maximize.addEventListener("click", function(){
        if(Window.isMaximized){
            Window.unmaximize();
        }else{
            Window.maximize();
        }

        Window.on('maximize', function() {
            Window.isMaximized = true;
        });

        Window.on('unmaximize', function() {
            Window.isMaximized = false;
        });
    }, false);

}]);
