export default function TestPage() {
    return (
        <div style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '50px',
            fontSize: '24px'
        }}>
            <h1>TESTE DE RENDERIZAÇÃO</h1>
            <p>Se você está vendo isso, o Next.js está funcionando!</p>
            <div style={{ backgroundColor: 'blue', padding: '20px', marginTop: '20px' }}>
                <p>Este é um teste sem animações ou componentes complexos</p>
            </div>
        </div>
    );
}
