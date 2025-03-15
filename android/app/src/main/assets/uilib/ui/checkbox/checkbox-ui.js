import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {CHECKBOX_UI_CSS} from './checkbox-ui.css.js';
import {CHECKBOX_UI_TPL} from './checkbox-ui.tpl.js';

class CheckboxUi extends ElementExt {

  static get is() {
    return 'checkbox-ui';
  }

  constructor() {
    super();
    this.checked = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', '0');
    this.checked = this.getAttribute('checked');
    this.onclick = () => {
      this.checked = !this.checked;
      this.setAttribute('checked', this.checked);
      if (this._nameOfClass) {
        CheckboxUi.namedGroups[this._nameOfClass].forEach((el) => {
          if (el !== this) {
            el.setAttribute('checked', false);
            el.checked = false;
          }
        });
      }
    };
  }

  set name(val) {
    if (val === this._nameOfClass) {
      return;
    }
    if (CheckboxUi.namedGroups[val]) {
      CheckboxUi.namedGroups[val].push(this);
    } else {
      CheckboxUi.namedGroups[val] = [this];
    }
    this._nameOfClass = val;
  }
}

CheckboxUi.styles = CHECKBOX_UI_CSS;
CheckboxUi.template = CHECKBOX_UI_TPL;
CheckboxUi.logicAttributes = [
  'name'
];
CheckboxUi.namedGroups = Object.create(null);

UILIBReg.define(CheckboxUi);

export {CheckboxUi};