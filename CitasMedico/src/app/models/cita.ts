export interface Cita {
    _id?: string,
    fecha: Date,
    refUsuario: string,
    medico: string,
    tipoDolor: string,
    descripcion: string,
    calif:Number | null
}
