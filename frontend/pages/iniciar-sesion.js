import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'


const mutationFn = async (credentials) => {
    const res = await fetch("http://localhost:8080/login",
        {
            method: 'POST', headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                identification: credentials.identification, password: credentials.password
            })
        })
    const data = await res.json()

    if (data?.identification === null || data?.password === null) {
        return false
    }
    window.localStorage.setItem("token", data?.token)
    window.localStorage.setItem("iden", data?.identification)
    return true
}


function Login() {
    const router = useRouter()
    const [credentials, setCredentials] = useState({ identification: "0401869706", password: "0401869706" })
    const [error, setError] = useState(null)
    const { mutateAsync, isLoading, data } = useMutation("login", mutationFn)

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await mutateAsync(credentials);
        if (!result) return setError("Credeciales Inválidas")

        router.push("/")
    }

    useEffect(() => {
        const token = window.localStorage.getItem("token")
        if(token){
            router.push("/")
        }
    },[router])


    return (
        <div className="h-screen flex flex-row justify-center items-center bg-green-800">
            <form onSubmit={handleLogin} className="flex flex-col gap-y-4">
                <h1 className="text-center text-2xl text-white font-semibold">Iniciar Sesión</h1>
                {
                    error && <div><p>{error}</p></div>
                }
                <input name="identification" onChange={handleChange} value={credentials.identification} className="px-10 py-2 rounded-md outline-none text-center" type="text" placeholder="Número de Cédula" />
                <input name="password" onChange={handleChange} value={credentials.password} className="px-10 py-2 rounded-md outline-none text-center" type="password" placeholder="Ingrese su Contraseña" />
                <button type="submit" className="py-2 bg-green-900 text-white rounded-md cursor-pointer" >
                    {
                        isLoading ? "Iniciando ..." : "Iniciar Sesión"
                    }
                </button>
            </form>
        </div>
    )
}

export default Login
