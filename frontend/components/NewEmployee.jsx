import { useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import { validate } from "../hooks/validateIdentificationCard";
import { useMutation, useQueryClient } from 'react-query';


Yup.addMethod(Yup.string, "validateIdentificationCard", function (errMessage) {
    return this.test(
        "test-identificationCard",
        errMessage,
        function (identificationCard) {
            const { path, createError } = this;
            return (
                validate(identificationCard) ||
                createError({ path, message: "Cédula inválida" })
            );
        }
    );
});

const signupEmployee = async (user) => {
    const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": window.localStorage.getItem("token")
        },
        body: JSON.stringify({
            email: user.email, identification: user.identificationCard,
            name: user.name, secondName: user.secondName,
            surname: user.surname, secondSurname: user.secondSurname, role: "Empleado"
        }),
    });
    const data = await response.json();

    if (data?.error) {
        alert(data.error);
        return;
    }
    return data

}


export default function NewEmployee() {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const { mutateAsync } = useMutation("signup", signupEmployee)
    const queryClient = useQueryClient()
    const schema = Yup.object().shape({
        identificationCard: Yup.string()
            .validateIdentificationCard()
            .required("Cédula es requerido"),

        name: Yup.string()
            .required("Nombre es requerido")
            .matches(/^[aA-zZÀ-ÿ\s]+$/, "No puedes ingresar números"),
        secondName: Yup.string()
            .required("Segundo Nombre es requerido")
            .matches(/^[aA-zZÀ-ÿ\s]+$/, "No puedes ingresar números"),
        surname: Yup.string()
            .required("Apellido es requerido")
            .matches(/^[aA-zZÀ-ÿ\s]+$/, "No puedes ingresar números"),
        secondSurname: Yup.string()
            .required("Segundo Apellido es requerido")
            .matches(/^[aA-zZÀ-ÿ\s]+$/, "No puedes ingresar números"),
        email: Yup.string()
            .email("Email debe ser un email")
            .required("Email es requerido"),
    });
    const formik = useFormik({
        initialValues: {
            identificationCard: "0100967652",
            name: "Ramiro",
            secondName: "Arturo",
            surname: "Lina",
            secondSurname: "Josefa",
            email: "ed@ed.com",
        },
        validationSchema: schema,
        onSubmit: async (user) => {
            try {
                await mutateAsync(user)
                onCloseModal()
                queryClient.invalidateQueries("employees")
            } catch (error) {
                alert(error)
            }

        },
    });


    return <div>
        <button onClick={onOpenModal} className="bg-green-900 py-2 px-4 rounded-md">Nuevo Empleado</button>
        <Modal open={open} onClose={onCloseModal} center>
            <form
                onSubmit={formik.handleSubmit}
                className=" p-2 grid grid-cols-2 gap-2 text-2xl"
            >
                <h1 className=" col-span-2 text-center">Nuevo Empleado</h1>
                <div>
                    <input
                        type="text"
                        className="px-2 py-2 "
                        placeholder="Cédula"
                        name="idenfificationCard"
                        {...formik.getFieldProps("identificationCard")}
                    />
                    {formik.errors.identificationCard &&
                        formik.touched.identificationCard ? (
                        <div className="text-red-400 text-sm">
                            {formik.errors.identificationCard}
                        </div>
                    ) : null}
                </div>
                <div>
                    <input
                        type="text"
                        className="px-2 py-2 "
                        placeholder="Email"
                        name="email"
                        {...formik.getFieldProps("email")}
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <div className="text-red-400 text-sm">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div>
                    <input
                        type="text"
                        className="px-2 py-2 "
                        placeholder="Nombre"
                        name="name"
                        {...formik.getFieldProps("name")}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <div className="text-red-400 text-sm">{formik.errors.name}</div>
                    ) : null}
                </div>
                <div>
                    <input
                        type="text"
                        className="px-2 py-2 "
                        placeholder="Segundo Nombre"
                        name="name"
                        {...formik.getFieldProps("secondName")}
                    />
                    {formik.errors.secondName && formik.touched.secondName ? (
                        <div className="text-red-400 text-sm">
                            {formik.errors.secondName}
                        </div>
                    ) : null}
                </div>
                <div>
                    <input
                        type="text"
                        className="px-2 py-2 "
                        placeholder="Apellido"
                        name="name"
                        {...formik.getFieldProps("surname")}
                    />
                    {formik.errors.surname && formik.touched.surname ? (
                        <div className="text-red-400 text-sm">{formik.errors.surname}</div>
                    ) : null}
                </div>
                <div>
                    <input
                        type="text"
                        className="px-2 py-2 "
                        placeholder="Segundo Apellido"
                        name="name"
                        {...formik.getFieldProps("secondSurname")}
                    />
                    {formik.errors.secondSurname && formik.touched.secondSurname ? (
                        <div className="text-red-400 text-sm">
                            {formik.errors.secondSurname}
                        </div>
                    ) : null}
                </div>
                <button
                    type="submit"
                    className="bg-green-900 px-2 py-2 col-span-2 text-white"
                >
                    Registrarse
                </button>
            </form>
        </Modal>
    </div>
}
