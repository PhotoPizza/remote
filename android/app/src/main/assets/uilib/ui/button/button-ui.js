import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {BUTTON_UI_CSS} from './button-ui.css.js';
import {BUTTON_UI_TPL} from './button-ui.tpl.js';
import {IconUi} from '../icon/icon-ui.js';

class ButtonUi extends ElementExt {

  static get is() {
    return 'button-ui';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
  }

  set icon(icon) {
    this['icon-el'].setAttribute('icon', icon);
  }
}

ButtonUi.styles = BUTTON_UI_CSS;
ButtonUi.template = BUTTON_UI_TPL;
ButtonUi.logicAttributes = [
  'icon',
];

UILIBReg.define(ButtonUi);

export {ButtonUi};