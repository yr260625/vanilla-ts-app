import { TabGroup } from 'src/tab-group';
import { TableStructure } from 'src/table-structure';

window.addEventListener('load', () => {
  const table = new TableStructure();
  table.setupPage();
  const tabGroup = new TabGroup();
  tabGroup.setupPage();
});
