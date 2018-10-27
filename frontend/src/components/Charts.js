import React from 'react';
import {Pane, Tab, Tablist, Text} from 'evergreen-ui';

import Component from '@reactions/component';
import KeywordChart from './KeywordChart';
import Matrix from './Matrix';
import mock from './tst.json';

export default function({data}) {
  if (data == null) return <Text>No data to show</Text>;

  data = mock;

  return (
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
  );
}
