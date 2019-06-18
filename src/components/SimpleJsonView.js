import React from 'react';
import JSONTree from 'react-json-tree'

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#788dff',
    base0A: '#788dff',
    base0B: '#788dff',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#788dff'
  };

const SimpleJsonView = (props) => (
    <JSONTree
      data={props.data}
      theme={theme}
      hideRoot={true}
    />
)

export default SimpleJsonView