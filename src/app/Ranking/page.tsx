import React from 'react';
import Balao from '@/components/_ui/Balao'; // importa o componente

const dados = [
  {
    equipe: 'Equipe 1',
    colunas: {
      A: ['HTML', 'CSS'],
      B: ['JS'],
      C: ['React', 'Redux'],
      D: [],
      E: ['Node'],
      F: ['SQL'],
      G: [],
      H: [],
      I: ['Docker'],
      J: [],
    },
    total: 100,
  },
  {
    equipe: 'Equipe 2',
    colunas: {
      A: ['HTML'],
      B: [],
      C: [],
      D: ['Python', 'Flask'],
      E: [],
      F: [],
      G: ['Pandas'],
      H: [],
      I: [],
      J: ['Git'],
    },
    total: 90,
  },
];

const colunas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const Ranking = () => {
  return (
    <table className={styles['ranking-table']}>
      <thead>
        <tr>
          <th>#</th>
          <th>Equipe</th>
          {colunas.map((letra) => (
            <th key={letra}>{letra}</th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((equipe, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{equipe.equipe}</td>
            {colunas.map((letra) => (
              <td key={letra}>
                <div className={styles['balao-container']}>
                  {equipe.colunas[letra].map((texto, j) => (
                    <Balao key={j} texto={texto} index={j} />
                  ))}
                </div>
              </td>
            ))}
            <td className={styles.total}>{equipe.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Ranking;
