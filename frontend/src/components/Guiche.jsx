export default function Guiche({ onChamarProxima, senhasAguardando }) {
  return (
    <div style={{ border: '1px solid #0056b3', padding: '20px', margin: '10px', borderRadius: '8px', backgroundColor: '#e6f2ff' }}>
      <h2>Guichê (Atendente)</h2>
      <p>Pessoas aguardando na fila: <strong>{senhasAguardando}</strong></p>
      <button onClick={onChamarProxima} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Chamar Próxima Senha
      </button>
    </div>
  );
}