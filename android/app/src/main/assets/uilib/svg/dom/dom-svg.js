import {UILIBReg} from '../../utils/registry/registry.js';

class DomSvg extends HTMLElement {
  
    static get is() {
      return 'dom-svg';
    }
  
    static get observedAttributes() {
      return [
        'src',
        'height',
        'width',
      ];
    }
    
    /**
     * 
     * @param {string} svg 
     */
    _addSvgXml(svg) {
      this.$.innerHTML = svg;
      this.style.removeProperty('opacity');
      this._initialized = true;
    }

    /**
     * 
     * @argument {string} path
     */
    set src(path) {
      if (DomSvg.cache.has(path)) {
        this._addSvgXml(DomSvg.cache.get(path));
      } else {
        fetch(path).then((response) => {
          return response.text();
        }).then((xmlText) => {
          this._addSvgXml(xmlText);
          DomSvg.cache.set(path, xmlText);
        });
      }
    }

    _setStyles(stylesObj = {}) {
      for (let prop in stylesObj) {
        this.style.setProperty(prop, stylesObj[prop]);
      }
    }

    set height(h) {
      h += 'px';
      this._setStyles({
        'height': h,
        'min-height': h,
      });
    }

    set width(w) {
      w += 'px';
      this._setStyles({
        'width': w,
        'min-width': w,
      });
    }
  
    constructor() {
      super();
      this.$ = this.attachShadow({
        mode: 'open',
      });
    }
  
    attributeChangedCallback(attrName, oldVal, newVal) {
      this[attrName] = newVal;
    }

    connectedCallback() {
      // Moved from constructor to fix Safari:
      this._setStyles({
        'display': 'inline-block',
        'transition': '0.4s',
        'will-change': 'opacity',
        'opacity': this._initialized ? '1' : '0.1',
      });
    }
  }

  DomSvg.cache = new Map();

  UILIBReg.define(DomSvg);

  export {DomSvg};