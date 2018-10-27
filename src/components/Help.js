import React from 'react';
import {SideSheet, Paragraph, Heading, Pane} from 'evergreen-ui';

export default function(props) {
  return (
    <SideSheet isShown={props.isShown} onCloseComplete={props.onClose}>
      <Pane padding={16}>
        <Heading marginBottom={16} size={600} letterSpacing="2px">
          WIDE CHALLENGE
        </Heading>
        <Paragraph marginTop={12} marginBottom={12}>
          Our solution will help future undergraduate students have an overlook
          on the performance of Finnish institutions based on their interested
          fields.
        </Paragraph>

        <Heading
          marginBottom={16}
          marginTop={24}
          size={600}
          letterSpacing="2px"
        >
          HOW TO USE
        </Heading>
        <Paragraph marginTop={12} marginBottom={12}>
          It's simple. Just enter a keyword for interested subject, for example,
          "EEG" (without quotes). Then press <strong>ENTER</strong>. Please note
          that it takes some time to calculate the data.
        </Paragraph>

        <Paragraph marginTop={12} marginBottom={12}>
          The result is displayed as a bubble chart to show how many
          publications an institution has in one year. By default, the results
          of last 5 years are show.
        </Paragraph>
      </Pane>
    </SideSheet>
  );
}
