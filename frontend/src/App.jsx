import { useState } from 'react';
import Totem from './components/Totem';
import Guiche from './components/Guiche';

export default function App() {
  const [fila, setFila] = useState([]);
  const [sequencia, setSequencia] = useState({ SP: 1, SG: 1, SE: 1 });

  const gerarSenha = (tipo) => {
    const data = new Date();
    const yy = String(data.getFullYear()).slice(-2);
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const dd = String(data.getDate()).padStart(2, '0');
    const sq = String(sequencia[tipo]).padStart(3, '0');
    
    // Numeração YYMMDD-PPSQ
    const novaSenha = { id: `${yy}${mm}${dd}-${tipo}${sq}`, tipo, estado: 'EMITIDA' };
    
    setFila([...fila, novaSenha]);
    setSequencia({ ...sequencia, [tipo]: sequencia[tipo] + 1 });
  };

  const chamarProxima = () => {
    if (fila.length === 0) return alert("A fila está vazia.");
    // Lógica básica (será corrigida no commit de 'fix')
    const proxima = fila[0]; 
    setFila(fila.slice(1));
    console.log("Senha chamada:", proxima.id);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>nassauTickets - Laboratório</h1>
      <Totem onGerarSenha={gerarSenha} />
      <Guiche onChamarProxima={chamarProxima} senhasAguardando={fila.length} />
    </div>
  );
}