import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {BLOCK_MKP_CSS} from './block-mkp.css.js';
import {BLOCK_MKP_TPL} from './block-mkp.tpl.js';

class BlockMkp extends ElementExt {

  static get is() {
    return 'block-mkp';
  }

}

BlockMkp.styles = BLOCK_MKP_CSS;
BlockMkp.template = BLOCK_MKP_TPL;
UILIBReg.define(BlockMkp);

export {BlockMkp};