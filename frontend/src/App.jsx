import { useState } from 'react';
import Totem from './components/Totem';
import Guiche from './components/Guiche';
import Painel from './components/Painel';

export default function App() {
  // Estados para gerir os dados da aplicação
  const [fila, setFila] = useState([]);
  const [painel, setPainel] = useState([]); // Registo das 5 últimas chamadas[cite: 5]
  const [sequencia, setSequencia] = useState({ SP: 1, SG: 1, SE: 1 });

  // Função para gerar uma nova senha no padrão YYMMDD-PPSQ[cite: 4]
  const gerarSenha = (tipo) => {
    const data = new Date();
    const yy = String(data.getFullYear()).slice(-2);
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const dd = String(data.getDate()).padStart(2, '0');
    const sq = String(sequencia[tipo]).padStart(3, '0');
    
    const novaSenha = { 
      id: `${yy}${mm}${dd}-${tipo}${sq}`, 
      tipo, 
      estado: 'EMITIDA' 
    };
    
    // Adiciona a nova senha à fila e atualiza o contador daquele tipo
    setFila([...fila, novaSenha]);
    setSequencia({ ...sequencia, [tipo]: sequencia[tipo] + 1 });
  };

  // Função corrigida com a regra de prioridade: SP -> SE -> SG[cite: 4]
  const chamarProxima = () => {
    if (fila.length === 0) return alert("A fila está vazia.");

    let proximaIndex = -1;

    // 1. Procura primeiro se existe alguma senha Prioritária (SP)[cite: 4]
    proximaIndex = fila.findIndex(s => s.tipo === 'SP');

    // 2. Se não encontrou SP, procura se existe senha de Exames (SE)[cite: 4]
    if (proximaIndex === -1) {
      proximaIndex = fila.findIndex(s => s.tipo === 'SE');
    }

    // 3. Se não encontrou SP nem SE, procura a Senha Geral (SG)[cite: 4]
    if (proximaIndex === -1) {
      proximaIndex = fila.findIndex(s => s.tipo === 'SG');
    }

    // Extrai a senha selecionada baseada na prioridade
    const proxima = fila[proximaIndex];
    proxima.estado = 'CHAMADA'; // Atualiza a máquina de estados

    // Remove apenas a senha chamada, mantendo as restantes intactas
    const novaFila = [...fila];
    novaFila.splice(proximaIndex, 1);
    setFila(novaFila);

    // Atualiza o painel e garante que mostra no máximo as últimas 5 chamadas[cite: 5]
    setPainel(prevPainel => [proxima, ...prevPainel].slice(0, 5));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>nassauTickets - Laboratório</h1>
      
      {/* O Painel de chamadas ficará no topo, em destaque */}
      <Painel ultimasChamadas={painel} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginTop: '30px' }}>
        {/* Componente que representa o cliente a gerar a senha no totem */}
        <div style={{ flex: 1 }}>
          <Totem onGerarSenha={gerarSenha} />
        </div>
        
        {/* Componente que representa o atendente no guichê a chamar a senha */}
        <div style={{ flex: 1 }}>
          <Guiche onChamarProxima={chamarProxima} senhasAguardando={fila.length} />
        </div>
      </div>
    </div>
  );
}