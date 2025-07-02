import { Link } from "react-router-dom";

function navbar() {
  return (
    <div
      className="w-full flex justify-center py-4
            			   bg-indigo-900 text-white"
    >
      <div className="container flex justify-between text-lg">
        <Link to="/home" className="text-2xl font-bold">
          <img src="https://imgur.com/jNePR8P.png" alt="Logo da Farmácia" className='w-2/3' />
        </Link>

        <div className="flex gap-4">
          <Link to="/categorias" className="hover:underline">
            Categorias
          </Link>
          <Link to="/cadastrarcategoria" className="hover:underline">
            Cadastrar Categoria
          </Link>
        </div>
      </div>
    </div>
  );
}

export default navbar;
