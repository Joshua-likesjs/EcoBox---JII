'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import NavigationMenu from '@/components/navigation-menu';
import { getCurrentUser } from '@/lib/auth';
import { 
  Leaf, 
  Users, 
  Code, 
  Smartphone, 
  Palette, 
  Cpu,
  ArrowLeft,
  Mail,
  Github
} from 'lucide-react';

export default function AboutPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-800">Carregando...</p>
        </div>
      </div>
    );
  }

  const teamMembers = [
    {
      name: 'Ismael',
      role: 'Hardware & Circuitos',
      description: 'Responsável pela montagem do circuito eletrônico. O circuito é bem simples: 1 estufa que mede a temperatura e umidade do domo. Se estiver em condições padrão, acende o LED verde; se não, acende o LED vermelho. Ismael desenvolveu apenas o circuito, sem a estufa física.',
      icon: Cpu,
      color: 'bg-blue-100 text-blue-600',
      technologies: ['Eletrônica', 'Circuitos', 'Sensores', 'LED']
    },
    {
      name: 'Isaque',
      role: 'UI/UX Designer',
      description: 'Responsável pelo design e desenvolvimento CSS das versões web e mobile. Criou uma interface intuitiva e responsiva com paleta de cores verde clara, garantindo uma experiência visual agradável em todos os dispositivos.',
      icon: Palette,
      color: 'bg-purple-100 text-purple-600',
      technologies: ['CSS', 'Responsive Design', 'UI/UX', 'Mobile First']
    },
    {
      name: 'João',
      role: 'Desenvolvedor Full Stack',
      description: 'Responsável pelo desenvolvimento das aplicações web e mobile. Implementou toda a lógica de backend, autenticação, integração com banco de dados e as funcionalidades principais do sistema EcoBox.',
      icon: Code,
      color: 'bg-green-100 text-green-600',
      technologies: ['React', 'Next.js', 'TypeScript', 'Expo', 'Firebase']
    }
  ];

  const projectInfo = {
    name: 'EcoBox JII',
    version: '1.0.0',
    description: 'Sistema de monitoramento de temperatura e umidade para estufas inteligentes',
    technologies: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS',
      'Firebase',
      'React Native',
      'Expo 51',
      'DHT22/11 Sensors'
    ]
  };

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push('/dashboard')}
                className="text-green-600 hover:text-green-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h1 className="text-xl font-bold text-green-800">EcoBox</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <NavigationMenu currentPage="about" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Sobre Nós</h1>
          <p className="text-gray-600">Conheça a equipe por trás do projeto EcoBox JII</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className={`mx-auto p-3 rounded-full ${member.color} mb-4`}>
                  <member.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="font-medium text-green-600">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {member.description}
                </p>
                <Separator className="mb-4" />
                <div className="flex flex-wrap gap-2">
                  {member.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <Leaf className="h-5 w-5 mr-2" />
              {projectInfo.name}
            </CardTitle>
            <CardDescription>
              Versão {projectInfo.version}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {projectInfo.description}
            </p>
            
            <div className="mb-6">
              <h3 className="font-semibold text-green-800 mb-3">Tecnologias Utilizadas</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {projectInfo.technologies.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="mb-6" />
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-600">
                  Projeto desenvolvido com ❤️ pela equipe JII
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  © 2024 EcoBox JII. Todos os direitos reservados.
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Contato
                </Button>
                <Button variant="outline" size="sm">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}