import { useState, useEffect } from 'react';

const useCountDownTimer = (timer, interval=1000) => {

    /* useState */
    var [countdown, setCountDown] = useState(timer);
    const [duration, setDuration] = useState(0);

    const [isRunning, setIsRunning] = useState(false);

    /* Functions */
    const handleStart = () => {
        setIsRunning(true);
        setDuration(timer);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleResume = () => {
        setIsRunning(true);
        setDuration(countdown);
    };

    const handleReset = () => {
        setIsRunning(false);
        setDuration(0);
        setCountDown(timer);
    };

    const action = (action) => {
        if (action === 'START') {
            handleStart();
        }
        else if (action === 'STOP') {
            handleStop();
        }
        else if (action === 'RESUME') {
            handleResume();
        }
        else if (action === 'RESET') {
            handleReset();
        }
    };

    /* useEffect */
    useEffect(() => {
        if (isRunning) {
            let timer = duration;
            const countInterval = setInterval(() => {
                if (timer > 0) setCountDown(--timer);
            }, 1000);

            return () => clearInterval(countInterval);
        }
    }, [isRunning, duration]);

    return [countdown, action];
};

export default useCountDownTimer;