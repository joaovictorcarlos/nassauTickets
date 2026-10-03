import { useState } from 'react';
import Totem from './components/Totem';
import Guiche from './components/Guiche';
import Painel from './components/Painel';

export default function App() {
  const [fila, setFila] = useState([]);
  const [painel, setPainel] = useState([]); // Array para as últimas 5 senhas
  const [sequencia, setSequencia] = useState({ SP: 1, SG: 1, SE: 1 });

  const gerarSenha = (tipo) => {
    const data = new Date();
    const yy = String(data.getFullYear()).slice(-2);
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const dd = String(data.getDate()).padStart(2, '0');
    const sq = String(sequencia[tipo]).padStart(3, '0');
    const novaSenha = { id: `${yy}${mm}${dd}-${tipo}${sq}`, tipo, estado: 'EMITIDA' };
    setFila([...fila, novaSenha]);
    setSequencia({ ...sequencia, [tipo]: sequencia[tipo] + 1 });
  };

  const chamarProxima = () => {
    if (fila.length === 0) return alert("A fila está vazia.");
    const proxima = fila[0];
    proxima.estado = 'CHAMADA';
    
    setFila(fila.slice(1));
    // Mantém no máximo as 5 últimas senhas no painel
    setPainel(prevPainel => [proxima, ...prevPainel].slice(0, 5));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>nassauTickets - Laboratório</h1>
      <Painel ultimasChamadas={painel} />
      <div style={{ display: 'flex', gap: '20px' }}>
        <Totem onGerarSenha={gerarSenha} />
        <Guiche onChamarProxima={chamarProxima} senhasAguardando={fila.length} />
      </div>
    </div>
  );
}