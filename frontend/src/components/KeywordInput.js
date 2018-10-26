import React from 'react';
import Component from '@reactions/component';
import {TagInput} from 'evergreen-ui';

export default function KeywordInput(props) {
  return (
    <Component initialState={{values: ['kertomukset', 'pakinat']}}>
      {({state, setState}) => (
        <TagInput
          width="100%"
          height={40}
          values={state.values}
          onChange={(values) => {
            setState({values});
          }}
        />
      )}
    </Component>
  );
}
