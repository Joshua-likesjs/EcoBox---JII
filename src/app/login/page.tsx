'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '..//ui/alert';
import { login } from '@/lib/auth';
// Ícones atualizados para os do Figma
import { Sprout, Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  // Mantive a lógica exata do seu original
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Mantive 'loading' para consistência com o seu original
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Sua lógica de autenticação original foi mantida aqui
    try {
      const result = await login(email, password);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Retorno com a estrutura e estilização do Figma
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title - Estilo do Figma */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-200 mb-4">
            <Sprout className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">JII ECOBOX</h1>
          <p className="text-emerald-700">Estufa Inteligente</p>
        </div>

        {/* Login Card - Estrutura e estilo do Figma */}
        <Card className="border-emerald-200 shadow-xl shadow-emerald-100/50 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-emerald-900">Bem-vindo de volta</CardTitle>
            <CardDescription className="text-emerald-600">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-emerald-900">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-emerald-900">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-200 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-300"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-emerald-600">
              Não tem uma conta?{' '}
              {/* Mantive a funcionalidade do Link do Next.js, mas apliquei o estilo do Figma */}
              <Link 
                href="/register"
                className="text-emerald-700 hover:text-emerald-900 transition-colors underline underline-offset-2"
              >
                Cadastre-se
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Footer - Estilo do Figma */}
        <p className="text-center text-sm text-emerald-600 mt-6">
          Sistema de Monitoramento de Estufa Inteligente
        </p>
      </div>
    </div>
  );
}