import React from 'react';
import {Pane, Heading, Text} from 'evergreen-ui';
import KeywordInput from './components/KeywordInput';
import UniversityList from './components/UniversityList';
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
            <Text size={300}>
              See Finnish performance on intertesting keywords
            </Text>
          </Pane>
          <Pane width="75%">
            <KeywordInput />
          </Pane>
        </Pane>

        <Pane display="flex">
          <Pane width="25%" padding={16}>
            <Heading is="h3" size={600} marginBottom={16} letterSpacing="2px">
              Customize
            </Heading>
          </Pane>
          <Pane width="75%" paddingLeft={16} paddingRight={16}>
            <KeywordChart />
          </Pane>
        </Pane>
      </div>
    );
  }
}

export default App;
