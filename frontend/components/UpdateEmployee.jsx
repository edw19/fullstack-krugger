import { useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css';
import { useMutation, useQueryClient } from 'react-query';

const updateEmployee = async (datas) => {
    // console.log(datas)
    // return
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


export default function UpdateEmployee({ employee }) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const { mutateAsync } = useMutation("signup", updateEmployee)

    const [completeInformation, setCompleteInformation] = useState({
        dateBirth: "",
        homeAddress: "",
        mobilePhone: "",
        vaccinationStatus: "No Vacunado"
    })

    const [vaccineInformation, setVaccineInformation] = useState({
        typeVacine: "",
        vaccinationDate: "",
        doses: 0
    })

    const handleCompleteInformation = (e) => {
        setCompleteInformation({ ...completeInformation, [e.target.name]: e.target.value })
    }
    const handleVaccineInformation = (e) => {
        setVaccineInformation({ ...vaccineInformation, [e.target.name]: e.target.value })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        const complete = !completeInformation.dateBirth ||
            !completeInformation.homeAddress ||
            !completeInformation.mobilePhone ||
            !completeInformation.vaccinationStatus

        if (complete) return alert("Complete la información")

        let data = { ...employee, ...completeInformation }

        if (completeInformation.vaccinationStatus === "Vacunado") {
            data.typeVacine = vaccineInformation.typeVacine
            data.vaccinationDate = vaccineInformation.vaccinationDate
            data.doses = vaccineInformation.doses
        }

        try {
            await mutateAsync(data)
            queryClient.invalidateQueries("employee")
            queryClient.invalidateQueries("employees")
            onCloseModal()
        } catch (error) {
            alert(error.error)
        }
    }


    return <div className="pb-12">
        <div className="flex justify-center mt-20">
            <button onClick={onOpenModal} className="bg-yellow-600 py-2 px-4 rounded-md">Completar Información</button>
        </div>
        <Modal open={open} onClose={onCloseModal} center>
            <form
                onSubmit={handleUpdate}
                className=" p-2 grid grid-cols-2 gap-2"
            >
                <h1 className=" col-span-2 w-full text-center">Actualizar Información</h1>

                <div>
                    <label htmlFor="dateBirth">Fecha de cumpleaños</label>
                    <input
                        id="dateBirth"
                        type="date"
                        className="px-2 py-2 "
                        placeholder="Fecha de cumpleaños"
                        name="dateBirth"
                        onChange={handleCompleteInformation}
                    />
                </div>
                <input
                    type="text"
                    className="px-2 py-2 "
                    placeholder="Tu dirección"
                    name="homeAddress"
                    onChange={handleCompleteInformation}
                />
                <input
                    type="text"
                    className="px-2 py-2 "
                    placeholder="Número de celular"
                    name="mobilePhone"
                    onChange={handleCompleteInformation}
                />
                <select
                    type="text"
                    className="px-2 py-2 "
                    name="vaccinationStatus"
                    value={completeInformation.vaccinationStatus}
                    onChange={handleCompleteInformation}
                >
                    <option value="Vacunado">Vacunado</option>
                    <option value="No Vacunado">No Vacunado</option>
                </select>
                {
                    completeInformation.vaccinationStatus === "Vacunado" &&
                    <>

                        <select
                            type="text"
                            className="px-2 py-2"
                            name="typeVacine"
                            value={vaccineInformation.typeVacine}
                            onChange={handleVaccineInformation}
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
                            onChange={handleVaccineInformation}
                        />
                        <input
                            type="number"
                            className="px-2 py-2 "
                            placeholder="Número de dosis"
                            name="doses"
                            onChange={handleVaccineInformation}
                        />
                    </>
                }

                <button
                    type="submit"
                    className="bg-yellow-600 rounded-md px-2 py-2 col-span-2 text-white"
                >
                    Actualizar
                </button>
            </form>
        </Modal>
    </div>
}
