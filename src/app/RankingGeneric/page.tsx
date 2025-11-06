'use client';

import React from 'react';
import Balao from '@/components/_ui/Balao';
import Table from '@/components/_ui/Table';
import TableHead from '@/components/_ui/Table/components/TableHeader';
import TableBody from '@/components/_ui/Table/components/TableBody';
import TableCell from '@/components/_ui/Table/components/TableHeaderItem';
import TableRow from '@/components/_ui/Table/components/TableRow';
import { TableContainer as TableContainerMui } from '@mui/material';
import TableContainer from '@/components/_ui/Table/components/TableContainer';
import { StyledRankingCellContainer } from './styles';

const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const colors = [
  '#979797', '#33353a', '#d46314', '#db7271', '#5c3b22',
  '#d35de9', '#4500d4', '#478898', '#08b2cb', '#c42321',
  '#934383', '#EFAF10', '#F0C5C9', '#856EBC', '#80A582',
];

const data = [
  {
    group: 'Equipe 1',
    exercisesAccepteds: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    times: {
      A: '2/64', B: '1/16', C: '1/99', D: '2/80', E: '1/31',
      F: '1/7', G: '1/162', H: '3/120', I: '1/88', J: '2/47',
    },
    total: '9 (740)', totalCount: 9, totalScore: 740,
  },
  {
    group: 'Equipe 2',
    exercisesAccepteds: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    times: {
      A: '1/152', B: '1/113', C: '2/91', D: '1/185', E: '1/89',
      F: '2/76', G: '1/90', H: '1/77', I: '1/54', J: '1/39',
    },
    total: '8 (640)', totalCount: 8, totalScore: 640,
  },
  {
    group: 'Equipe 3',
    exercisesAccepteds: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    times: {
      A: '2/64', B: '1/16', C: '1/99', D: '2/80', E: '1/31',
      F: '1/7', G: '1/162', H: '3/120', I: '1/88', J: '2/47',
    },
    total: '10 (480)', totalCount: 10, totalScore: 480,
  },
  {
    group: 'Equipe 4',
    exercisesAccepteds: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    times: {
      A: '1/152', B: '1/113', C: '2/91', D: '1/185', E: '1/89',
      F: '2/76', G: '1/90', H: '1/77', I: '1/54', J: '1/39',
    },
    total: '7 (520)', totalCount: 7, totalScore: 520,
  },
  {
    group: 'Equipe 5',
    exercisesAccepteds: ['A', 'B', 'C', 'E', 'F', 'H'],
    times: {
      A: '1/120', B: '2/110', C: '1/95', D: '', E: '1/80',
      F: '1/60', G: '', H: '2/70', I: '1/50', J: '',
    },
    total: '6 (500)', totalCount: 6, totalScore: 500,
  },
  {
    group: 'Equipe 6',
    exercisesAccepteds: ['A', 'C', 'D', 'E', 'G', 'H'],
    times: {
      A: '2/140', B: '', C: '1/100', D: '1/130', E: '2/85',
      F: '', G: '1/120', H: '1/90', I: '', J: '1/60',
    },
    total: '6 (240)', totalCount: 6, totalScore: 240,
  },
  {
    group: 'Equipe 7',
    exercisesAccepteds: ['B', 'C', 'D', 'F', 'G', 'I'],
    times: {
      A: '', B: '1/115', C: '2/105', D: '1/125', E: '',
      F: '1/65', G: '2/100', H: '', I: '1/55', J: '1/45',
    },
    total: '6 (352)', totalCount: 6, totalScore: 352,
  },
  {
    group: 'Equipe 8',
    exercisesAccepteds: ['A', 'B', 'E', 'F', 'G', 'H', 'I'],
    times: {
      A: '1/135', B: '1/120', C: '', D: '', E: '2/95',
      F: '1/75', G: '1/110', H: '1/85', I: '2/60', J: '1/40',
    },
    total: '7 (400)', totalCount: 7, totalScore: 400,
  },
];

data.sort((a, b) => {
  const aCount = a.exercisesAccepteds.length;
  const bCount = b.exercisesAccepteds.length;
  if (aCount === bCount) return a.totalScore - b.totalScore;
  return bCount - aCount;
});

const tableHeaderColumns = ['Equipe', ...letras, 'Total'];

const CreateRanking: React.FC = () => {
  return (
    <TableContainerMui component={TableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaderColumns.map((column, idx) => (
              <TableCell key={`${column}-${idx}`} item={{ content: column, space: 1 }} />
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((team, idx) => (
            <TableRow key={`${team.group}-${idx}`}>
              <TableCell>{team.group}</TableCell>
              {letras.map((l, index) => (
                <TableCell key={`${l}-${index}`}>
                  {team.exercisesAccepteds.includes(l) ? (
                    <StyledRankingCellContainer $fillColor={colors[index]} $size={40}>
                      <Balao />
                      {team.times[l]}
                    </StyledRankingCellContainer>
                  ) : (
                    ' '
                  )}
                </TableCell>
              ))}
              <TableCell>{team.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainerMui>
  );
};

export default CreateRanking;
