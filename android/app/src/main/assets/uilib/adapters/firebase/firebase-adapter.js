class FirebaseAdapter extends HTMLElement {

  constructor() {
    super();
    this._config = Object.create(null);
  }

  static get observedAttributes() {
    return [
      'api-key',
      'version',
      'auth-domain',
      'database-url',
      'project-id',
      'storage-bucket',
      'messaging-sender-id',
      'auth',
    ];
  }

  _applyConfig() {
    let script = document.createElement('script');
    script.src = `https://www.gstatic.com/firebasejs/${this.version}/firebase.js`;
    document.body.appendChild(script);
    script.onload = () => {
      window.firebase.initializeApp(this._config);
      let event = new Event('firebase-ready');
      window.dispatchEvent(event);
      FirebaseAdapter.activeInstance = this;
      this._googleAuth = new window.firebase.auth.GoogleAuthProvider();
      window.firebase.auth().onAuthStateChanged((user) => {
        this.user = user;
        FirebaseAdapter.user = user;
        window.dispatchEvent(FirebaseAdapter.authStatusChangeEvent);
      });
    };
  }

  _writeToConfig(conf) {
    this._debounceTimeout && clearTimeout(this._debounceTimeout);
    Object.assign(this._config, conf);
    this._debounceTimeout = setTimeout(() => {
      this._applyConfig();
    });
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (FirebaseAdapter.activeInstance) {
      return;
    }
    let attrMap = {
      'api-key': 'apiKey',
      'version': 'version',
      'auth-domain': 'authDomain',
      'database-url': 'databaseURL',
      'project-id': 'projectId',
      'storage-bucket': 'storageBucket',
      'messaging-sender-id': 'messagingSenderId',
    };
    attrMap[name] && this._writeToConfig({[attrMap[name]]: newVal});
    name === 'version' && (this.version = newVal);
    name === 'auth' && (this.auth = true);
  }

  static logIn() {
    let auth = FirebaseAdapter.activeInstance._googleAuth;
    window.firebase.auth().signInWithPopup(auth).then((result) => {
      FirebaseAdapter.token = result.credential.accessToken;
      FirebaseAdapter.user = result.user;
      FirebaseAdapter.activeInstance.user = result.user;
      window.dispatchEvent(this.authStatusChangeEvent);
    }).catch((error) => {
      FirebaseAdapter.user = null;
      window.dispatchEvent(this.authStatusChangeEvent);
      console.warn(error.message);
    });
  }

  static logOut() {
    window.firebase.auth().signOut().then(() => {
      FirebaseAdapter.user = null;
      FirebaseAdapter.activeInstance.user = null;
      window.dispatchEvent(this.authStatusChangeEvent);
    }, (error) => {
      window.dispatchEvent(this.authStatusChangeEvent);
      console.warn(error.message);
    });
  }

}
FirebaseAdapter.activeInstance = null;
FirebaseAdapter.user = null;
FirebaseAdapter.token = null;
FirebaseAdapter.authStatusChangeEvent = new Event('fb-auth-status-changed');
window.customElements.define('firebase-adapter', FirebaseAdapter);

export {FirebaseAdapter};