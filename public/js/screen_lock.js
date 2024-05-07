// test support
let isSupported = false;

if ('wakeLock' in navigator) {
    isSupported = true;
    console.log("screen lock enable.");
} else {
    console.log("screen lock disenable.");
}


if (isSupported) {

    let wakeLock = null;

    const requestWakeLock = async () => {
        try {
            wakeLock = await navigator.wakeLock.request('screen');

        } catch (err) {

        }
    }
    requestWakeLock();
} 