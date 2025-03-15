const SELECT_UI_CSS = `
<style>
  :host {
    position: relative;
    display: inline-block;
    font-size: 18px;
  }

  .select-ui_state {
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
    height: var(--ui-height, 38px);
    padding-left: 1em;
    padding-right: calc(1em + 20px);
    border: 2px solid currentColor;
    box-sizing: border-box;
    border-radius: var(--border-radius-min, 2px);
    color: currentColor;
    user-select: none;
    cursor: pointer;
  }

  .select-ui_menu-down {
    position: absolute;
    right: 8px;
    top: calc(50% - 12px);
    transform-origin: center center;
    transition: 0.2s;
    height: 24px;
    width: 24px;
    cursor: pointer;
  }

  .select-ui_options {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(95%);
    pointer-events: none;
    opacity: 0;
    transition: 0.2s;
    border-radius: var(--border-radius-min, 2px);
    background-color: currentColor;
    min-width: 100%;
    box-shadow: 0 0 12px currentColor;
    z-index: 10000;
  }

  ::slotted([option]) {
    display: flex;
    align-items: center;
    height: var(--ui-height, 38px);
    padding-left: 1em;
    padding-right: 1em;
    cursor: pointer;
    white-space: nowrap;
    color: currentColor;
    filter: invert(1);
    user-select: none;
  }

  :host([active]) .select-ui_options {
    pointer-events: auto;
    opacity: 1;
    transform: translateY(100%);
  }

  :host([active]) .select-ui_menu-down {
    transform: rotate(180deg);
  }
</style>
`; 
export {SELECT_UI_CSS};