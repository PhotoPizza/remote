import {ElementExt} from '../../extensions/element/element-ext.js';
import {UILIBReg} from '../../utils/registry/registry.js';
import {TABS_UI_CSS} from './tabs-ui.css.js';
import {TABS_UI_TPL} from './tabs-ui.tpl.js';

class TabsUi extends ElementExt {

  static get is() {
    return 'tabs-ui';
  }

  constructor() {
    super();
    this._event = new Event('change', {});
  }


  connectedCallback() {
    super.connectedCallback();
    window.setTimeout(() => {
      this._tabsArr = [...this.querySelectorAll('[tab]')];
      this._rect = this.getBoundingClientRect();
      this._tabsArr.forEach((tab) => {
        let tabIcon = tab.getAttribute('icon');
        if (tabIcon) {
          tab.innerHTML = `<icon-ui icon="${tabIcon}"></icon-ui>&nbsp;&nbsp;` + tab.textContent;
        }
        let setSlider = () => {
          let tabRect = tab.getBoundingClientRect();
          this['slider'].style.width = tabRect.width + 'px';
          this['slider'].style.left = (tabRect.left - this._rect.left) + 'px';
        };
        let isActive = tab.hasAttribute('active');
        if (isActive) {
          setSlider();
        }
        tab.onclick = () => {
          this._tabsArr.forEach((tb) => {
            if (tb !== tab) {
              tb.removeAttribute('active');
            }
          });
          tab.setAttribute('active', '');
          setSlider();
          let event = new CustomEvent('change', {
            detail: tab.getAttribute('tab'),
          });
          this.dispatchEvent(event);
        };
      });
    });
  }

}

TabsUi.styles = TABS_UI_CSS;
TabsUi.template = TABS_UI_TPL;

UILIBReg.define(TabsUi);

export {TabsUi};