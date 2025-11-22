'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../app/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../app/ui/sheet';
import { Menu, Home, Users, LogOut, Leaf } from 'lucide-react';
import { logout } from '@/lib/auth';

interface NavigationMenuProps {
  currentPage?: string;
}

export default function NavigationMenu({ currentPage = 'dashboard' }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
    setIsOpen(false);
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      active: currentPage === 'dashboard'
    },
    {
      label: 'Sobre Nós',
      icon: Users,
      path: '/dashboard/about',
      active: currentPage === 'about'
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-green-100 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-green-800">EcoBox</h2>
          </div>

          <nav className="flex-1">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    item.active 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={() => navigateTo(item.path)}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>

          <div className="border-t pt-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sair da Conta
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}