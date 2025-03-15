import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {INPUT_UI_CSS} from './input-ui.css.js';
import {INPUT_UI_TPL} from './input-ui.tpl.js';

class InputUi extends ElementExt {

  static get is() {
    return 'input-ui';
  }

  constructor() {
    super();
    this._inputEvent = new Event('input');
  }

  connectedCallback() {
    super.connectedCallback();
    this['input'].onfocus = () => {
      this.setAttribute('focused', '');
    };
    this['input'].onblur = () => {
      this.removeAttribute('focused');
    };
    this['input'].oninput = () => {
      this.value = this['input'].value;
      this.dispatchEvent(this._inputEvent);
      this.oninput && this.oninput();
    };
  }

  set value(val) {
    this._value = val;
    if (this['input'].value !== val) {
      this['input'].value = val;
    }
  }

  get value() {
    return this._value;
  }

  set type(val) {
    this['input'].setAttribute('type', val);
  }

  set placeholder(val) {
    this['input'].setAttribute('placeholder', val);
  }

}

InputUi.styles = INPUT_UI_CSS;
InputUi.template = INPUT_UI_TPL;
InputUi.logicAttributes = [
  'value',
  'type',
  'placeholder',
];

UILIBReg.define(InputUi);

export {InputUi};