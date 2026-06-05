import React, { useMemo } from 'react';

interface Props {
    password: string;
}

const CountryFlagValidator: React.FC<Props> = ({ password }) => {
    const countries = [
        "AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM","HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK","ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA","NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI","VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"
    ];

    const targetCountry = useMemo(() => {
        return countries[Math.floor(countries.length * Math.random())];
    }, []);

    const isValid = password.toLowerCase().includes(targetCountry.toLowerCase());

    const flagUrl = `https://flagcdn.com/w160/${targetCountry.toLowerCase()}.png`;

    return (
        <div style={{
            padding: '15px',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            marginTop: '15px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            textAlign: 'center'
        }}>
            <strong className="d-block mb-2">Geografická ochrana:</strong>
            <p className="mb-2">Heslo musí obsahovat zkratku státu na obrázku:</p>

            <div className="mb-3">
                <img
                    src={flagUrl}
                    alt="Náhodná vlajka"
                    style={{ width: '80px', borderRadius: '4px', border: '1px solid #555' }}
                />
            </div>

            {isValid ? (
                <span className="badge bg-success">✅ Stát nalezen ({targetCountry})</span>
            ) : (
                <span className="badge bg-danger">❌ Heslo neobsahuje zkratku země z vlajky!</span>
            )}
        </div>
    );
};

export default CountryFlagValidator;