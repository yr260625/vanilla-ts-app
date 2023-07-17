import { TabGroup } from 'src/tab-group';
import { TableStructure } from 'src/table-structure';
import { TreeStructure } from 'src/tree-structure';

window.addEventListener('load', () => {
  const table = new TableStructure();
  table.embedComponent();
  const tree = new TreeStructure();
  tree.embedComponent();
  const tabGroup = new TabGroup();
  tabGroup.setupPage();
});
