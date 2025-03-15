const BLOCK_MKP_CSS = `
<style>
  :host {
    display: inline-block;
    position: relative;
    background-color: var(--bg-color);
    color: var(--color, currentColor);
    padding: var(--mesh-step, 10px);
    border-radius: var(--border-radius-min);
    --local-border-style: solid;
  }
  :host([outline]) {
    box-sizing: border-box;
    border: 1px var(--local-border-style) currentColor;
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
    padding: 0;
    padding-left: 1em;
    border-left: 2px solid currentColor;
    border-radius: 0;
  }
  .glow-bg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: currentColor;
    opacity: 0.1;
    pointer-events: none;
  }
  :host([glow]) {
    padding-top: var(--mesh-step, 10px);
    padding-bottom: var(--mesh-step, 10px);
    padding-right: var(--mesh-step, 10px);
  }
  :host([glow]) .glow-bg {
    display: block;
  }
</style>
`;
export {BLOCK_MKP_CSS};