

function Home() {
  return (
    <>
        <div className="bg-cyan-300 flex justify-center">
            <div className='container grid grid-cols-2 text-black'>
                <div className="flex flex-col gap-4 items-center justify-center py-4">
                    <h2 className='text-5xl font-bold'>
                        Seja Bem Vinde!
                    </h2>
                    <p className='text-xl'>
                        Aqui você encontra Medicamentos e Cosméticos!
                    </p>
                    
                    {/* Substituir ModalProduto */}
                    <button className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Cadastrar Produto
                    </button>

                </div>

                <div className="flex justify-center ">
                    <img
                        src="https://i.imgur.com/bBYOxSZ.png"
                        alt="Imagem Página Home"
                        className='w-2/3'
                    />
                </div>
            </div>
        </div>        
    </>
  )
}

export default Home