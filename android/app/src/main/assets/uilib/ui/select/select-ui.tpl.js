const SELECT_UI_TPL = `
<div class="select-ui_state" id="state"></div>
<div class="select-ui_menu-down">
  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
  </svg>
</div>
<div class="select-ui_options">
  <slot></slot>
</div>
`;
export {SELECT_UI_TPL};