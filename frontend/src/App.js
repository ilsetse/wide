import React from 'react';
import Component from '@reactions/component';
import { TagInput, Pane, Spinner } from 'evergreen-ui';

class App extends React.Component {
  render() {
    return (
      <div className="max-w-md mx-auto my-3">
        <h1 className="text-center text-2xl my-4">Wide Challenge</h1>
        <p className="mb-2">Enter keyword</p>
        <Component initialState={{ values: ['kertomukset', 'pakinat'] }}>
          {({ state, setState }) => (
            <TagInput
              width="100%"
              values={state.values}
              onChange={values => {
                setState({ values });
              }}
            />
          )}
        </Component>
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={300}
        >
          <Spinner />
        </Pane>
      </div>
    );
  }
}

export default App;
