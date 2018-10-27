import React from 'react';
import {Pane, Heading, Text} from 'evergreen-ui';
import KeywordInput from './components/KeywordInput';
import KeywordChart from './components/KeywordChart';

class App extends React.Component {
  render() {
    return (
      <div className="">
        <Pane
          elevation={1}
          marginBottom={16}
          padding={16}
          display="flex"
          alignItems="center"
        >
          <Pane width="25%">
            <Heading size={600} letterSpacing="2px">
              WIDE CHALLENGE
            </Heading>
          </Pane>
          <Pane width="75%">
            <KeywordInput />
          </Pane>
        </Pane>

        <KeywordChart />
      </div>
    );
  }
}

export default App;
