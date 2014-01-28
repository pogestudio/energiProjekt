'use strict';

var address = 'http://localhost';

angular.module('energiProjektApp')
.factory('Processes', function($http,SharedProperties) {
  var address = SharedProperties.getServerAddress();
  return {
    create: function(params) {
      //console.log('creating process with params : ' + JSON.stringify(params) + ' address ::::: ' + address + '/processes/create')
      return $http.post(address + '/processes/store',params);
    },
    getProcessTypesForProject: function(projektId) {
      //delivers a dictionary with two arrays, one for support and one for production
      return $http.get(address + '/processTypes/' + projektId);
    },
    getProcessesAndTypesForProject: function(params) {
      //project_id : is the project id
      //wanted_process = 'production' or 'support', depending on what you want
      //console.log('calling get  processess with params :: ' + JSON.stringify(params));
      return $http.post(address + '/processes/index', params);
    },
    delete: function(processId) {
      //console.log('calling delete process for iD  :: ' + address + '/processes/' + processId);
            return $http.delete(address + '/processes/' + processId);
    },
    splitIntoProcessesAndProcessTypes: function(results) {
      /*
      parameters:
      dictionary with key: 
      results: array with results from server
      Will return
      array(
            array(
                  title:processType1,
                  processes:[
                        processForType1,
                        processForType1,
                        etc
                        ]
                )
            array(
                  title:processType2,
                  processes:[
                        processForType2,
                        processForType2,
                        etc
                        ]
                )
          )
      */
      var resultFromServer = results;
      var processTypes = [];


      for (var i = 0; i < resultFromServer.length; i++) {
        var typeId = resultFromServer[i].processType_id;
        if($.inArray(typeId, processTypes) == -1)
        {
          processTypes.push(typeId);
          //console.log('pushing processType: ' + typeId + ' ONTO STACK');
        }
      }

      var returnArray = []; //the array to return
      for (var i = processTypes.length - 1; i >= 0; i--) { //iterate through all process types
        var currentType = processTypes[i]; //the current type we are iterating through
        var dictForOneType = {'title':'', 'processes':[]}; //the dict which should contain the info for each process type, including the processes which it contains
        
        for (var j = resultFromServer.length - 1; j >= 0; j--) { //iterate through all processes, try to find process types that match the currently chosen one
          if (resultFromServer[j].processType_id == currentType) {//if they match,
            dictForOneType.title = resultFromServer[j].name;//set the title for the processTitle 
            dictForOneType.processes.push(resultFromServer[j]); //add the process to the subarray
          }
        }
        //when done, push the dict to the returnarray
        returnArray.push(dictForOneType);
      }

      return returnArray;
    }
  }
});