(function ($) {
  $.widget('charts.angularGauge', $.charts.chart, {
    options: {
      legendEnabled: false,
      min: 0,
      max: 100,
      valueInterval: 10,
      low: 40,
      high: 60
    },

    _getChartConfig: function (data) {
      var value = Math.max(this.options.min, Math.min(this.options.max, data.value));

      var chartConfig = this._super(data);

      chartConfig.type = 'gauge';

      chartConfig.arrows = [{
        value: value
      }];

      chartConfig.axes = [{
        startValue: this.options.min,
        endValue: this.options.max,
        valueInterval: this.options.valueInterval,
        bottomText: value + '',
        bottomTextYOffset: -20,
        bands: [{
          startValue: this.options.min,
          endValue: this.options.low,
          color: '#00cc00'
        },
        {
          startValue: this.options.low,
          endValue: this.options.high,
          color: '#ffac29'
        },
        {
          startValue: this.options.high,
          endValue: this.options.max,
          color: '#ea3838',
          innerRadius: '95%'
        }]
      }];

      return chartConfig;
    }
  });
}(jQuery));
