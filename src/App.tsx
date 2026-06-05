import { useEffect, useState } from 'react';
import './App.css';
import PasswordStrength from "./PasswordStrenght.tsx";
import PasswordInput from "./PasswordInput.tsx";
import CharacterSequenceValidator from "./CharacterSequenceValidator.tsx";
import PasswordTimeValidator from "./PasswordTimeValidator.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import CountryFlagValidator from "./CountryFlagValidator.tsx";

function App() {
    const [password, setPassword] = useState<string>('');
    const [startTime, setStartTime] = useState<number>(0);
    const [seqResult, setSeqResult] = useState({ isValid: false, count: 0 });
    const [passwordStrength, setPasswordStrength] = useState<string>('Žádné');

    const evaluatePassword = (pass: string): string => {
        if (pass.length === 0) return "Žádné";
        const criteria = [
            pass.length >= 8,
            /[A-Z]/.test(pass),
            /[0-9]/.test(pass),
            /[!@#$%^&*]/.test(pass)
        ];
        const score = criteria.filter(Boolean).length;
        if (score <= 1) return "Slabé";
        if (score <= 3) return "Střední";
        return "Silné";
    };

    useEffect(() => {
        setPasswordStrength(evaluatePassword(password));
    }, [password]);

    useEffect(() => {
        document.title = `Síla hesla: ${passwordStrength}`;
    }, [passwordStrength]);

    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPassword(prevPassword => {
                if (prevPassword.length === 0) return prevPassword;
                const action = Math.random() < 0.5 ? 'add' : 'remove';
                if (action === 'add') {
                    return prevPassword + "😜";
                } else {
                    const index = Math.floor(Math.random() * prevPassword.length);
                    return prevPassword.slice(0, index) + prevPassword.slice(index + 1);
                }
            });
        }, 10000);
        return () => clearInterval(sabotageInterval);
    }, []);


    useEffect(() => {
        if (password.length === 1 && startTime === 0) {
            setStartTime(Date.now());
        }
        if (password.length === 0) {
            setStartTime(0);
        }
    }, [password, startTime]);

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 custom-card">
                    <h2 className="mb-4 text-center">Pokročilý Password Checker</h2>

                    <PasswordInput setPassword={setPassword} password={password} />

                    <div className="text-center mb-2">
                        Aktuální síla: <span className="badge bg-info text-dark">{passwordStrength}</span>
                    </div>

                    <PasswordStrength password={password} />

                    <div className="mt-4">
                        <CharacterSequenceValidator
                            password={password}
                            onValidationChange={setSeqResult}
                        />
                    </div>

                    <div className="mt-4">
                        <CountryFlagValidator password={password} />
                    </div>

                    <PasswordTimeValidator
                        password={password}
                        startTime={startTime}
                    />

                    {seqResult.isValid && (
                        <div className="alert alert-info mt-3">
                            <strong>Bonus:</strong> Našli jste {seqResult.count} elitní sekvenci!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;