export default function Painel({ ultimasChamadas }) {
  return (
    <div style={{ border: '2px solid #28a745', padding: '20px', margin: '10px', borderRadius: '8px', backgroundColor: '#eaffea' }}>
      <h2>Painel de Chamadas</h2>
      {ultimasChamadas.length === 0 ? (
        <p>Aguardando chamadas...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '24px' }}>
          {ultimasChamadas.map((senha, index) => (
            <li key={index} style={{ fontWeight: index === 0 ? 'bold' : 'normal', color: index === 0 ? 'red' : 'black' }}>
              {senha.id} - Guichê 1 {index === 0 && "(ÚLTIMA CHAMADA)"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}