const BUTTON_UI_CSS = `
<style>
  :host {
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    height: var(--height, 38px);
    font-size: var(--font-size, 19px);
    padding-left: 0.6em;
    padding-right: 0.6em;
    background-color: var(--background-color, #eee);
    color: var(--color, currentColor);
    border-radius: var(--border-radius, 2px);
    cursor: pointer;
    text-decoration: none;
    user-select: none;
    box-sizing: border-box;
  }
  :host(:focus) {
    outline-offset: 2px;
    outline-color: auto;
    outline-style:groove;
    outline-width: 1px;
  }
  .icon-ui_block {
    display: inline-flex;
    flex-wrap: nowrap;
    flex-grow: 1;
  }
  :host([outline]) {
    border: var(--border-width, 2px) solid currentColor;
    background: none;
  }
  :host([invert]) {
    background-color: currentColor;
  }
  :host([invert]) .icon-ui_block {
    filter: invert(1) grayscale(1);
  }
  :host([invert]) .icon-ui_icon-ui {
    filter: invert(1) grayscale(1);
  }
  .icon-ui_icon-ui {
    display: none;
  }
  :host([icon]) .icon-ui_icon-ui {
    display: inline-block;
    padding-right: 0.4em;
  }
</style>
`;
export {BUTTON_UI_CSS}