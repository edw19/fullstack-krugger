import React, { useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import UpdateEmployeeAll from './UpdateEmployeeAll';


async function fetcherEmployees() {
    const response = await fetch("http://localhost:8080/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem("token")
        }
    });
    const data = await response.json();

    if (data?.error) {
        alert(data.error);
        return;
    }
    return data
}

async function fetcherDelete(id) {
    await fetch("http://localhost:8080/users", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": window.localStorage.getItem("token")
        },
        body: new URLSearchParams({ id })
    });
}


function Employees() {
    const [employees, setEmployees] = useState([])
    const { isLoading, data } = useQuery("employees", fetcherEmployees)
    const { mutateAsync } = useMutation("deleteEmployee", fetcherDelete)
    const queryClient = useQueryClient();
    const [vaccines, setVaccines] = useState("")
    const [stateVacine, setStateVacine] = useState("")

    const handleDelete = async (name, id) => {
        const response = window.confirm(`Desea eliminar este empleado ${name}`)
        if (response) {
            await mutateAsync(id)
            queryClient.invalidateQueries("employees")
        }
    }


    const handleVaccines = (e) => {
        const typeVaccine = e.target.value
        setEmployees(data?.filter(employe => employe.typeVacine === typeVaccine))
    }

    const handleStateVaccine = (e) => {
        const stateEmployee = e.target.value
        console.log(stateEmployee)
        setEmployees(data?.filter(employe => employe.vaccinationStatus === stateEmployee))
    }


    useEffect(() => {
        if (!data) return;
        setEmployees(data)
    }, [data])

    if (isLoading) return <div className="text-center"><p>Cargando Empleados...</p></div>

    return (
        <>
            <div className="flex flex-row justify-end pb-2">
                <select onChange={handleVaccines} className="bg-green-600 px-2 py-1 rounded-md">
                    <option value="Sputnik">Sputnik</option>
                    <option value="AstraZeneca">AstraZeneca</option>
                    <option value="Pfizer">Pfizer</option>
                    <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
                </select>
                <select onChange={handleStateVaccine} className="bg-green-600 ml-2 px-2 py-1 rounded-md">
                    <option value="Vacunado">Vacunado</option>
                    <option value="No Vacunado">No Vacunado</option>
                </select>
            </div>
            <div className="bg-green-900 rounded-md absolute py-2 right-2 left-2">

                <div className="grid grid-cols-12 px-4 py-2 text-center">
                    <p>Cédula</p>
                    <p className="col-span-2">Email</p>
                    <p className="col-span-2">Nombre Completo</p>
                    <p>Celular</p>
                    <p>Dirección</p>
                    <p className="col-span-1">fecha de cumpleaños</p>
                    <p>Vacunación</p>
                    <p>Tipo Vacuna</p>
                    <p>Fecha de Vacunación</p>
                    <div>
                        <p>Eliminar</p>
                        <p>Editar</p>
                    </div>
                </div>
                {
                    employees?.map(employee => {
                        return <div key={employee.id} className="px-4  grid grid-cols-12 text-center hover:rounded-lg hover:bg-gray-300 hover:text-black">
                            <p>{employee.identification}</p>
                            <p className="col-span-2">{employee.email}</p>
                            <p className="col-span-2">{employee.name + " " + employee.surname}</p>
                            <p>{employee.mobilePhone}</p>
                            <p>{employee.homeAddress}</p>
                            <p className="col-span-1" >{employee.dateBirth}</p>
                            <p>{employee.vaccinationStatus}</p>
                            <p>{employee.typeVacine}</p>
                            <p>{employee.vaccinationDate}</p>
                            <div className="flex flex-row items-center justify-center" >
                                <button onClick={() => handleDelete(employee.surname + " " + employee.name, employee.id)} className="hover:bg-red-500 hover:text-white text-red-500 px-2 py-1 ">X</button>
                                <UpdateEmployeeAll employee={employee} />
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default Employees
