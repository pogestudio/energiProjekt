'use strict';

var address = 'http://localhost';

angular.module('energiProjektApp')
.factory('Calculations', function() {
  return {
    totalEnergyInMWh: function(params,vacation_weeks) {
      //console.log('inside calculation');
      var totalWeeks = 52-vacation_weeks;
      var totalkW = params['quantity'] * params['power'];
      var totalEnergyInMWh = totalWeeks * totalkW * params['uptime_per_week'] * 0.001;
      var totalEnergyInMWh = parseInt(totalEnergyInMWh);


      //console.log('Calculating some shit::: totalWeeks - ' + totalWeeks + ' \n totalkW - ' + totalkW + ' \n secondsPerWeek - ' + secondsPerWeek + ' \n totalEnergyInMWh - ' + totalEnergyInMWh);
      return totalEnergyInMWh;
    }
  }
});