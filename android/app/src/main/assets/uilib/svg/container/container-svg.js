import {UILIBReg} from '../../utils/registry/registry.js';

class ContainerSVG extends HTMLElement {

  static get is() {
    return 'container-svg';
  }

  static get observedAttributes() {
    return [
      'width',
      'height',
    ];
  }

  get height() {
    return this._height;
  }

  set height(val) {
    this._height = val;
    if (this._initialized) {
      this._render();
    }
  }

  get width() {
    return this._width;
  }

  set width(val) {
    this._width = val;
    if (this._initialized) {
      this._render();
    }
  }

  get template() {
    return `
      <style>
        :host {
          display: inline-block;
        }
      </style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        height="${this._height}"
        width="${this._width}"
        wiewBox="0 0 ${this._width} ${this._height}">${this.innerHTML}</svg>
    `;
  }

  constructor() {
    super();
    this._height = 50;
    this._width = 50;
    this.$ = this.attachShadow({
      mode: 'open',
    });
  }

  _render() {
    this.$.innerHTML = this.template;
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this[attrName] = newVal;
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      this._render();
      this._initialized = true;
    });
  }
}
UILIBReg.define(ContainerSVG);

export {ContainerSVG};