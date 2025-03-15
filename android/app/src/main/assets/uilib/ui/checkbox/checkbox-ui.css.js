const CHECKBOX_UI_CSS = `
<style>
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: var(--ui-height, 38px);
    width: var(--ui-height, 38px);
    border-radius: var(--border-radius, 2px);
    box-sizing: border-box;
    color: var(--color, currentColor);
    border: var(--border-width, 2px) solid currentColor;
    cursor: pointer;
  }

  .checkbox-ui_inner {
    height: 12px;
    width: 12px;
    background-color: currentColor;
    border-radius: var(--border-radius, 100%);
    box-shadow: 0 0 var(--mesh-step-mid, 10px) currentColor;
    opacity: 0;
    transition: 0.2s;
    pointer-events: none;
  }

  :host([checked="true"]) .checkbox-ui_inner {
    opacity: 1;
  }
</style>
`;
export {CHECKBOX_UI_CSS};