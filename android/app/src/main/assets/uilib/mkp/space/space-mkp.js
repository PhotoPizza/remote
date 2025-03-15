import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {SPACE_MKP_CSS} from './space-mkp.css.js';

class SpaceMkp extends ElementExt {

  static get is() {
    return 'space-mkp';
  }

}

SpaceMkp.styles = SPACE_MKP_CSS;

UILIBReg.define(SpaceMkp);

export {SpaceMkp};