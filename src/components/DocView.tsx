import React from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

interface IDocView {
  doc: { name: string; uri: string; ftype: string; fav: boolean };
}

export default class DocView extends React.Component<IDocView> {
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

// const DocView = ({ openDocs, idx }) => {
//   const doc = openDocs[idx];
//   return (
//     <DocViewer
//       key={doc.name}
//       documents={[doc]}
//       pluginRenderers={DocViewerRenderers}
//       config={{
//         header: {
//           disableHeader: true,
//         },
//       }}
//       style={{
//         boxShadow: 'inset -2vw -2vw 3vw #d4d4d4',
//         borderRadius: '10px',
//       }}
//     />
//   );
// };

// export default DocView;
