// @ts-check
'use strict';

if (!window['AppIconsMap']) {
  window['AppIconsMap'] = Object.create(null);
}

(function() {
  var config = {
    firmwareVersion: '',
    wifiSsid: 'PIZZA2000',
    wifiPassword: '9994501234',
    wsPort: 8000,
    state: 'waiting',
    framesLeft: 100,
    frame: 100,
    allSteps: 109295,
    pause: 100,
    delay: 300,
    speed: 5000,
    acceleration: 2000,
    shootingMode: 'inter',
    direction: 1
  };
 
  let configStr = JSON.stringify(config);
  let photoPizzaIP = '192.168.4.1';
  const $ = {};
  
  let elementsWithIdsArr = [...document.querySelectorAll('[id]')];
  elementsWithIdsArr.forEach((el, idx) => {
    $[el.getAttribute('id')] = el;
  });

  $['frame-left'].textContent = config.framesLeft;

  $['ip-inp'].setAttribute('value', photoPizzaIP);
  $['ip-inp'].oninput = (e) => {
    config.frame = $['ip-inp'].value;
  };

  $['shootingMode-sel'].setAttribute('value', config.shootingMode);
  $['shootingMode-sel'].onchange = (e) => {
    config.shootingMode = $['shootingMode-sel'].value;
  };

  $['direction-sel'].setAttribute('value', config.direction + '');
  $['direction-sel'].onchange = (e) => {
    config.direction = $['direction-sel'].value * 1;
  };

  $['frame-inp'].setAttribute('value', config.frame);
  $['frame-inp'].oninput = (e) => {
    config.frame = $['frame-inp'].value;
    config.framesLeft = $['frame-inp'].value;
    $['frame-left'].textContent = config.framesLeft;
    setTurnSection();
  };
  
  $['speed-inp'].setAttribute('value', config.speed);
  $['speed-inp'].oninput = (e) => {
    config.speed = $['speed-inp'].value;
  };
  
  $['pause-inp'].setAttribute('value', config.pause);
  $['pause-inp'].oninput = (e) => {
    config.pause = $['pause-inp'].value;
  };

  $['delay-inp'].setAttribute('value', config.delay);
  $['delay-inp'].oninput = (e) => {
    config.delay = $['delay-inp'].value;
  };

  $['allSteps-inp'].setAttribute('value', config.allSteps);
  $['allSteps-inp'].oninput = (e) => {
    config.allSteps = $['allSteps-inp'].value;
  };
  
  $['save-btn'].onclick = (e) => {
    save();
  };

  $['connect-btn'].onclick = (e) => {
    connect();
  };

  $['start-btn'].onclick = (e) => {
    start();
  };
  $['stop-btn'].onclick = (e) => {
    stop();
  };

  let ws;
  const connect = () => {
    ws = new WebSocket(`ws://${photoPizzaIP}:8000`, "protocolOne");
    //ws.onmessage = function (event) { console.log(JSON.parse(event.data)); };
    ws.onmessage = (e) => {
      let configIn = JSON.parse(e.data);
      config = configIn;
      console.log(configIn.state);
      if (configIn.state === 'started') {
        //setStatus(configIn.state);
        config = configIn;
        let dir = 1;
        let elem = {};
        if (config.direction === 1) {
          elem = document.getElementById(`section-deg${config.frame - config.framesLeft}`);
          dir = -1;
        } else {
          dir = 1;
          elem = document.getElementById(`section-deg${config.framesLeft}`);
        }
        let currentDeg = (360 / config.frame) * config.framesLeft * dir;
        $['frame-left'].textContent = config.framesLeft;
        $['degree'].style.transform = `rotate(${currentDeg}deg)`;
        
        elem.style.backgroundColor = '#42361e';
        //$['degree'].style.transform += `translate(100px, 0)`;
      }
      if (configIn.state === 'waiting') {
        setTurnSection();
        config.state = configIn.state;
      }
    }
    ws.onopen = (e) => {
      setStatus(e.type);
      console.log('connected');
    }
    ws.onerror = (e) => {
      setStatus(e.type);
      console.log('error');
      setTurnSection();
    };
    ws.onclose = (e) => {
      setStatus(e.type);
      console.log('disconnected');
      setTurnSection();
    };
  }

  const setTurnSection = () => {

    config.framesLeft = config.frame;
    $['frame-left'].textContent = config.framesLeft;
    
    let deg = 360 / config.frame;
    $['turn-section'].textContent = ``;
    
    let fragment = document.createDocumentFragment();
    for (var i = 0; i < config.frame; i++) {
      let elem = document.createElement('div');
      elem.id = 'i' + i;
      elem.innerHTML = `<div id="section-deg${i}" class="section-deg"></div>`;
      let conf = {
        'transform': `translate(80px, 0) rotate(${deg * i}deg)`,
        'transform-origin': 'left center',
        'width': '160px',
        'position': 'absolute',
        'text-align': 'right',
        'transition': '1s',
      }
      Object.keys(conf).forEach((prop) => {
        elem.style.setProperty(prop, conf[prop]);
      });
      fragment.appendChild(elem);
    }
    $['turn-section'].appendChild(fragment);
  } 
  
   const save = () => {
    config.state = 'save';
    configStr = JSON.stringify(config);
    ws.send(configStr);
  }
      
  const start = () => {
    if (config.state != 'waiting') {
      return;
    }
    config.state = 'start';
    configStr = JSON.stringify(config);
    ws.send(configStr);
  }

  const stop = () => {
    if (config.state === 'waiting') {
      return;
    }
    config.state = 'stop';
    configStr = JSON.stringify(config);
    ws.send(configStr);
  }

  const setStatus = (state) => {
    document.body.setAttribute('state', state);
    $['status-icon'].setAttribute('icon', state);
  }

  // $['tab-selector'].addEventListener('change', (e) => {
  //   document.body.setAttribute('current-tab', e.detail);
  // });

  window.onscroll = function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    console.log(scrolled);
    let scalePh = 1.0;
    let opacityPh = 1.0;
    if (scrolled > 200) {
      scalePh = 0.8;
      opacityPh = 0;
    }
    $['photopizza'].style.transform = 'scale(' + scalePh + ')';
    $['photopizza'].style.opacity = opacityPh;
  }

  document.body.setAttribute('current-tab', 'remote');

  const icons = {
    'cursor': ' <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />',
    'open': '<path d="M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M3,13V18L3,20H10V18H5V13H3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M14,15H20V19H14V15Z" />',
    'close': '<path d="M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M3.88,13.46L2.46,14.88L4.59,17L2.46,19.12L3.88,20.54L6,18.41L8.12,20.54L9.54,19.12L7.41,17L9.54,14.88L8.12,13.46L6,15.59L3.88,13.46M14,15H20V19H14V15Z" />',
    'connect': '<path d="M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M3,13V18L3,20H10V18H5V13H3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M14,15H20V19H14V15Z" />',
    'settings': '<path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />',
    'remote': '<path d="M12,0C8.96,0 6.21,1.23 4.22,3.22L5.63,4.63C7.26,3 9.5,2 12,2C14.5,2 16.74,3 18.36,4.64L19.77,3.23C17.79,1.23 15.04,0 12,0M7.05,6.05L8.46,7.46C9.37,6.56 10.62,6 12,6C13.38,6 14.63,6.56 15.54,7.46L16.95,6.05C15.68,4.78 13.93,4 12,4C10.07,4 8.32,4.78 7.05,6.05M12,15A2,2 0 0,1 10,13A2,2 0 0,1 12,11A2,2 0 0,1 14,13A2,2 0 0,1 12,15M15,9H9A1,1 0 0,0 8,10V22A1,1 0 0,0 9,23H15A1,1 0 0,0 16,22V10A1,1 0 0,0 15,9Z" />'
  };

  Object.assign(window['AppIconsMap'], icons);
  
  setTurnSection();
})();
