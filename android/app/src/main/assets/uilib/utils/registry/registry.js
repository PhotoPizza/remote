class UILIBReg {

  /**
   * 
   * @param {Object} elConstr 
   */
  static define(elConstr) {
    if (window.customElements && window.customElements.define && !this.reg.has(elConstr)) {
      window.customElements.define(elConstr.is, elConstr);
      this.reg.add(elConstr);
    } else if(!this.reg.has(elConstr)) {
      console.warn('Need to load plyfills first...');
    } else {
      console.warn(`Component ${elConstr.is} - is in registry already.`);
    }
  }

}

UILIBReg.reg = new Set();
window.UILIBReg = UILIBReg;
export {UILIBReg};