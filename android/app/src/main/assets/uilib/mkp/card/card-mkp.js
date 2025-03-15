import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {CARD_MKP_CSS} from './card-mkp.css.js';
import {CARD_MKP_TPL} from './card-mkp.tpl.js';

class CardMkp extends ElementExt {

  static get is() {
    return 'card-mkp';
  }

}

CardMkp.styles = CARD_MKP_CSS;
CardMkp.template = CARD_MKP_TPL;
UILIBReg.define(CardMkp);

export {CardMkp};