import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import Employees from './Employees'
import NewEmployee from './NewEmployee'
import UpdateEmployee from '../components/UpdateEmployee'
import Loader from "react-loader-spinner";
import UpdateEmployeeAll from './UpdateEmployeeAll'

async function getEmployee() {
    const iden = window.localStorage.getItem("iden")
    const response = await fetch("http://localhost:8080/filtros", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem("token")
        },
        body: JSON.stringify({ identification: iden })
    })
    return await response.json()
}

function Employee() {
    const router = useRouter()
    const { data, isLoading } = useQuery("employee", getEmployee)

    const handleCloseSession = () => {
        window.localStorage.removeItem("token")
        router.push("/iniciar-sesion")
    }

    useEffect(() => {
        const token = window.localStorage.getItem("token")
        if (!token) {
            router.push("/iniciar-sesion")
        }
    }, [router])

    const shouldComplete =
        typeof data?.dateBirth === 'undefined' || data?.dateBirth === null ||
        typeof data?.homeAddress === 'undefined' || data?.homeAddress === null ||
        typeof data?.mobilePhone === 'undefined' || data?.mobilePhone === null ||
        typeof data?.vaccinationStatus === 'undefined' || data?.vaccinationStatus === null

    const isAdmin = data?.role === "Administrador"

    if (isLoading) return (
        <div className="h-screen text-white flex flex-col items-center gap-y-3 justify-center   bg-green-800">
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                visible={isLoading}
            />
            <p>Cargando Información....</p>
        </div>)

    return (
        <div className="h-screen text-white flex items-center justify-center  bg-green-800">
            <div className="w-2/3 rounded-md h-4/6 border-white">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-grow-0">
                        <span className="text-2xl font-bold">
                            Bienvenido
                        </span>
                        <h1 className="text-xl ml-4 font-light">
                            {data?.surname + " " + data?.secondSurname + " " + data?.name + " " + data?.secondName}
                        </h1>
                    </div>
                    <div className="ml-20 flex flex-row items-center">
                        {
                            isAdmin && <NewEmployee />
                        }
                        {
                            !shouldComplete && Object.keys(data).length > 0  ? <UpdateEmployeeAll employee={data}  />: null
                        }
                        <button onClick={handleCloseSession} className="text-lg ml-2 bg-red-700 rounded-2xl px-4 py-2">
                            X
                        </button>

                    </div>
                </div>
                {
                    shouldComplete ?
                        <UpdateEmployee employee={data} /> :
                        <div className="grid grid-cols-3 gap-4 px-8 py-3 text-center">
                            <div>
                                <span className="font-semibold">Cédula</span>
                                <p>{data?.identification}</p>
                            </div>
                            <div>
                                <span className="font-semibold">Email</span>
                                <p>{data?.email}</p>
                            </div>
                            <div>
                                <span className="font-semibold">Celular</span>
                                <p>{data?.mobilePhone}</p>
                            </div>
                            <div>
                                <span className="font-semibold">Dirección</span>
                                <p>{data?.homeAddress}</p>
                            </div>
                            <div>
                                <span className="font-semibold">Fecha de Nacimiento</span>
                                <p>{data?.dateBirth}</p>
                            </div>
                            {
                                data?.vaccinationStatus == "Vacunado" ?
                                    <div className="col-span-3 text-center grid grid-cols-4 items-center justify-center border rounded-md p-4">
                                        <div>
                                            <p>Estado</p>
                                            <p>{data?.vaccinationStatus}</p>
                                        </div>
                                        <div>
                                            <p>Nombre de Vacuna</p>
                                            <p>{data?.typeVacine}</p>

                                        </div>
                                        <div>
                                            <p>Número de dosis</p>
                                            <p>{data?.doses}</p>
                                        </div>
                                        <div>
                                            <p>Fecha de vacunación</p>
                                            <p>{data?.vaccinationDate}</p>
                                        </div>
                                    </div> : null
                            }
                        </div>
                }
                {
                    isAdmin && <Employees />
                }

            </div>
        </div>
    )
}

export default Employee
