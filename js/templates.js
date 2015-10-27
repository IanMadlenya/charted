charted.templates = {
  pageSettings () {
    return `
      <div class="page-settings">
        <button class="option-item settings" title="Settings">
          <span class="icon icon-settings"></span>
        </button>

        <div class="settings-popover popover">
          <div class="page-options">
            <a class="page-option-item download-data" title="Download data">
              <span class="icon icon-download"></span>Download data
            </a>

            <button class="page-option-item toggle-color" title="Switch background color">
              <span class="icon icon-color"></span>Switch background
            </button>

            <div class="grid-option"></div>

            <button class="page-option-item get-embed" title="Get embed code">
              <span class="icon icon-embed"></span>Get embed code
            </button>
          </div>

          <a href="." class="page-option-item go-home">
            <span class="icon icon-back"></span>Charted home
          </a>
        </div>
      </div>
    `
  },

  embedOverlay (params) {
    // TODO(anton): This should be just one script, without iframe.
    var script = `<script src="${window.location.origin}/embed.js"></script>`
    var iframe = `<iframe id="charted:${params.id}" src="${params.url}" height="600px" width="100%" scrolling="yes" style="border: solid 1px #ccc"></iframe>`

    return `
      <div class="overlay-container">
        <div class="overlay-content">
          <h1 class="overlay-title">Embed this Charted page</h1>
          <p class="overlay-description">
            You can add this embed to your website by copying and pasting the HTML code below.
          </p>

          <textarea class="embed-link">${iframe}\n${script}</textarea>

          <div class="iframe-container">${iframe}</div>
        </div>
        <div class="overlay-close"><span class="icon icon-x"></span></div>
      </div>
    `
  },

  gridSettingsFull () {
    return `
      <button class="page-option-item toggle-grid" title="Show full width charts">
        <span class="icon icon-full-screen"></span>Show full width charts
      </button>
    `
  },

  gridSettingsSplit () {
    return `
      <button class="page-option-item toggle-grid" title="Show split-screen charts">
        <span class="icon icon-split-screen"></span>Show split-screen charts
      </button>
    `
  },

  yAxisLabel (interval) {
    return `
      <div class="y-axis-label" style="top:${interval.top}">${interval.display}</div>
    `
  },

  chart (params) {
    var editableAttribute = ''
    var editableButtons = ''

    if (params.editable) {
      editableAttribute = 'content-editable="true"'
      editableButtons = `
        <div class="chart-options">
          <a class="option-item toggle-type" href="#" title="Switch chart type">
            <span class="icon icon-line"></span>
            <span class="icon icon-column"></span>
          </a>

          <a class="option-item toggle-rounding" href="#" title="Turn rounding on/off">
            <span class="icon icon-round-off"></span>
            <span class="icon icon-round-on"></span>
          </a>
        </div>
      `
    }

    return `
      <div class="chart show-columns">
        <div class="chart-description">
          <h1 class="title info-input" ${editableAttribute}></h1>
          <div class="note info-input" ${editableAttribute}></div>
        </div>

        <div class="chart-plot-outer-container">
          <div class="chart-plot-inner-container">
            <div class="y-axis-container"><div class="y-axis chart-height"></div></div>
            <div class="zero-line-container chart-height"><div class="zero-line"></div></div>
            <div class="x-axis"><span class="x-beginning"></span><span class="x-end"></span></div>
            <div class="selection">
              <div class="selection-info">
                <div class="selection-value"></div>
                <div class="selection-xlabel"></div>
                <div class="selection-ylabel"></div>
              </div>
            </div>
            <figure class="chart-plot chart-height"></figure>
          </div>
        </div>

        <aside class="chart-info">
          <ul class="legend hidden"></ul>
          ${editableButtons}
        </aside>
      </div>
    `
  },

  changeSeriesColor (params) {
    return `
      <div class="change-series-color popover">
        <p>Change color:</p>
        <p>
          <span contenteditable="true" class="color-hex-input change-series-color-${params.seriesIndex}">
            ${params.colorHex}
          </span>
        </p>
        <span class="arrow-bottom-left"></span>
      </div>
    `
  },

  legendItem (label) {
    var editableAttribute = ''
    var editableButtons = ''

    if (label.editable) {
      editableAttribute = 'contenteditable="true"'
      editableButtons = `<button class="move-chart"><span class="icon icon-move"></span></button>`
    }

    return `
      <li class="legend-item">
        <div class="legend-label info-input">
          <span class="legend-input" ${editableAttribute}>${label.label}</span>
        </div>
        <button class="legend-color">
          <span style="background-color:${label.color};" class="legend-dot"></span>
        </button>
        ${editableButtons}
      </li>
    `
  },

  moveChart (params) {
    var chartList = params.otherCharts.map(function (chart) {
      return `
        <a href= "#" class="move-chart-option move-to-chart-${chart.chartIndex}">
          ${chart.title}
        </a>
      `
    }).join('\n')

    var newChartButton = ''
    if (params.series.length > 1) {
      newChartButton = `
        <a href= "#" class="move-chart-option move-to-new-chart">
          <span class="icon icon-plus"></span>New chart
        </a>
      `
    }

    return `
      <div class="move-chart-options popover">
        <p>Move to:</p>
        ${chartList}
        ${newChartButton}
        <span class="arrow-bottom-right"></span>
      </div>
    `
  }
}