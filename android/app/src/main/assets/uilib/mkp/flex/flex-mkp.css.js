const FLEX_MKP_CSS = `
<style>
  :host {
    display: flex;
    --local-mesh-step: var(--mesh-step, 10px);
    --local-gap: 0;
    margin-left: calc(var(--local-gap) * -1);
    margin-top: calc(var(--local-gap) * -1);
  }
  :host ::slotted(*) {
    margin-left: var(--local-gap);
    margin-top: var(--local-gap);
  }
  :host([gap-min]) {
    --local-gap: calc(var(--local-mesh-step) / 2);
  }
  :host([gap-max]) {
    --local-gap: calc(var(--local-mesh-step) * 2);
  }
  :host([gap-mid]) {
    --local-gap: var(--local-mesh-step);
  }
  :host([inline]) {
    display: inline-flex;
  }
  :host([h-center]) {
    justify-content: center;
  }
  :host([h-space]) {
    justify-content: space-between;
  }
  :host([h-spread]) {
    justify-content: space-around;
  }
  :host([h-start]) {
    justify-content: flex-start;
  }
  :host([h-end]) {
    justify-content: flex-end;
  }
  :host([v-center]) {
    align-items: center;
  }
  :host([v-start]) {
    align-items: flex-start;
  }
  :host([v-end]) {
    align-items: flex-end;
  }
  :host([column]) {
    flex-direction: column;
  }
  :host([wrap]) {
    flex-wrap: wrap;
  }
  @media screen and (max-width:800px) {
    :host([adaptive]) {
      flex-wrap: wrap;
    }
  }
</style>
`;
export {FLEX_MKP_CSS};