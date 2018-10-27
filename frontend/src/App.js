import React from 'react';
import {Pane, Heading, IconButton, Spinner} from 'evergreen-ui';
import Help from './components/Help';
import KeywordInput from './components/KeywordInput';
import Charts from './components/Charts';

class App extends React.Component {
  state = {
    isLoading: true,
    showHelp: false,
    keywords: ['EEG'],
    data: null,
  };

  componentDidMount() {
    setTimeout(() => this.setState({isLoading: false}), 1000);
  }

  doChangeKeyword = (keywords) => {
    this.setState({keywords});
  };

  doCloseHelp = () => this.setState({showHelp: false});

  doToggleHelp = () => this.setState({showHelp: !this.state.showHelp});

  render() {
    return (
      <main>
        <Help isShown={this.state.showHelp} onClose={this.doCloseHelp} />
        <Pane
          elevation={1}
          marginBottom={16}
          padding={16}
          display="flex"
          alignItems="center"
        >
          <Pane width="25%" display="flex" alignItems="center">
            <Heading size={600} letterSpacing="2px">
              WIDE CHALLENGE
            </Heading>
            <IconButton
              onClick={this.doToggleHelp}
              marginLeft={12}
              appearance="minimal"
              icon="help"
              iconSize={18}
              intent="success"
            />
          </Pane>
          <Pane width="75%">
            <KeywordInput
              values={this.state.keywords}
              onChange={this.doChangeKeyword}
            />
          </Pane>
        </Pane>
        {this.state.isLoading ? (
          <Pane
            width="100%"
            height={120}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner />
          </Pane>
        ) : (
          <Charts />
        )}
      </main>
    );
  }
}

export default App;
