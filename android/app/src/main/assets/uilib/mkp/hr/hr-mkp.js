import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {HR_MKP_CSS} from './hr-mkp.css.js';

class HrMkp extends ElementExt {

  static get is() {
    return 'hr-mkp';
  }

}

HrMkp.styles = HR_MKP_CSS;

UILIBReg.define(HrMkp);

export {HrMkp};