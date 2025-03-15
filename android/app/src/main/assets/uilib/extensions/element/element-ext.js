class ElementExt extends HTMLElement {

  static fixCSS(cssStr = '') {
    if (window['ShadyDOM'] && window['ShadyDOM'].inUse) {
      cssStr = cssStr.split(':host(').join(this.is).split('])').join(']').split(':host').join(this.is);
    }
    return cssStr.trim();
  }

  /**
   * 
   * @param {String} css
   */
  static set styles(css) {
    if (css === this.__styles) {
      return;
    }
    this.__styles = this.fixCSS(css);
  }

  static get styles() {
    return this.__styles || '';
  }

  /**
   * 
   * @param {String} tpl
   */
  static set template(tpl) {
    if (tpl === this.__template) {
      return;
    }
    this.__template = tpl.trim();
  }

  static get template() {
    return this.__template || '';
  }

  /**
   * 
   * @param {Boolean} val
   */
  static set isGlobal(val) {
    if (val === this.__isGlobal) {
      return;
    }
    this.__isGlobal = val;
    if (val) {
      window[this.name] = this;
    }
  }

  static get isGlobal() {
    return this.__isGlobal;
  }

  /**
   * 
   * @param {Boolean} val
   */
  set selected(val) {
    if (val === this._selected) {
      return;
    }
    this._selected = val;
    if (val) {
      window[this.constructor.name].instances.forEach((inst) => {
        if (inst !== this) {
          inst.selected = false;
        }
      });
    } else {
      this.selected = false;
    }
  }

  get selected() {
    return this._selected;
  }

  parseTpl() {
    if (this._elementsWithId) {
      return;
    }
    this._elementsWithId = [...this.$.querySelectorAll('[id]')];
    this._elementsWithId.forEach((el) => {
      let elIdName = el.getAttribute('id');
      this[elIdName] = el;
    });
  }

  constructor() {
    super();
    this.$ = this.attachShadow({mode: 'open'});
    this.initialRender();
    if (this.constructor.isGlobal) {
      if (!window[this.constructor.name].instances) {
        window[this.constructor.name].instances = new Set();
      }
      window[this.constructor.name].instances.add(this);
    }
  }

  initialRender() {
    this.$.innerHTML = this.constructor['styles'] + this.constructor['template'];
  }

  connectedCallback() {
    this.parseTpl();
  }

  /**
   * 
   * @param {Array} val
   */
  static set logicAttributes(val) {
    if (val.length) {
      Object.defineProperty(this, 'observedAttributes', {
        get: () => {
          return [...val];
        },
      });
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (newVal === oldVal) {
      return;
    }
    this.parseTpl();
    this[name] = newVal;
  }

}

ElementExt.is = null;

export {ElementExt};