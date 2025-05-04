
import Image from "next/image";
import styles from "./Balao.module.scss";

interface BalaoProps {
  src: string;
  alt: string;
  tempo?: string;
}

const Balao = ({ src, alt, tempo }: BalaoProps) => {
  return (
    <div className={styles.container}>
      <Image src={src} alt={alt} width={40} height={40} />
      {tempo && <div className={styles.texto}>{tempo}</div>}
    </div>
  );
};

export default Balao;
