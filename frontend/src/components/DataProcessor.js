export default function(data) {
  // Create a lookup table to sort and regroup the columns of data,
  // first by year, then by continent:
  var lookup = {};
  function getData(year, continent) {
    var byYear, trace;
    if (!(byYear = lookup[year])) {
      byYear = lookup[year] = {};
    }
    // If a container for this year + continent doesn't exist yet,
    // then create one:
    if (!(trace = byYear[continent])) {
      trace = byYear[continent] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: {size: []},
      };
    }
    return trace;
  }

  // Go through each row, get the right trace, and append the data:
  for (var i = 0; i < data.length; i++) {
    var datum = data[i];
    var trace = getData(datum.year, datum.continent);
    trace.text.push(datum.country);
    trace.id.push(datum.country);
    trace.x.push(datum.lifeExp);
    trace.y.push(datum.gdpPercap);
    trace.marker.size.push(datum.pop);
  }

  // Get the group names:
  const years = Object.keys(lookup);
  // In this case, every year includes every continent, so we
  // can just infer the continents from the *first* year:
  const firstYear = lookup[years[0]];
  const continents = Object.keys(firstYear);

  // Create the main traces, one for each continent:
  const traces = continents.map((name) => {
    const data = firstYear[name];
    return {
      name,
      x: [...data.x],
      y: [...data.y],
      id: [...data.id],
      text: [...data.text],
      mode: 'markers',
      marker: {
        size: [...data.marker.size],
        sizemode: 'area',
        sizeref: 100000,
      },
    };
  });

  // Create a frame for each year. Frames are effectively just
  // traces, except they don't need to contain the *full* trace
  // definition (for example, appearance). The frames just need
  // the parts the traces that change (here, the data).
  const frames = years.map((name) => ({
    name,
    data: continents.map((continent) => getData(name, continent)),
  }));

  // Now create slider steps, one for each frame. The slider
  // executes a plotly.js API command (here, Plotly.animate).
  // In this example, we'll animate to one of the named frames
  // created in the above loop.
  const sliderSteps = years.map((year) => ({
    method: 'animate',
    label: year,
    args: [
      [year],
      {
        mode: 'immediate',
        transition: {duration: 300},
        frame: {duration: 300, redraw: false},
      },
    ],
  }));

  const layout = {
    width: document.body.clientWidth - 16,
    height: 600,
    xaxis: {
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: true,
      ticks: '',
      showticklabels: false,
      range: [30, 85],
    },
    yaxis: {
      zeroline: false,
    },
    hovermode: 'closest',
    // We'll use updatemenus (whose functionality includes menus as
    // well as buttons) to create a play button and a pause button.
    // The play button works by passing `null`, which indicates that
    // Plotly should animate all frames. The pause button works by
    // passing `[null]`, which indicates we'd like to interrupt any
    // currently running animations with a new list of frames. Here
    // The new list of frames is empty, so it halts the animation.
    updatemenus: [
      {
        x: 0,
        y: 0,
        yanchor: 'top',
        xanchor: 'left',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: {t: 87, r: 10},
        buttons: [
          {
            method: 'animate',
            args: [
              null,
              {
                mode: 'immediate',
                fromcurrent: true,
                transition: {duration: 300},
                frame: {duration: 500, redraw: false},
              },
            ],
            label: 'Play',
          },
          {
            method: 'animate',
            args: [
              [null],
              {
                mode: 'immediate',
                transition: {duration: 0},
                frame: {duration: 0, redraw: false},
              },
            ],
            label: 'Pause',
          },
        ],
      },
    ],
    // Finally, add the slider and use `pad` to position it
    // nicely next to the buttons.
    sliders: [
      {
        pad: {l: 130, t: 55},
        currentvalue: {
          visible: true,
          prefix: 'Year:',
          xanchor: 'right',
          font: {size: 20, color: '#666'},
        },
        steps: sliderSteps,
      },
    ],
  };

  console.log(traces, frames);

  return {data: traces, layout, frames};
}
