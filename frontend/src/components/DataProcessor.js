export default function(data) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  const text = [
    'University of Helsinki',
    'Åbo Akademi University',
    'University of Turku',
    'University of Tampere',
    'University of Jyväskylä',
    'University of Oulu',
    'University of Vaasa',
    'University of Lapland',
    'University of Eastern Finland',
    'Aalto University',
  ];

  const color = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    '#ffa600',
    '#de425b',
    'rgb(93, 164, 214)',
    'rgb(255, 144, 14)',
    'rgb(44, 160, 101)',
    'rgb(255, 65, 54)',
  ];

  const opacity = Array.from({length: color.length}, () => 0.8);

  const frames = Array.from({length: 10}, (_, i) => {
    const y = Array.from({length: text.length}, () => getRandomInt(0, 30));
    return {
      name: 2004 + i,
      data: [
        {
          y,
          text,
          mode: 'markers',
          marker: {
            color,
            opacity,
            size: y.map((x) => x * 3),
          },
        },
      ],
    };
  });

  // Now create slider steps, one for each frame. The slider
  // executes a plotly.js API command (here, Plotly.animate).
  // In this example, we'll animate to one of the named frames
  // created in the above loop.
  const sliderSteps = frames.map(({name}) => ({
    method: 'animate',
    label: name,
    args: [
      [name],
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
      // range: [30, 85],
    },
    yaxis: {
      range: [0, 50],
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
            label: 'Autoplay',
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

  return {data: frames[0].data, layout, frames};
}
