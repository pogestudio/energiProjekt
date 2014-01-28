'use strict';

angular.module('energiProjektApp')
.controller('ProjectResultsCtrl', function ($rootScope, $scope, Calculations, Processes) {




	$scope.productionTypes = [];
	$scope.supportTypes = [];
	$scope.shouldShowEnergy = true;
	$scope.shouldShowPower = false;
	var amountOfProcessesLoaded = 0;
	var amountOfTypesToFetch;
	var currentDataKey = 'energy';

	var reloadProcesses = function () {
		amountOfProcessesLoaded = 0; //if we are fetching new stuff, start over at 0.
		amountOfTypesToFetch = 2;
		GetSliceAndParseProcessType('production');
		GetSliceAndParseProcessType('support');
	}

	var GetSliceAndParseProcessType = function (processType) {
		var parameters = {project_id : $rootScope.project.id, wanted_process : processType};
		Processes.getProcessesAndTypesForProject(parameters).success(function(data) {

			amountOfProcessesLoaded++;
			
			var processAndTypes = Processes.splitIntoProcessesAndProcessTypes(data);
			var vacation_weeks = $rootScope.project.vacation_weeks;
			var typesWithEnergyAndPower = [];

			for (var i = processAndTypes.length - 1; i >= 0; i--) {
				var processes = processAndTypes[i].processes;
				var totalEnergyForProcessType = 0;
				var totalPowerForProcessType = 0;
				for (var j = processes.length - 1; j >= 0; j--) {
					totalEnergyForProcessType += Calculations.totalEnergyInMWh(processes[j],vacation_weeks);
					totalPowerForProcessType += parseInt(processes[j].power);
				}
				typesWithEnergyAndPower.push({title:processAndTypes[i].title, energy:totalEnergyForProcessType, power:totalPowerForProcessType});
			}

			if (processType == 'production') {
				$scope.productionTypes = typesWithEnergyAndPower;
			} else {
				$scope.supportTypes = typesWithEnergyAndPower;
			}
			reloadGraphs();

		});
	}

	$scope.showEnergy = function (shouldShow) {

		$scope.shouldShowEnergy = shouldShow;
		$scope.shouldShowPower = !shouldShow;
		if ($scope.shouldShowEnergy) {
			currentDataKey = 'energy';
		} else {
			currentDataKey = 'power';
		}
		reloadGraphs();
	}

	var graphWidth = 600;
	var graphHeight = 300;

	var reloadGraphs = function () {
		if (amountOfProcessesLoaded != amountOfTypesToFetch) {
			return;
		};
		var dataArray = [];
		for (var i = 0; i < $scope.productionTypes.length; i++) {
			var objectArray = [$scope.productionTypes[i].title, $scope.productionTypes[i][currentDataKey]];
			dataArray.push(objectArray); 
		};
		for (var i = 0; i < $scope.supportTypes.length; i++) {
			var objectArray = [$scope.supportTypes[i].title, $scope.supportTypes[i][currentDataKey]];
			dataArray.push(objectArray); 
		};

		reloadBarGraph(dataArray);
		reloadPieGraph(dataArray);
	}

	var reloadBarGraph = function (dataArray) {
		var YAxisName = $scope.shouldShowEnergy ? 'MWh' : 'kW';
		var myChart = new JSChart('barGraph', 'bar');
		myChart.setDataArray(dataArray);
		//myChart.colorizeBars(colors);
		myChart.setTitle('Energianvändning per år');
		myChart.setTitleColor('#8E8E8E');
		myChart.setAxisNameX('Processer');
		myChart.setAxisNameY(YAxisName);
		myChart.setAxisValuesAngle(30);
		myChart.setAxisColor('#C4C4C4');
		myChart.setAxisNameFontSize(20);
		myChart.setAxisNameColor('#999');
		myChart.setAxisValuesColor('#7E7E7E');
		myChart.setBarValuesColor('#7E7E7E');
		myChart.setAxisPaddingTop(60);
		myChart.setAxisPaddingRight(140);
		myChart.setAxisPaddingLeft(200);
		myChart.setAxisPaddingBottom(90);
		myChart.setTextPaddingLeft(105);
		myChart.setTitleFontSize(11);
		myChart.setBarBorderWidth(1);
		myChart.setBarBorderColor('#C4C4C4');
		myChart.setBarSpacingRatio(50);
		myChart.setGrid(false);
		myChart.setSize(graphWidth, graphHeight);
		myChart.draw();
	}

	var reloadPieGraph = function (dataArray)
	{
		var myData = new Array(['Sector 1', 2], ['Sector 2', 1], ['Sector 3', 3], ['Sector 4', 6], ['Sector 5', 8.5], ['Sector 6', 10]);
		var colors = ['#FACC00', '#FB9900', '#FB6600', '#FB4800', '#CB0A0A', '#F8F933'];
		var myChart = new JSChart('pieGraph', 'pie');
		myChart.setDataArray(dataArray);
		//myChart.colorizePie(colors);
		myChart.setTitle('Energianvändning per år');
		myChart.setTitleColor('#857D7D');
		myChart.setPieUnitsColor('#9B9B9B');
		myChart.setPieValuesColor('#6A0000');
		myChart.draw();
	}

	$scope.createExcel = function ()
	{
		var totalHTML = encodeURIComponent(document.getElementById('excelTable1').outerHTML) + encodeURIComponent(document.getElementById('excelTable2').outerHTML)
		window.open('data:application/vnd.ms-excel,'+totalHTML, "_blank");
	}

	reloadProcesses();
});
