import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Categoria from "../../../model/Categoria"
import { deletar, listar } from "../../../service/Service"
import { ToastAlerta } from "../../../util/ToastAlerta"
import { BounceLoader } from "react-spinners"


function DeletarCategoria() {

    const navigate = useNavigate()
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
            
    const [categorias, setCategorias] = useState<Categoria>({} as Categoria)

    const { id } = useParams<{ id: string }>()

    async function buscarCategoriaPorId(id: string){
        try{   
            await listar(`/categorias/${id}`, setCategorias)
        } catch (error: any){
            console.log(error)
        }
    }

    useEffect(()=>{
        if(id !== undefined){
            buscarCategoriaPorId(id)
        }else{
            setCategorias({
                id: undefined,
                nome: "",
            })
        }
    }, [id])

    async function deletarCategoria() {
        setIsLoading(true)

        try {
            await deletar(`/categorias/${id}`)
            ToastAlerta('Categoria excluído com sucesso!', 'sucesso')
        } catch (error) {
            ToastAlerta('Erro ao Excluir a Categoria!', 'erro')
			console.error(error)
        }

        setIsLoading(false)
		retornar()
    }

    function retornar(){
        navigate("/categorias")
    }
    
    return (
        <div className="container w-1/3 mx-auto">
			<h1 className="text-4xl text-center my-4">Deletar Categoria</h1>
			<p className="text-center font-semibold mb-4">
				Você tem certeza de que deseja apagar a categoria a
				seguir?
			</p>
			<div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
				<header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
					Categoria
				</header>
				<p className="p-8 text-3xl bg-slate-200 h-full">
					{categorias.nome}
				</p>
				<div className="flex">
					<button
						className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
						onClick={retornar}
					>
						Não
					</button>
					<button
						className="w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center"
						onClick={deletarCategoria}
					>
						{isLoading ? (
							<BounceLoader color="#67e8f9" loading size={0} />
						) : (
							<span>Sim</span>
						)}
					</button>
				</div>
			</div>
		</div>
    )
}

export default DeletarCategoria