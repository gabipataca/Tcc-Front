"use client"

import Button from "@/components/_ui/Button";
import GridColumn from "@/components/_ui/GridColumn";
import Input from "@/components/_ui/Input";
import SideMenu from "@/components/_ui/SideMenu";
import TitleLarge from "@/components/_ui/TitleLarge";
import GridItem from "@/components/pages/profile/components/GridItem";
import NavbarItem from "@/components/pages/profile/components/NavbarItem";
import ProfileNavbar from "@/components/pages/profile/components/ProfileNavbar";
import React from "react";




const Profile: React.FC = () => {
    return (
    <div className="flex h-full mx-auto w-full">
      {/* Navbar Lateral */}
      <SideMenu />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col bg-gray-200">
        <ProfileNavbar>
          <NavbarItem destinyHref="/">Home</NavbarItem>
          <NavbarItem destinyHref="/subscribe">Inscreva-se</NavbarItem>
        </ProfileNavbar>

        {/* Título e Botões */}
        <div className="flex justify-between items-center py-3 px-20 mt-8">
          <TitleLarge>Perfil do Aluno</TitleLarge>
          <div className="flex gap-4">
            <Button rounded onClick={() => {}}>
              Criar Grupo
            </Button>
            <Button rounded onClick={() => {}}>
              Iniciar Maratona
            </Button>
          </div>
        </div>

        {/* Informações do Aluno e Grupo */}
        <GridColumn>
          <GridItem>
            <TitleLarge className="text-3xl text-center mb-2">Informações do Aluno</TitleLarge>
            <div className="pl-6">
              <Input type="text" name="name" label="Nome:" value="Nome Teste" readOnly className="text-xl" />
              <Input type="text" name="birthDate" label="Data de nascimento:" readOnly value="xx/xx/xxxx" className="text-xl" />
              <Input type="email" name="email" value="xxxxxxxxxxxxxx" readOnly className="text-xl" />
              <Input type="text" name="ra" label="E-mail:" value="xxxxxxxxxx" readOnly className="text-xl" />
            </div>
            <Button rounded className="!ml-auto !text-lg" onClick={() => {}}>
              Editar
            </Button>
          </GridItem>

          <GridItem>
            <TitleLarge className="text-3xl text-center mb-2">Informações do Grupo</TitleLarge>
            <div className="pl-6">
              <p className="text-2xl ml-2">Nome do grupo: xxxxxx</p>
              <p className="text-2xl ml-2">Lista de integrantes: xxxxxx</p>
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <Button rounded>
                Adicionar
              </Button>
              <Button rounded>
                Editar
              </Button>
            </div>
          </GridItem>
        </GridColumn>

        {/* Tabelas */}
        <GridColumn>
          <GridItem>
            <TitleLarge className="text-3xl text-center mb-2">Histórico de Competição</TitleLarge>
            <table className="w-full mt-2 border-collapse border border-gray-300 text-2xl">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Ano</th>
                  <th className="border border-gray-300 p-2">Nome Grupo</th>
                  <th className="border border-gray-300 p-2">Questões Acertadas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">XXXX</td>
                  <td className="border border-gray-300 p-2">XXXX</td>
                  <td className="border border-gray-300 p-2">XXXX</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">XXXX</td>
                  <td className="border border-gray-300 p-2">XXXX</td>
                  <td className="border border-gray-300 p-2">XXXX</td>
                </tr>
              </tbody>
            </table>
          </GridItem>

          <GridItem>
            <TitleLarge className="text-3xl text-center mb-2">Equipe Campeã</TitleLarge>
            <table className="w-full mt-2 border-collapse border border-gray-300 text-2xl">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Ano</th>
                  <th className="border border-gray-300 p-2">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">XXXX</td>
                  <td className="border border-gray-300 p-2">XXXX</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">XXXX</td>
                  <td className="border border-gray-300 p-2">XXXX</td>
                </tr>
              </tbody>
            </table>
          </GridItem>
        </GridColumn>
      </div>
    </div>
  );
}


export default Profile;