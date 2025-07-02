import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import type Categoria from "../../../model/Categoria"
import { useNavigate, useParams } from "react-router-dom"
import { atualizar, cadastrar, listar } from "../../../service/Service"
import { ToastAlerta } from "../../../util/ToastAlerta"
import { BounceLoader } from "react-spinners"

function FormCategoria() {

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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setCategorias({
			...categorias,
			[e.target.name]: e.target.value,
		})
	}

    async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>){
        
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined){
            try{
                await atualizar("/categorias", categorias, setCategorias)

                ToastAlerta("A categoria foi atualizado com sucesso!", 'sucesso')
            }catch(error: any){
                ToastAlerta("Erro ao atualizar a Categoria!", 'erro')
                console.error(error)
            }
        }else{
            try{
                await cadastrar("/categorias", categorias, setCategorias)

                ToastAlerta("A categoria foi cadastrado com sucesso!", 'sucesso')
            }catch(error: any){
                ToastAlerta("Erro ao cadastrar a categoria!", 'erro')
                console.error(error)
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar(){
        navigate("/categorias")
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? "Cadastrar Categoria" : "Editar Categoria"}
            </h1>

            <form 
                className="w-1/2 flex flex-col gap-4" 
                onSubmit={gerarNovaCategoria}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="categorias">Nome da Categoria</label>
                    <input
                        type="text"
                        placeholder="Nome da sua categoria"
                        name='nome'
                        className="border-2 border-slate-700 rounded p-2"
                        value={categorias.nome ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    
                    {
                        isLoading ? 

                        <BounceLoader color="#67e8f9" loading size={0} />
                        :
                        <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                        
                    }
                    
                </button>
            </form>
        </div>
    )
}

export default FormCategoria