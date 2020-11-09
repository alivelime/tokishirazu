window.onload = () => {
  document.getElementById("start").addEventListener('click', () => {
    document.getElementById("start").style.display = "none"
    let navball = document.getElementById("navball")
    navball.innerHTML = "方位: "+ compassHeading(0, 0, 0) + "<br />"
      + "beta: " + 0  + "<br />"
      + "gamma: " + 0  + "<br />"
    if (typeof DeviceOrientationEvent !== "undefined") {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ の Safari
        // 許可を取得
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              setDeviceOrientationEvent()
            } else {
              // 許可を得られなかった場合の処理
              alert("センサへのアクセスが拒否されました。もう一度やり直してください。")
            }
          })
          .catch(err => alert("センサ情報が取得できませんでした。" + err.toString())) // https通信でない場合などで許可を取得できなかった場合
      } else {
        // 上記以外のブラウザ
        setDeviceOrientationEvent()
      }
    } else {
      alert("このデバイスには地磁気センサがありません")
    }
  }, false)
};

function setDeviceOrientationEvent() {
  // 許可を得られた場合、deviceorientationをイベントリスナーに追加
  window.addEventListener('deviceorientation', e => {
    e.preventDefault()
    navball.innerHTML = "方位: "+ compassHeading(e.alpha, e.beta, e.gamma) + "<br />"
      + "beta: " + e.beta  + "<br />"
      + "gamma: " + e.gamma  + "<br />"
  })
}

function compassHeading(alpha, beta, gamma) {
  var degtorad = Math.PI / 180; // Degree-to-Radian conversion

  var _x = beta ? beta * degtorad : 0; // beta value
  var _y = gamma ? gamma * degtorad : 0; // gamma value
  var _z = alpha ? alpha * degtorad : 0; // alpha value

  var cX = Math.cos(_x);
  var cY = Math.cos(_y);
  var cZ = Math.cos(_z);
  var sX = Math.sin(_x);
  var sY = Math.sin(_y);
  var sZ = Math.sin(_z);

  // Calculate Vx and Vy components
  var Vx = -cZ * sY - sZ * sX * cY;
  var Vy = -sZ * sY + cZ * sX * cY;

  // Calculate compass heading
  var compassHeading = Math.atan(Vx / Vy);

  // Convert compass heading to use whole unit circle
  if (Vy < 0) {
    compassHeading += Math.PI;
  } else if (Vx < 0) {
    compassHeading += 2 * Math.PI;
  }

  return compassHeading * ( 180 / Math.PI ); // Compass Heading (in degrees)
}
