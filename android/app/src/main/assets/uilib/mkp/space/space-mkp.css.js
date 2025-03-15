const SPACE_MKP_CSS = `
<style>
  :host {
    --local-height: var(--mesh-step, 10px);
    display: block;
    height: var(--local-height);
    width: var(--local-height);
  }
  :host([max]) {
    --local-height: calc(var(--mesh-step, 10px) * 2);
  }
  :host([min]) {
    --local-height: calc(var(--mesh-step, 10px) / 2);
  }
  :host([mid]) {
    --local-height: var(--mesh-step, 10px);
  }
  :host([inline]) {
    display: inline-block;
  }
</style>
`;
export {SPACE_MKP_CSS};