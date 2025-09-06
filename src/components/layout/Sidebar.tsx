import React from 'react';
import { Avatar } from '../ui/Avatar';
import { useAuth } from '../../context/AuthContext';
import { Home, FolderOpen, CheckSquare, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'projects', name: 'Projects', icon: FolderOpen },
  { id: 'my-tasks', name: 'My Tasks', icon: CheckSquare },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  isOpen = true, 
  onClose 
}) => {
  const { user } = useAuth();
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className="flex flex-col h-screen">
        <div className="flex items-center space-x-3 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            SynergySphere
          </h1>
        </div>

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 lg:hidden">
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow overflow-y-auto px-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose?.();
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left
                    transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
            <div className="mt-auto px-4 py-3 border-t border-gray-200 dark:border-gray-800">
              


            <button className="flex items-center space-x-3 w-full p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Avatar src={user?.avatar} name={user?.name} size="sm" />
              <span className="hidden sm:block text-sm font-medium text-gray-900 dark:text-white">
              {user?.name}
              </span>
            </button>
            </div>
        </div>
      </div>
    </>
  );
};