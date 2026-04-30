import { useAuth } from '../hooks/useAuth';

export default function AdminTools() {
  const { user, login, logout, isAdmin } = useAuth();
  
  return (
    <div className="fixed bottom-6 left-6 z-50">
      {!user ? (
        <button onClick={login} className="text-[9px] uppercase tracking-[0.3em] text-meta hover:text-white opacity-20 hover:opacity-100 transition-opacity">
           &diams; 
        </button> // A small diamond shape as a subtle login button
      ) : (
        <div className="flex bg-black/80 backdrop-blur border border-border px-4 py-2 gap-4 items-center">
          <span className="text-[9px] uppercase tracking-[0.3em] text-meta text-white">
            {isAdmin ? 'ADMIN MODE' : 'LOGGED IN'}
          </span>
          <button onClick={logout} className="text-[9px] uppercase tracking-[0.3em] text-meta hover:text-white border-l border-border pl-4">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
