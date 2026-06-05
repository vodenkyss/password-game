import React, { useState, useEffect } from 'react';

interface TimeValidation {
    duration: number;
    isTooFast: boolean;
    message: string;
}

interface Props {
    password: string;
    startTime: number;
}

const PasswordTimeValidator: React.FC<Props> = ({ password, startTime }) => {
    const [validation, setValidation] = useState<TimeValidation>({
        duration: 0,
        isTooFast: false,
        message: 'Zatím nepopsáno'
    });

    useEffect(() => {
        if (password.length > 0 && startTime > 0) {
            const currentTime = Date.now();
            const duration = (currentTime - startTime) / 1000;
            const isTooFast = duration < 1.5 && password.length > 5;


            setValidation({
                duration: duration,
                isTooFast: isTooFast,
                message: isTooFast ? 'Podezřele rychlé zadání (Bot?)' : 'Lidská rychlost zadávání'
            });
        } else if (password.length === 0) {

            setValidation({
                duration: 0,
                isTooFast: false,
                message: 'Zatím nepopsáno'
            });
        }
    }, [password, startTime]);

    return (
        <div style={{ padding: '10px', border: '1px solid var(--border-color)', marginTop: '10px' ,
            borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.1)'}}>
            <strong>Časová validace:</strong>
            <p>Čas: {validation.duration.toFixed(2)} s</p>
            <p style={{
                color: validation.isTooFast ? '#ffb74d' : '#81c784', // Světlejší odstíny
                fontWeight: 'bold',
                marginBottom: 0
            }}>
                {validation.message}
            </p>
        </div>
    );
};

export default PasswordTimeValidator;