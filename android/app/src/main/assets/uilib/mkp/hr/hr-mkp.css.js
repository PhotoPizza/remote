const HR_MKP_CSS = `
<style>
  :host {
    display: block;
    --local-type: solid;
    --local-thickness: 1px;
    border-bottom: var(--local-thickness) var(--local-type) currentColor;
  }
  :host([light]) {
    opacity: 0.5;
  }
  :host([heavy]) {
    --local-thickness: 2px;
  }
  :host([dashed]) {
    --local-type: dashed;
  }
  :host([dotted]) {
    --local-type: dotted;
  }
</style>
`;
export {HR_MKP_CSS};