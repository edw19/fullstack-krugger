import { useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css';
import { useMutation, useQueryClient } from 'react-query';

const updateEmployee = async (datas) => {
    await fetch("http://localhost:8080/users", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem("token")
        },
        body: JSON.stringify({
            identification: datas.identification,
            password: datas.password,
            name: datas.name,
            secondName: datas.secondName,
            surname: datas.surname,
            secondSurname: datas.secondSurname,
            email: datas.email,
            dateBirth: datas.dateBirth, 
            homeAddress: datas.homeAddress,
            mobilePhone: datas.mobilePhone,
            vaccinationStatus: datas.vaccinationStatus,
            typeVacine: datas.typeVacine,
            vaccinationDate: datas.vaccinationDate,
            doses: datas.doses
        }),
    });
}


export default function UpdateEmployeeAll({ employee }) {
    employee.password = ""    
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const { mutateAsync } = useMutation("signup", updateEmployee)

    const [newEmployee, setNewEmployee] = useState({...employee})

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await mutateAsync(newEmployee)
            queryClient.invalidateQueries("employees")
            queryClient.invalidateQueries("employee")
            onCloseModal()
        } catch (error) {
            alert(error.error)
        }
    }

    const handleChangeUpdate = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value })
    }


    return <div>
        <div className="">
            <button onClick={onOpenModal} className="hover:bg-yellow-600 hover:text-white text-yellow-600 px-2 py-1 ">Editar</button>
        </div>
        <Modal open={open} onClose={onCloseModal} center>
            <form
                onSubmit={handleUpdate}
                className=" p-2 grid grid-cols-2 gap-2"
            >
                <h1 className=" col-span-2 w-full text-center">Actualizar Información</h1>
                <input
                    type="text"
                    className="px-2 py-2 "
                    placeholder=""
                    name="identification"
                    value={newEmployee.identification}
                    onChange={handleChangeUpdate}
                />
                <input
                    type="text"
                    className="px-2 py-2 "
                    placeholder="Nueva contraseña"
                    name="password"
                    value={newEmployee.password}
                    onChange={handleChangeUpdate}
                />
                <input
                    type="text"
                    className="px-2 py-2 "
                    placeholder=""
                    name="name"
                    value={newEmployee.name}
                    onChange={handleChangeUpdate}
                />
                <input
                    type="text"
                    className="px-2 py-2 "
                    placeholder=""
                    name="secondName"
                    value={newEmployee.secondName}
                    onChange={handleChangeUpdate}
                />
                <input
                    type="text"
                    className="px-2 py-2 "
                    placeholder=""
                    name="surname"
                    value={newEmployee.surname}
                    onChange={handleChangeUpdate}
                />
                <input
                    type="text"
                    className="px-2 py-2 "
                    placeholder=""
                    name="secondSurname"
                    value={newEmployee.secondSurname}
                    onChange={handleChangeUpdate}
                />
                <input
                    type="text"
                    className="px-2 py-2 "
                    placeholder=""
                    name="email"
                    value={newEmployee.email}
                    onChange={handleChangeUpdate}
                />
                <div>
                    <label htmlFor="dateBirth">Fecha de cumpleaños</label>
                    <input
                        id="dateBirth"
                        type="date"
                        className="px-2 py-2 "
                        placeholder="Fecha de cumpleaños"
                        name="dateBirth"
                        value={newEmployee.dateBirth}
                        onChange={handleChangeUpdate}
                    />
                </div>
                <input
                    type="text"
                    className="px-2 py-2 "
                    placeholder="Dirección de domicilio"
                    name="homeAddress"
                    value={newEmployee.homeAddress}
                    onChange={handleChangeUpdate}
                />
                <input
                    type="text"
                    className="px-2 py-2 "
                    placeholder="Número de celular"
                    name="mobilePhone"
                    value={newEmployee.mobilePhone}
                    onChange={handleChangeUpdate}
                />
                <select
                    type="text"
                    className="px-2 py-2 "
                    name="vaccinationStatus"
                    value={newEmployee.vaccinationStatus}
                    onChange={handleChangeUpdate}
                >
                    <option value="Vacunado">Vacunado</option>
                    <option value="No Vacunado">No Vacunado</option>
                </select>
                <select
                    type="text"
                    className="px-2 py-2"
                    name="typeVacine"
                    value={newEmployee.typeVacine}
                    onChange={handleChangeUpdate}
                >
                    <option value="Sputnik">Sputnik</option>
                    <option value="AstraZeneca">AstraZeneca</option>
                    <option value="Pfizer">Pfizer</option>
                    <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
                </select>
                <input
                    type="date"
                    className="px-2 py-2 "
                    placeholder="Número de celular"
                    name="vaccinationDate"
                    value={newEmployee.vaccinationDate}
                    onChange={handleChangeUpdate}
                />
                <input
                    type="number"
                    className="px-2 py-2 "
                    placeholder="Número de dosis"
                    name="doses"
                    value={newEmployee.doses}
                    onChange={handleChangeUpdate}
                />

                <button
                    type="submit"
                    className="bg-yellow-600 rounded-md px-2 py-2 col-span-2 text-white"
                >
                    Actualizar Empleado
                </button>
            </form>
        </Modal>
    </div >
}
