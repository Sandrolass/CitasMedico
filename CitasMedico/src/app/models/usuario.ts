export interface Medico {
    _id: string,
    refM: string,
    nombre: string,
    apellido: string,
    dni: string,
    fecha: Fecha[]
}

export interface Fecha {

    dia: number,
    mes: number,
    agno: number,
    horas: string
}

export interface UsuarioBasico {
    _id?: string,
    dni: string,
    nombre: string,
    apellido: string
}

export interface UsuarioCompleto {
    _id: string, 
    nombre: string, 
    apellidos: string, 
    dni: string, 
    medico: Medico
}
