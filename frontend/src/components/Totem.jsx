export default function Totem({ onGerarSenha }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '8px' }}>
      <h2>Totem (Autoatendimento)</h2>
      <p>Selecione o tipo de atendimento:</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => onGerarSenha('SP')}>Prioritário (SP)</button>
        <button onClick={() => onGerarSenha('SE')}>Exames (SE)</button>
        <button onClick={() => onGerarSenha('SG')}>Geral (SG)</button>
      </div>
    </div>
  );
}