import Button from "@/components/_ui/Button"
import { Card, CardContent } from "@/components/_ui/Card"
import Falcon from "@/components/_ui/icons/Falcon"
import LogoFHO from "@/components/_ui/icons/FHO"
import { Trophy, Calendar, BookOpen} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4F85A6] to-[#3a6b87]">
      <header className="container mx-auto px-1 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className=" ml-auto w-36 h-24 flex items-center justify-center">
            <LogoFHO className="h-14 w-auto" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Falcon</h1>
              <p className="text-white/80 text-sm">Sistema Educacional</p>
            </div>
          </div>
          <div className="flex items-center">
              <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              variant={{}}
              >
              Login
              </Button>
          </div>
        </div>
      </header>


      <main className="container mx-auto px-6 py-6">
        <div className="text-center mb-16">
          <div className="mb-8">
       
            <div className="w-96 h-96 mx-auto mb-6 flex items-center justify-center">
              <Falcon className="w-80 h-80"/>
            </div>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6 text-balance">Falcon - Maratona de Programação</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
            Plataforma oficial da Maratona de Programação realizada pela Fundação Hermínio Ometto
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
            <Button size="lg" className="bg-white text-[#4F85A6] hover:bg-white/90 font-semibold" variant={{}}>
              Acessar Sistema
            </Button>
       
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              Notícias Acadêmicas
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Competições</h3>
              <p className="text-white/80 text-sm">Acompanhe maratonas e competições de programação</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Cronograma</h3>
              <p className="text-white/80 text-sm">Visualize datas importantes e prazos de inscrição</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Recursos</h3>
              <p className="text-white/80 text-sm">Acesse materiais e recursos para preparação</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Pronto para Participar?</h3>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Junte-se à nossa comunidade de programadores e participe das próximas competições.
          </p>
          <div className="flex justify-center">
          <Button size="lg" className="bg-white text-[#4F85A6] hover:bg-white/90 font-semibold" variant={{}}>
            Criar Conta Agora
          </Button>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-6 py-8 mt-16 border-t border-white/20">
        <div className="text-center text-white/60">
          <p>&copy; 2024 Falcon - Sistema de Maratona de Programação. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
