import styles from "./Falcon.module.scss";

interface FalconProps {
    className?: string;
    stroke?: boolean;
}

const Falcon: React.FC<FalconProps> = ({ className, stroke }) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            className={`
                ${styles.falconIcon}
                ${(stroke) && styles.stroke}
                ${className}
            `}
            xmlSpace="preserve"
            width="31.3266mm"
            height="31.3266mm"
            version="1.1"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 3132.66 3132.66"
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer" />
                <g id="_2199643948416">
                    <polygon id="Aguia" fill="white" stroke="black" strokeWidth="10" strokeLinejoin="bevel" strokeMiterlimit="22.9256" points="1375.19,2399.33 1214.19,2384.95 1117.88,2301.58 954,2288.64 899.38,2410.83 931,2459.7 854.82,2423.77 808.81,2274.27 854.82,2121.89 1084.38,1896.33 1378.12,1701.33 1573.13,1255.08 1664.38,812.58 2093.13,342.58 2244.38,50.08 2274.38,48.83 2275.63,73.83 2194.38,346.33 2380.63,73.83 2284.38,415.08 2460.63,230.08 2345.63,523.83 2555.63,405.08 2429.38,617.58 2646.88,561.33 2479.38,735.08 2798.13,753.83 2518.13,853.83 2791.88,951.33 2534.38,1000.08 2808.13,1113.83 2529.38,1155.08 2265.63,1958.83 1835.63,2136.33 2175.63,2376.33 2324.38,2510.08 2806.88,3073.83 2768.13,3083.83 2510.63,2897.58 2516.88,3063.83 2381.88,2883.83 2351.88,3051.33 2218.13,2856.33 2188.13,3047.58 2081.88,2843.83 1980.63,3037.58 1973.13,2782.58 1891.88,2602.58 1856.88,2816.33 1813.13,2868.83 1820.63,2931.33 1910.63,3025.08 1920.63,3070.08 1838.13,3011.33 1761.88,2973.83 1655.63,2996.33 1613.13,3012.58 1636.88,2952.58 1748.13,2921.33 1665.63,2725.08 1494.38,2502.58 " />
                    <polygon id="Asa_x0020_direita" fill="white" stroke="black" strokeWidth="10" strokeLinejoin="bevel" strokeMiterlimit="22.9256" points="1035.44,1885.31 1354.45,1675.16 1335.55,1448.3 1098,968.28 769.21,634.56 324.53,546.62 682.91,733.2 335.22,687.17 745.38,853.2 386.18,881.15 758.53,956.77 433.03,1051.29 824.29,1038.14 571.12,1255.14 869.49,1137.6 635.23,1366.93 913.06,1297.06 1032.24,1574.06 " />
                    <polygon id="Pata" fill="white" stroke="black" strokeWidth="10" strokeLinejoin="bevel" strokeMiterlimit="22.9256" points="1501.09,2566.19 1512.53,2730.6 1447.49,2827.81 1228.04,2835.67 1129.4,2936.46 1217.32,2907.87 1389.59,2915.73 1514.68,2982.21 1472.5,2882.13 1553.99,2858.55 1638.34,2739.89 " />
                </g>
            </g>
        </svg>
    );
}

export default Falcon;