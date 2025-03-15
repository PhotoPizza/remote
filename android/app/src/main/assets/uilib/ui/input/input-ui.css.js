const INPUT_UI_CSS = `
<style>
  :host {
    display: inline-flex;
    align-items: center;
    height: var(--ui-height, 38px);
    border-bottom: 2px solid currentColor;
    position: relative;
    border-top-left-radius: var(--border-radius-min, 2px);
    border-top-right-radius: var(--border-radius-min, 2px);
    overflow: hidden;
    color: currentColor;
  }

  .input-ui_shade {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0.18;
    background-color: currentColor;
    transition: 0.2s;
  }

  :host([focused]) .input-ui_shade {
    background-color: rgba(0, 0, 0, 0);
  }

  .input-ui_input {
    display: block;
    border: none;
    height: 100%;
    padding-left: 0.5em;
    padding-right: 0.5em;
    background: none;
    color: currentColor;
    -webkit-appearance: none;
    outline: none;
    font-size: 18px;
  }

  ::placeholder {
    color: currentColor;
    opacity: 0.4;
  }

  ::-webkit-input-placeholder {
    color: currentColor;
    opacity: 0.4;
  }

  ::-moz-placeholder {
    color: currentColor;
    opacity: 0.4;
  }

  ::-ms-input-placeholder {
    color: currentColor;
    opacity: 0.4;
  }
</style>
`;
export {INPUT_UI_CSS};