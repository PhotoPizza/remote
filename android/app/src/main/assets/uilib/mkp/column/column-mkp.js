import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {COLUMN_MKP_CSS} from './column-mkp.css.js';
import {COLUMN_MKP_TPL} from './column-mkp.tpl.js';

class ColumnMkp extends ElementExt {

  static get is() {
    return 'column-mkp';
  }

}

ColumnMkp.styles = COLUMN_MKP_CSS;
ColumnMkp.template = COLUMN_MKP_TPL;

UILIBReg.define(ColumnMkp);

export {ColumnMkp};