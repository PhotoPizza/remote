import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {SELECT_UI_CSS} from './select-ui.css.js';
import {SELECT_UI_TPL} from './select-ui.tpl.js';

class SelectUi extends ElementExt {

  static get is() {
    return 'select-ui';
  }

  constructor() {
    super();
    this._event = new Event('change');
  }

  set active(val) {
    if (val === this._active) {
      return;
    }
    this._active = val;
    if (val) {
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }
  }

  get active() {
    return this._active;
  }

  set value(val) {
    if (this._value === val) {
      return;
    }
    this._value = val;
    this.onchange && this.onchange();
  }

  get value() {
    return this._value;
  }

  connectedCallback() {
    super.connectedCallback();
    this.onclick = () => {
      this.active = !this.active;
    };
    setTimeout(() => {
      this._optArr = [...this.children];
      this._optArr.forEach((opt) => {
        let optVal = opt.getAttribute('option');
        if (this.value && this.value === optVal) {
          this['state'].textContent = opt.textContent;
        }
        opt.onclick = (e) => {
          this['state'].textContent = opt.textContent;
          this.value = optVal;
        };
      });
      if (!this.value) {
        this['state'].textContent = this._optArr[0] && this._optArr[0].textContent;
      }
    });
    
  }

}

SelectUi.styles = SELECT_UI_CSS;
SelectUi.template = SELECT_UI_TPL;

SelectUi.logicAttributes = [
  'value',
];

UILIBReg.define(SelectUi);

export {SelectUi};