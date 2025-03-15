import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {FLEX_MKP_CSS} from './flex-mkp.css.js';
import {FLEX_MKP_TPL} from './flex-mkp.tpl.js';


class FlexMkp extends ElementExt {

  static get is() {
    return 'flex-mkp';
  }

}

FlexMkp.styles = FLEX_MKP_CSS;
FlexMkp.template = FLEX_MKP_TPL;

UILIBReg.define(FlexMkp);

export {FlexMkp};