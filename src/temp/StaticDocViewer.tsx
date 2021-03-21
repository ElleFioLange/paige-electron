import React from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

interface IStaticDocViewerProps {
  doc: { name: string; uri: string };
}

export default class StaticDocViewer extends React.Component<
  IStaticDocViewerProps
> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { doc } = this.props;
    return (
      <DocViewer
        key={doc.name}
        documents={[doc]}
        pluginRenderers={DocViewerRenderers}
        config={{
          header: {
            disableHeader: true,
          },
        }}
        style={{
          boxShadow: 'inset -2vw -2vw 3vw #d4d4d4',
          borderRadius: '10px',
        }}
      />
    );
  }
}
