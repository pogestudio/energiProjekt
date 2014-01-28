'use strict';

angular.module('energiProjektApp')
.controller('ProjectProcessesCtrl', function ($rootScope,$scope,$location, Processes, SharedProperties,Calculations){

 var locationArray = $location.path().split('/');
 var currentType = locationArray[locationArray.length-1];


 $scope.parsedProcesses = [];
 $scope.pageTitle = currentType == 'production' ? 'Produktionsprocesser' : 'Stödprocesser';//currentType.charAt(0).toUpperCase() + currentType.slice(1) + "processer";

 var reloadProcesses = function () {
  var parameters = {project_id : $rootScope.project.id, wanted_process : currentType};
  Processes.getProcessesAndTypesForProject(parameters).success(function(data) {

    var processAndTypes = Processes.splitIntoProcessesAndProcessTypes(data);

    var vacation_weeks = $rootScope.project.vacation_weeks;
    for (var i = processAndTypes.length - 1; i >= 0; i--) {
      var processes = processAndTypes[i].processes;
      var totalEnergyForProcessType = 0;
      for (var j = processes.length - 1; j >= 0; j--) {
        var totalEnergyInMWh = Calculations.totalEnergyInMWh(processes[j],vacation_weeks);
        processes[j].totalEnergy = totalEnergyInMWh;
        totalEnergyForProcessType += totalEnergyInMWh;
      }
      processAndTypes[i].totalEnergy = totalEnergyForProcessType;
    }

    $scope.parsedProcesses = processAndTypes;

  });
}

$scope.deleteProcess = function(process){
  var answer = confirm("Are you sure you want to delete ?")
  if (answer) {
    Processes.delete(process.id).success(function(data){
      reloadProcesses();
    });
  }
}

$scope.createExcel = function ()
{
  window.open('data:application/vnd.ms-excel,'+encodeURIComponent(document.getElementById('excelTable').outerHTML), "_blank");
}

reloadProcesses();
});
