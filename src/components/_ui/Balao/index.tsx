import React from 'react';
import styles from './Balao.module.scss';

const cores = ['#ff8a80', '#ffd180', '#ffff8d', '#ccff90', '#a7ffeb', '#80d8ff', '#b388ff', '#f8bbd0'];

interface BalaoProps {
  texto: string;
  index: number;
}

const Balao = ({ texto, index }: BalaoProps) => {
  const cor = cores[index % cores.length];

  return (
    <div className={styles.balao} style={{ backgroundColor: cor }}>
      <span className={styles.texto}>{texto}</span>
    </div>
  );
};

export default Balao;
