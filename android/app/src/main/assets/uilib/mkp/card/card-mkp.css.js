const CARD_MKP_CSS = `
<style>
  :host {
    display: inline-block;
    background-color: var(--bg-color, #eee);
    color: var(--color, currentColor);
    padding: var(--mesh-step, 10px);
    border-radius: var(--border-radius-min, 2px);
    --local-border-style: solid;
  }
  :host([outline]) {
    box-sizing: border-box;
    border: 1px var(--local-border-style) currentColor;
    background: none;
  }
  :host([dotted]) {
    --local-border-style: dotted;
  }
  :host([dashed]) {
    --local-border-style: dashed;
  }
  :host([grow]) {
    display: block;
    flex-grow: 1;
  }
  :host([paragraph]) {
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
    background: none;
    border-left: 2px solid currentColor;
  }
</style>
`;
export {CARD_MKP_CSS};