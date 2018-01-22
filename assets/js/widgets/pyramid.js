(function ($) {
  $.widget('charts.pyramid', $.charts.funnel, {
    _getChartConfig: function (data) {
      var chartConfig = this._super(data);

      chartConfig.neckWidth = 0;
      chartConfig.neckHeight = 0;
      chartConfig.rotate = true;

      return chartConfig;
    }
  });
}(jQuery));
