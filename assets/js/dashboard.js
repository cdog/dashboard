(function ($) {
  $.widget('dashboard.dashboard', {
    options: {
      widgetBody: '.widget-body',
      widgetHandle: '.widget-handle',
      widgetMargins: [10, 10],
      widgetTemplate: '#widget-template',
      widgetTitle: '.widget-title',
      widgetUnitSize: [225, 150]
    },
    _create: function () {
      this.gridster = $(this.element).addClass('gridster').gridster({
        draggable: {
          handle: this.options.widgetHandle
        },
        resize: {
          enabled: true,
          stop: $.proxy(this._resizeWidget, this)
        },
        serialize_params: $.proxy(this._serialize, this),
        widget_base_dimensions: this.options.widgetUnitSize,
        widget_margins: [this.options.widgetMargins[0] / 2, this.options.widgetMargins[1] / 2],
        widget_selector: 'div'
      }).data('gridster');
    },
    addWidget: function (widget, options, title, width, height, x, y) {
      var source = $(this.options.widgetTemplate).html();
      var template = Handlebars.compile(source);
      var context = {
        title: title
      };
      var html = template(context);
      var element = this.gridster.add_widget(html, width, height, x, y).get(0);

      $(element).data('widget', widget);
      $(element).data('title', title);
      $(this.options.widgetBody, element)[widget](options);

      this._trigger('addWidget', null, {
        element: element,
        widget: widget
      });

      return element;
    },
    _compareWidgets: function (a, b) {
      if (a.y > b.y) {
        return 1;
      }

      if ((a.y == b.y) && (a.x > b.x)) {
        return 1;
      }

      return -1;
    },
    addWidgets: function (widgets) {
      var self = this;

      widgets = widgets.sort(this._compareWidgets);

      $(widgets).each(function () {
        self.addWidget(this.widget, this.options, this.title, this.width, this.height, this.x, this.y);
      });
    },
    getWidgetOptions: function (element) {
      var widget = element.data('widget');

      return $(this.options.widgetBody, element)[widget]('option');
    },
    setWidgetOptions: function (element, options) {
      var widget = element.data('widget');

      $(this.options.widgetBody, element)[widget]('option', options);
    },
    removeWidget: function (element) {
      this.gridster.remove_widget(element);
    },
    removeAllWidgets: function () {
      this.gridster.remove_all_widgets();

      return this;
    },
    _serialize: function (element, grid) {
      var data = element.data();

      return {
        widget: data.widget,
        options: this.getWidgetOptions(element),
        title: data.title,
        x: grid.col,
        y: grid.row,
        width: grid.size_x,
        height: grid.size_y
      };
    },
    serialize: function () {
      return this.gridster.serialize();
    },
    _resizeWidget: function (event, ui, element) {
      var widget = element.data('widget');

      $(this.options.widgetBody, element)[widget]('resize');
    },
    _destroy: function () {
      this.gridster.destroy(true);
    }
  });
}(jQuery));
