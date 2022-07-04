import * as React from 'react';

interface JsonProps {
  data: Object;
}

export const Json: React.FC<JsonProps> = (props) => (
  <pre>
    <code>{JSON.stringify(props.data, null, 2)}</code>
  </pre>
);
