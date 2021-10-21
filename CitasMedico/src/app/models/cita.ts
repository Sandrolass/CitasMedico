export interface Cita {
    _id?: string,
    fecha: Date,
    refUsuario: string,
    refM: string,
    tipoDolor: string,
    descripcion: string,
    calif:Number | null
}
