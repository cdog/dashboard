(function ($) {
  $.widget('charts.area', $.charts.line, {
    _getChartConfig: function (data) {
      var chartConfig = this._super(data);

      for (var i = 0; i < chartConfig.graphs.length; i++) {
        chartConfig.graphs[i].fillAlphas = 0.5;
      }

      return chartConfig;
    }
  });
}(jQuery));
