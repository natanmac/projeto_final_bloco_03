import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import type Categoria from "../../../model/Categoria";
import CardCategorias from "../cardcategorias/CardCategorias";
import { listar } from "../../../service/Service";

function ListaCategorias() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const [categorias, setCategorias] = useState<Categoria[]>([])

    async function buscarCategorias(){
        try{
            setIsLoading(true)

            await listar("/categorias", setCategorias)

        } catch (error: any){
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        buscarCategorias()
    }, [categorias.length])

    return (
        <>
            {isLoading && (<BounceLoader color="#67e8f9" loading size={0} />)}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">
                    {(!isLoading && categorias.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhum Tema foi encontrado!
                        </span>
                    )}

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {categorias.map((categoria) => (
                        <CardCategorias key={categoria.id} categoria={categoria} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaCategorias;
