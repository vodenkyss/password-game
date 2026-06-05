import React, { useState } from 'react';

interface Props {
    setPassword: (value: string) => void;
    password: string; // Tady to máš správně
}

const PasswordInput: React.FC<Props> = ({ setPassword, password }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4">
            <label htmlFor="password-input" className="form-label fw-bold">
                Zadejte heslo
            </label>
            <div className="input-group shadow-sm">
                <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    className="form-control border-end-0"

                    value={password}

                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="MojeHeslo123!"
                    style={{
                        backgroundColor: 'var(--card-bg)',
                        color: 'var(--text-color)',
                        border: '1px solid var(--border-color)'
                    }}
                />
                <button
                    className="btn btn-outline-secondary px-3"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        border: '1px solid var(--border-color)',
                        borderLeft: 'none'
                    }}
                >
                    {showPassword ? '🙈 Skrýt' : '👁️ Zobrazit'}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;