var app = angular.module("Material-Editor", ["ngMaterial", 'ui.ace', 'ngMdIcons']);

app.factory('aceModelService', function() {
    var currentText = "//Code goes here";
    return {
		getCurrentText : function(){
            return currentText;
        },
        setCurrentText : function(data){
            currentText = data;
        }
	};
});

app.controller("AceCtrl", function($scope, aceModelService){
    $scope.modes = [ "CSS", "HTML", 'Java', 'Javascript', "Markdown", 'Python', 'Text', 'XML'];
    $scope.mode = $scope.modes[0];

    $scope.themes = ['Monokai', 'Twilight', "Clouds"];
    $scope.theme = $scope.themes[0];

    // The ui-ace option
  $scope.aceOption = {
      mode: $scope.mode.toLowerCase(),
      theme: $scope.theme.toLowerCase(),
      onLoad: function (_ace) {

          // HACK to have the ace instance in the scope...
          $scope.modeChanged = function () {
            _ace.getSession().setMode("ace/mode/" + $scope.mode.toLowerCase());
          };
          // change theme
          $scope.themeChanged = function () {
            _ace.getSession().setTheme("ace/theme/" + $scope.theme.toLowerCase());
          };
      },
      onChange: function(){
           aceModelService.setCurrentText($scope.aceModel);
      }
  };

  $scope.aceModel = aceModelService.getCurrentText();

});

app.controller("footerController", function($scope){

    $scope.myFontSize = 16;

    $scope.changeFontSize = function(){
        document.getElementById("editor").style.fontSize = $scope.myFontSize + "px";
    }
});
