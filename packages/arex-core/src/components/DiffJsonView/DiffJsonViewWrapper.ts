import styled from '@emotion/styled';

const DiffJsonViewWrapper = styled.div`
  #MsgWithDiffJsonEditorWrapper {
    display: flex;
  }
  #MsgWithDiffJsonEditorWrapper #containerLeft {
    height: 100%;
    width: 50%;
    margin-right: 14px;
  }
  #MsgWithDiffJsonEditorWrapper #containerRight {
    height: 100%;
    width: 50%;
  }

  #MsgWithDiffJsonEditorWrapper #containerLeft .different_element_ig {
    background-color: #bfbfbf;
  }
  #MsgWithDiffJsonEditorWrapper #containerRight .different_element_ig {
    background-color: #bfbfbf;
  }
  #MsgWithDiffJsonEditorWrapper .jsoneditor-main {
    border: 1px solid #eee;
  }
  #MsgWithDiffJsonEditorWrapper .jsoneditor-main .value {
    color: #1a1a1a;
  }
  /*不同数据结构颜色*/
  div.jsoneditor-value.jsoneditor-string {
    color: #000000;
  }
  div.jsoneditor-value.jsoneditor-number {
    color: #000000;
  }
  div.jsoneditor-value.jsoneditor-boolean {
    color: #000000;
  }
  div.jsoneditor-value.jsoneditor-null {
    color: #000000;
  }
  .MsgWithDiffLegend {
    display: flex;
    margin: 10px;
  }
  .MsgWithDiffLegend > div {
    display: flex;
    margin-right: 14px;
  }
  .MsgWithDiffLegend > div > .color-tag-difference {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  .MsgWithDiffLegend > div > .color-tag-more {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  .MsgWithDiffLegend > div > .color-tag-grey {
    width: 20px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.25);
    margin-right: 8px;
  }
  .insert-area {
    display: none !important;
  }
  .context-menu-button-anchor {
    display: none;
  }
  .jse-navigation-bar {
    height: 32px !important;
  }
  .jsoneditor-contextmenu .row {
    width: 150px;
    padding: 4px 0;
  }
  .jsoneditor-contextmenu .row button {
    text-align: left;
  }
  .jsoneditor-contextmenu-button {
    display: none !important;
  }
  .jsoneditor-menu > button {
    display: none !important;
  }
  .jsoneditor-menu,
  .jsoneditor-navigation-bar {
    display: none !important;
  }

  /*黑暗模式*/

  /* dark styling of the editor */
  .dark-jsoneditor div.jsoneditor,
  .dark-jsoneditor div.jsoneditor-menu {
    border-color: #4b4b4b;
  }
  .dark-jsoneditor div.jsoneditor-menu {
    background-color: #4b4b4b;
  }
  .dark-jsoneditor div.jsoneditor-tree,
  .dark-jsoneditor div.jsoneditor textarea.jsoneditor-text {
    background-color: #666666;
    color: #ffffff;
  }
  .dark-jsoneditor div.jsoneditor-field,
  .dark-jsoneditor div.jsoneditor-value {
    color: #ffffff;
  }
  .dark-jsoneditor table.jsoneditor-search div.jsoneditor-frame {
    background: #808080;
  }
  .dark-jsoneditor tr.jsoneditor-highlight,
  .dark-jsoneditor tr.jsoneditor-selected {
    background-color: #808080;
  }
  .dark-jsoneditor div.jsoneditor-field[contenteditable='true']:focus,
  .dark-jsoneditor div.jsoneditor-field[contenteditable='true']:hover,
  .dark-jsoneditor div.jsoneditor-value[contenteditable='true']:focus,
  .dark-jsoneditor div.jsoneditor-value[contenteditable='true']:hover,
  .dark-jsoneditor div.jsoneditor-field.jsoneditor-highlight,
  .dark-jsoneditor div.jsoneditor-value.jsoneditor-highlight {
    background-color: #808080;
    border-color: #808080;
  }
  .dark-jsoneditor div.jsoneditor-field.highlight-active,
  .dark-jsoneditor div.jsoneditor-field.highlight-active:focus,
  .dark-jsoneditor div.jsoneditor-field.highlight-active:hover,
  .dark-jsoneditor div.jsoneditor-value.highlight-active,
  .dark-jsoneditor div.jsoneditor-value.highlight-active:focus,
  .dark-jsoneditor div.jsoneditor-value.highlight-active:hover {
    background-color: #b1b1b1;
    border-color: #b1b1b1;
  }
  .dark-jsoneditor div.jsoneditor-tree button:focus {
    background-color: #868686;
  }
  /* coloring of JSON in tree mode */
  .dark-jsoneditor div.jsoneditor-readonly {
    color: #acacac;
  }
  .dark-jsoneditor div.jsoneditor td.jsoneditor-separator {
    color: #acacac;
  }
`;

export default DiffJsonViewWrapper;
