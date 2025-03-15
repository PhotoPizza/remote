import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {CAPTION_MKP_CSS} from './caption-mkp.css.js';
import {CAPTION_MKP_TPL} from './caption-mkp.tpl.js';

class CaptionMkp extends ElementExt {

  static get is() {
    return 'caption-mkp';
  }

}

CaptionMkp.styles = CAPTION_MKP_CSS;
CaptionMkp.template = CAPTION_MKP_TPL;
UILIBReg.define(CaptionMkp);

export {CaptionMkp};