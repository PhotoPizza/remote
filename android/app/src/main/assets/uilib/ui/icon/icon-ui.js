import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {ICON_UI_CSS} from './icon-ui.css.js';
import {ICON_UI_TPL} from './icon-ui.tpl.js';


if (!window['AppIconsMap']) {
  window['AppIconsMap'] = Object.create(null);
}

window['AppIconsMap'].default = `<circle cx="12" cy="12" r="8"></circle>`;

class IconUi extends ElementExt {

  static get is() {
    return 'icon-ui';
  }

  constructor() {
    super();
    this._icons = window['AppIconsMap'];
    this.defaultIcon = this._icons.default;
  }

  set icon(val) {
    this['svg'].innerHTML = this._icons[val] || this.defaultIcon;
  }

}

IconUi.styles = ICON_UI_CSS;
IconUi.template = ICON_UI_TPL;
IconUi.logicAttributes = [
  'icon',
];

UILIBReg.define(IconUi);

export {IconUi};