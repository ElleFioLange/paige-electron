const testJson = {
  name: 'root',
  fav: false,
  children: [
    {
      name: 'folder1',
      fav: false,
      children: [
        { name: 'file1', fav: false, ext: 'pdf' },
        { name: 'file2', fav: true, ext: 'doc' },
        { name: 'file3', fav: true, ext: 'pdf' },
        {
          name: 'folder2',
          fav: true,
          children: [
            { name: 'file1', fav: false, ext: 'pptx' },
            { name: 'file2', fav: false, ext: 'txt' },
          ],
        },
      ],
    },
    { name: 'file1', fav: true, ext: 'pdf' },
    {
      name: 'folder2',
      fav: false,
      children: [
        { name: 'file1', fav: false, ext: 'pdf' },
        { name: 'folder3', fav: false, children: [] },
      ],
    },
  ],
};

const fs = loadJson(testJson);

const testFile = new File('test', false, 'pdf');
fs.insertItem(testFile);
const a = new File('aaa', false, 'txt');


// function dispDir(d) {
//   return (
//     <Collapse expandIcon={({ isActive }) => isActive ? <FolderOpenFilled/> : <FolderOutlined/>}>
//       {d.dirs.map((dir) => {
//         return (
//           <Panel header={dir.name} key={dir.name}>
//             <div style={{ marginBottom: '16px' }}>
//               <Button style={{ marginRight: '16px' }} icon={<SearchOutlined />}>Search this folder</Button>
//               <Button style={{ marginRight: '16px' }} icon={<DeleteOutlined />}>Delete</Button>
//               <Button style={{ marginRight: '16px' }} icon={dir.fav ? <StarFilled /> : <StarOutlined />}>Favorite</Button>
//               <Button style={{ marginRight: '16px' }} icon={<EditOutlined />}>Rename</Button>
//             </div>
//             {dispDir(dir)}
//           </Panel>
//         )
//       })}
//       {d.files ?
//         <List bordered>
//           {d.files.map((file) => (
//             <List.Item style={{ padding: '16px' }}>
//               <List.Item.Meta
//                 avatar={fIconSwitch(file.ext)}
//                 title={file.name}
//                 description={
//                   <>
//                   <Button style={{ marginRight: '16px' }} icon={<SearchOutlined />}>Search</Button>
//                   <Button style={{ marginRight: '16px' }} icon={<DeleteOutlined />}>Delete</Button>
//                   <Button style={{ marginRight: '16px' }} icon={file.fav ? <StarFilled /> : <StarOutlined />}>Favorite</Button>
//                   <Button style={{ marginRight: '16px' }} icon={<EditOutlined />}>Rename</Button>
//                   </>
//                 } />
//             </List.Item>
//             )
//           )}
//         </List> :
//         <p key='hello what the fuck'>Empty folder</p>
//       }
//     </Collapse>
//   )
// }

const dsu = (arr1, arr2) => arr1
  .map((item, index) => [arr2[index], item])
  .sort()
  .map(([, item]) => item);

const alphaSort = (list: []) => {
  const out = list.map(item => item);
  const names = list.map(item => item.name);
  return dsu(out, names)
}

console.log(fs.json());

const sortSwitch = (name: string) => {
  switch(name) {
    case 'alpha':
      return alphaSort;
  }
}

function onDrop({event, node, dragNode, dragNodesKeys}) {
  console.log('---------------');
  console.log(event);
  console.log(node);
  console.log(dragNode);
  console.log(dragNodesKeys);
  console.log('---------------');
}
