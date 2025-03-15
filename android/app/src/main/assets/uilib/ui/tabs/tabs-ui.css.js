const TABS_UI_CSS = `
<style>
  :host {
    display: flex;
    border-bottom: 2px solid currentColor;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }
  ::slotted([tab]) {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: var(--ui-height, 38px);
    color: currentColor;
    cursor: pointer;
    padding-left: 1em;
    padding-right: 1em;
    border-radius: var(--border-radius-min, 2px);
    flex-grow: 1;
    box-sizing: border-box;
    transition: 0.2s;
    user-select: none;
  }
  ::slotted([active]) {
    filter: invert(1);
    cursor: auto;
    pointer-events: none;
  }
  .slider {
    position: absolute;
    height: 100%;
    width: 0;
    top: 0;
    left: 0;
    background-color: currentColor;
    border-top-left-radius: var(--border-radius-mid, 4px);
    border-top-right-radius: var(--border-radius-mid, 4px);
    transition: left 0.2s;
    will-change: left;
  }
</style>
`;
export {TABS_UI_CSS};