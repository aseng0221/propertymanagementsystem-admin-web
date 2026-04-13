import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, CreditCard, Users, Building, Bell } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Billing', href: '/billing', icon: CreditCard },
    { name: 'Residents', href: '/residents', icon: Users },
    { name: 'Facilities', href: '/facilities', icon: Building },
    { name: 'Announcements', href: '/announcements', icon: Bell },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
        </div>
        <nav className="mt-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-8 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {navigation.find((n) => location.pathname.startsWith(n.href))?.name || 'Portal'}
            </h2>
          </div>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}