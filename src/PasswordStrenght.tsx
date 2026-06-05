
interface Props {
    password: string;
}

const PasswordStrength: React.FC<Props> = ({ password }) => {
    const criteria = [
        { label: 'Minimálně 8 znaků', met: password.length >= 8 },
        { label: 'Velké písmeno', met: /[A-Z]/.test(password) },
        { label: 'Číslo', met: /[0-9]/.test(password) },
        { label: 'Speciální znak (!@#$%^&*)', met: /[!@#$%^&*]/.test(password) },
    ];

    const strengthScore = criteria.filter(c => c.met).length;

    const getProgressSpecs = () => {
        if (password.length === 0) return { width: 0, colorClass: 'bg-light' };
        if (strengthScore <= 1) return { width: 33, colorClass: 'bg-danger' };
        if (strengthScore <= 3) return { width: 66, colorClass: 'bg-warning' };
        return { width: 100, colorClass: 'bg-success' };
    };

    const specs = getProgressSpecs();

    return (
        <div className="mt-3">
            <label className="form-label d-flex justify-content-between">
                Síla hesla: <strong>{strengthScore}/4</strong>
            </label>
            <div className="progress" style={{ height: '12px' }}>
                <div
                    className={`progress-bar progress-bar-striped progress-bar-animated ${specs.colorClass}`}
                    role="progressbar"
                    style={{ width: `${specs.width}%`, transition: 'width 0.5s ease' }}
                ></div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {criteria.map((c, index) => (
                    <li key={index} style={{
                        color: c.met ? '#4caf50' : '#ff6b6b',
                        opacity: 1,
                        marginBottom: '5px'
                    }}>
                        {c.met ? '✅' : '❌'} {c.label}
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default PasswordStrength;


