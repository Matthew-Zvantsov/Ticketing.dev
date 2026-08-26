import Image from 'next/image'
import Link from 'next/link';


export default function HeaderComp(){

  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Image
                  width={500}
                  height={500}
                  className="block h-8 w-auto"
                  src="https://tailwindflex.com/images/logo.svg"
                  alt="Logo"
                />
                <span className="ml-2 text-xl font-bold text-gray-800">Navbar</span>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="hidden sm:flex sm:items-center">
                <Link className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium" href="auth/signin">Login</Link>
                <Link className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700" href="auth/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}