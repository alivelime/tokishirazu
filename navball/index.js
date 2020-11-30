window.onload = () => {
  // この辺りはこちらを参考に https://qiita.com/umi_kappa/items/38499c03792b2aac49ad
  document.getElementById("start").addEventListener('click', () => {
    document.getElementById("start").style.display = "none"
    let camera = render()
    // camera.rotation.x = THREE.MathUtils.degToRad(0) // 仰角・俯角
    // camera.rotation.y = THREE.MathUtils.degToRad(90) // 方位
    // camera.rotation.z = THREE.MathUtils.degToRad(0)  // ねじれ
    // camera.useQuaternion = true;

    if (typeof DeviceOrientationEvent !== "undefined") {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ の Safari
        // 許可を取得
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              setDeviceOrientationEvent(camera)
            } else {
              // 許可を得られなかった場合の処理
              alert("センサへのアクセスが拒否されました。もう一度やり直してください。")
            }
          })
          .catch(err => alert("センサ情報が取得できませんでした。" + err.toString())) // https通信でない場合などで許可を取得できなかった場合
      } else {
        // 上記以外のブラウザ
        setDeviceOrientationEvent(camera)
      }
    } else {
      alert("このデバイスには地磁気センサがありません")
    }
  }, false)
};

function render() {
  // この辺りはこちらを参考 https://ics.media/entry/14490/
  let width = window.innerWidth
  let height = window.innerHeight
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
  camera.position.set(0, 0, 0);
  scene.add(camera);

  var geometry = new THREE.SphereGeometry(5, 60, 40);
  geometry.scale(-1, 1, 1);
	//　マテリアルの作成
	// 画像はこちらのをお借りしました
	// https://forum.kerbalspaceprogram.com/index.php?/topic/164158-13-navballtexturechanger-v16-8717/
  let texture = new THREE.TextureLoader().load("/img/navball.png")
	let material = new THREE.MeshBasicMaterial({
		map: texture
	});
	sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);

	// レンダラー
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(width, height);
	renderer.setClearColor({color: 0xffccff});
	element = renderer.domElement;
	document.getElementById("navball").appendChild(element);
  function r() {
    requestAnimationFrame(r)
    renderer.render(scene, camera)
  }
  requestAnimationFrame(r)
  return camera
}

function setDeviceOrientationEvent(camera) {
  // 許可を得られた場合、deviceorientationをイベントリスナーに追加
  window.addEventListener('deviceorientation', e => {
    e.preventDefault()
    // camera.quaternion = new THREE.Quaternion().setFromAxisAngle( new THREE.Vector3(1,0,0),Math.PI / 2)
    // camera.quaternion.copy(new THREE.Quaternion(getQuaternion(e.alpha, e.beta, e.gamma)));
     camera.rotation.x = THREE.MathUtils.degToRad(e.beta) // 仰角・俯角
     camera.rotation.y = THREE.MathUtils.degToRad(e.alpha + 180) // 方位
     camera.rotation.z = THREE.MathUtils.degToRad(e.gamma)  // ねじれ
  })
}

function getQuaternion( alpha, beta, gamma ) {

  var _x = beta  ? beta  * degtorad : 0; // β 値
  var _y = gamma ? gamma * degtorad : 0; // γ 値
  var _z = alpha ? alpha * degtorad : 0; // α 値

  var cX = Math.cos( _x/2 );
  var cY = Math.cos( _y/2 );
  var cZ = Math.cos( _z/2 );
  var sX = Math.sin( _x/2 );
  var sY = Math.sin( _y/2 );
  var sZ = Math.sin( _z/2 );

  /*  ZXY 四元数の構築  */

  var w = cX * cY * cZ - sX * sY * sZ;
  var x = sX * cY * cZ - cX * sY * sZ;
  var y = cX * sY * cZ + sX * cY * sZ;
  var z = cX * cY * sZ + sX * sY * cZ;

  return [ w, x, y, z ];
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
