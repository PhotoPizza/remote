const CAPTION_MKP_CSS = `
<style>
  :host {
    display: flex;
    padding-top: 2.4em;
    padding-bottom: 1.2em;
    color: var(--color, currentColor);
  }
  .icon {
    display: flex;
    align-items: center;
    height: 2.5em;
  }
  .text {
    margin-left: 1em;
  }
  .header {
    font-size: 2em;
  }
  .subheader {
    margin-top: 0.5em;
    font-size: 1.2em;
  }
  @media screen and (max-width: 700px) {
    .header {
      font-size: 1.6em;
    }
    .subheader {
      margin-top: 0.4em;
      font-size: 1.1em;
    }
  }
</style>
`;
export {CAPTION_MKP_CSS};