import React from 'react';
import Component from '@reactions/component';
import {Pane, Heading, Tab, Tablist, IconButton} from 'evergreen-ui';
import Help from './components/Help';
import KeywordInput from './components/KeywordInput';
import KeywordChart from './components/KeywordChart';
import Matrix from './components/Matrix';
import data from './components/tst.json';

class App extends React.Component {
  state = {
    showHelp: false,
    keywords: ['EEG'],
  };

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

        <Component
          initialState={{
            selectedIndex: 0,
            tabs: ['Bubble Chart', 'Co-occurrence Matrix'],
          }}
        >
          {({state, setState}) => (
            <Pane paddingLeft={16} paddingRight={16}>
              <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
                {state.tabs.map((tab, index) => (
                  <Tab
                    key={tab}
                    id={tab}
                    onSelect={() => setState({selectedIndex: index})}
                    isSelected={index === state.selectedIndex}
                    aria-controls={`panel-${tab}`}
                  >
                    {tab}
                  </Tab>
                ))}
              </Tablist>

              <Pane padding={16} background="tint1">
                {state.tabs.map((tab, index) => (
                  <Pane
                    key={tab}
                    id={`panel-${tab}`}
                    role="tabpanel"
                    aria-labelledby={tab}
                    aria-hidden={index !== state.selectedIndex}
                    display={index === state.selectedIndex ? 'block' : 'none'}
                  >
                    {index === 0 ? (
                      <KeywordChart data={data.data[0]} />
                    ) : (
                      <Matrix />
                    )}
                  </Pane>
                ))}
              </Pane>
            </Pane>
          )}
        </Component>
      </main>
    );
  }
}

export default App;
