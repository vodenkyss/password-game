import React, { useEffect } from 'react';

interface SequenceResult {
    isValid: boolean;
    count: number;
}

interface Props {
    password: string;
    onValidationChange: (result: SequenceResult) => void;
}

const CharacterSequenceValidator: React.FC<Props> = ({ password, onValidationChange }) => {

    const sequenceRegex = /[A-Z][a-z][0-9][!@#$%^&*]/g;
    const matches = password.match(sequenceRegex) || [];

    const result: SequenceResult = {
        isValid: matches.length > 0,
        count: matches.length
    };


    useEffect(() => {
        onValidationChange(result);
    }, [password]);

    return (
        <div style={{
            padding: '15px',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            marginTop: '15px',
            backgroundColor: 'rgba(255,255,255,0.05)'
        }}>
            <strong className="d-block mb-2">Sekvenční analýza:</strong>
            <p className="mb-1">Nalezeno sekvencí: {result.count}</p>
            {result.isValid
                ? <span className="badge bg-success">✅ Splněno</span>
                : <span className="badge bg-secondary text-white">❌ Chybí sekvence</span>}
        </div>
    );
};

export default CharacterSequenceValidator;