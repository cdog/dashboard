(function ($) {
  $.widget('charts.donut', $.charts.pie, {
    _getChartConfig: function (data) {
      var chartConfig = this._super(data);

      chartConfig.innerRadius = '45%';

      return chartConfig;
    }
  });
}(jQuery));
