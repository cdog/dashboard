(function ($) {
  // Widget presets
  var presets = {};

  $.getJSON('presets.json', function (data) {
    presets = data;
  });

  // Widget templates
  var templates = {
    column: 'column-and-bar',
    bar: 'column-and-bar',
    line: 'line-and-area',
    area: 'line-and-area',
    pie: 'pie-and-donut',
    donut: 'pie-and-donut',
    scatter: 'scatter-and-bubble',
    bubble: 'scatter-and-bubble',
    angularGauge: 'angular-gauge',
    cylinderGauge: 'cylinder-gauge',
    funnel: 'funnel-and-pyramid',
    pyramid: 'funnel-and-pyramid'
  }

  function addWidget(event, data) {
    var path = 'templates/' + templates[data.widget] + '.html';

    $('.widget-actions > .action-edit', data.element).attr('data-remote', path);
    $('[data-toggle="tooltip"]', data.element).tooltip();
  }

  // Dashboard
  var dashboard = $('#dashboard-example').dashboard({
    addWidget: addWidget,
    widgetBody: '.panel-body',
    widgetHandle: '.panel-heading, .panel-title, .widget-actions',
    widgetTitle: '.panel-title'
  }).data('dashboard-dashboard');

  // Load widgets
  $.getJSON('widgets.json', function (data) {
    dashboard.removeAllWidgets().addWidgets(data);
  });

  // Import widgets
  $('#modal-import-widgets').on('click', '.confirm', function (event) {
    var data = JSON.parse($('[name="import"]', '#modal-import-widgets').val());

    dashboard.removeAllWidgets().addWidgets(data);
  });

  // Export widgets
  $('#modal-export-widgets').on('show.bs.modal', function (event) {
    var data = JSON.stringify(dashboard.serialize());

    $('[name="export"]', this).val(data);
  });

  // Add widget
  $(document).on('click', '[data-add="widget"]', function (event) {
    var data = $(this).data();
    var dashboard = $(data.target).data('dashboard-dashboard');
    var options = data.preset ? presets[data.widget][data.preset] : {};
    var title = $(this).attr('title');

    dashboard.addWidget(data.widget, options, title, 2, 2);
  });

  // Widget settings
  $('#modal-widget-settings').on('show.bs.modal', function (event) {
    var target = $(event.relatedTarget);

    $(this).data('widget', {
      element: target.parents('.panel'),
      dashboard: target.parents('.dashboard')
    });
  });

  $('#modal-widget-settings').on('loaded.bs.modal', function (event) {
    var data = $('#modal-widget-settings').data('widget');
    var dashboard = data.dashboard.data('dashboard-dashboard');
    var options =  dashboard.getWidgetOptions(data.element);

    $('[name]', '#modal-widget-settings form').each(function () {
      var name = $(this).attr('name');

      if ($(this).attr('type') == 'checkbox') {
        $(this).prop('checked', options[name]);
      } else {
        $(this).val(options[name]);
      }
    });
  });

  $('#modal-widget-settings').on('hide.bs.modal', function (event) {
    $(this).removeData('bs.modal widget');
  });

  $('#modal-widget-settings').on('click', '.confirm', function (event) {
    var data = $('#modal-widget-settings').data('widget');
    var dashboard = data.dashboard.data('dashboard-dashboard');
    var options = {};

    $('[name]', '#modal-widget-settings form').each(function () {
      var name = $(this).attr('name');

      if ($(this).attr('type') == 'checkbox') {
        options[name] = this.checked;
      } else if ($(this).attr('type') == 'number') {
        options[name] = Number($(this).val());
      } else {
        options[name] = $(this).val();
      }
    });

    dashboard.setWidgetOptions(data.element, options);
  });

  // Remove widget
  $('#modal-remove-widget').on('show.bs.modal', function (event) {
    var target = $(event.relatedTarget);

    $(this).data('widget', {
      element: target.parents('.panel'),
      dashboard: target.parents('.dashboard')
    });
  });

  $('#modal-remove-widget').on('hide.bs.modal', function (event) {
    $(this).removeData('widget');
  });

  $('#modal-remove-widget').on('click', '.confirm', function (event) {
    var data = $('#modal-remove-widget').data('widget');
    var dashboard = data.dashboard.data('dashboard-dashboard');

    dashboard.removeWidget(data.element);
  });

  // Remove all widgets
  $('#modal-remove-all-widgets').on('click', '.confirm', function (event) {
    dashboard.removeAllWidgets();
  });
}(jQuery));
