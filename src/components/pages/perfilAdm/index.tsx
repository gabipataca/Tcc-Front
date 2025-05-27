'use client'

import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Button from '@/components/_ui/Button'
import Navbar from '@/components/_ui/Navbar'
import SideMenu from '@/components/_ui/SideMenu'

const GroupTable: React.FC = () => {
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'RA', width: 120 },
		{ field: 'studentName', headerName: 'Nome do Aluno', width: 200 },
		{ field: 'groupName', headerName: 'Grupo', width: 200 },
	]

	const rows = [
		{ id: 123, studentName: 'João Silva', groupName: 'Bit Busters' },
		{ id: 456, studentName: 'Maria Souza', groupName: 'Bug Hunters' },
		{ id: 789, studentName: 'Carlos Lima', groupName: 'Error 404' },
	]

	const StyledPaper = styled(Paper)(() => ({
		backgroundColor: '#ffffff',
		borderRadius: '0.75rem',
		padding: '1.5rem',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
	}))

	return (
		<StyledPaper sx={{ width: '100%', height: 400 }}>
			<h3 className="text-3xl font-semibold text-[#4F85A6] pb-4 text-center">Lista de Grupos</h3>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSizeOptions={[5, 10]}
				checkboxSelection
				sx={{
					border: 0,
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: '#E2E8F0',
						color: '#4F85A6',
						fontWeight: 'bold',
					},
				}}
			/>
		</StyledPaper>
	)
}

const SearchStudent: React.FC = () => (
	<div className="bg-white p-6 shadow-md rounded-lg w-full">
		<h3 className="text-2xl font-semibold text-[#4F85A6] mb-4 text-center">Buscar Aluno</h3>
		<input
			type="text"
			placeholder="Digite o nome do aluno"
			className="w-full p-2 border border-gray-300 rounded-lg mb-4"
		/>
		<div className="flex justify-center">
			<Button $rounded>Deletar Aluno</Button>
		</div>
	</div>
)

const SearchProfessor: React.FC = () => (
	<div className="bg-white p-6 shadow-md rounded-lg w-full">
		<h3 className="text-2xl font-semibold text-[#4F85A6] mb-4 text-center">Buscar Professor</h3>
		<input
			type="text"
			placeholder="Digite o nome do professor"
			className="w-full p-2 border border-gray-300 rounded-lg mb-4"
		/>
		<div className="flex justify-center">
			<Button $rounded>Deletar Professor</Button>
		</div>
	</div>
)

const SearchGroup: React.FC = () => (
	<div className="bg-white p-6 shadow-md rounded-lg w-full">
		<h3 className="text-2xl font-semibold text-[#4F85A6] mb-4 text-center">Buscar Grupo</h3>
		<input
			type="text"
			placeholder="Digite o nome do grupo"
			className="w-full p-2 border border-gray-300 rounded-lg mb-4"
		/>
		<div className="flex justify-center">
			<Button $rounded>Deletar Grupo</Button>
		</div>
	</div>
)

const AdminDashboard: React.FC = () => {
	return (
		<div className="flex h-full mx-auto w-full">
			<SideMenu />

			<div className="flex-1 flex flex-col bg-gray-200">
				<Navbar />

				<div className="flex flex-col lg:flex-row gap-8 p-6">
					<div className="grid grid-cols-1 gap-8 w-full">
						<GroupTable />
						<SearchStudent />
					</div>

					<div className="flex flex-col gap-8 w-full">
						<SearchProfessor />
						<SearchGroup />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
