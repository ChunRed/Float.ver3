console.clear();

// toggle button
const wakeButton = document.querySelector('[data-status]');

const statusElem = document.querySelector('#status');
// checkbox
const reaquireCheck = document.querySelector('#reaquire');



// change button and status if wakelock becomes aquired or is released
const changeUI = (status = 'acquired') => {
    const acquired = status === 'acquired' ? true : false;
    wakeButton.dataset.status = acquired ? 'on' : 'off';
    wakeButton.textContent = `Turn Wake Lock ${acquired ? 'OFF' : 'ON'}`;
    statusElem.textContent = `Wake Lock ${acquired ? 'is active!' : 'has been released.'}`;
}


// test support
let isSupported = false;

if ('wakeLock' in navigator) {
    isSupported = true;
    statusElem.textContent = 'Screen Wake Lock API supported 🎉';
} else {
    wakeButton.disabled = true;
    statusElem.textContent = 'Wake lock is not supported by this browser.';
}


if (isSupported) {

    let wakeLock = null;

    const requestWakeLock = async () => {
        try {
            console.log("dd");
            wakeLock = await navigator.wakeLock.request('screen');

            // change up our interface to reflect wake lock active
            changeUI();

            // listen for our release event
            wakeLock.onrelease = function (ev) {
                console.log(ev);
            }
            wakeLock.addEventListener('release', () => {
                // if wake lock is released alter the button accordingly
                changeUI('released');
            });

        } catch (err) {
            // if wake lock request fails - usually system related, such as battery
            wakeButton.dataset.status = 'off';
            wakeButton.textContent = 'Turn Wake Lock ON';
        }
    }

    // if we click our button
    wakeButton.addEventListener('click', () => {
        // if wakelock is off request it
        if (wakeButton.dataset.status === 'off') {
            requestWakeLock()
        } else { // if it's on release it
            wakeLock.release()
                .then(() => {
                    wakeLock = null;
                })
        }
    })

    const handleVisibilityChange = () => {
        if (wakeLock !== null && document.visibilityState === 'visible') {
            requestWakeLock();
        }
    }

    reaquireCheck.addEventListener('change', () => {
        if (reaquireCheck.checked) {
            document.addEventListener('visibilitychange', handleVisibilityChange);
        } else {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
    });


} // isSupported